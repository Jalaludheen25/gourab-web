"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* --------------------------------------------------------------------------
   "The logo, built."
   A steel-and-glass tower assembles floor by floor on a blueprint grid,
   topped by a gold line-art tower crane — a nod to the crane in the GTS
   mark. Scroll separates the floors into an exploded axonometric while the
   camera rises. Everything is instanced; no network assets are loaded.
   -------------------------------------------------------------------------- */

const FLOORS = 17;
const FH = 0.5; // floor-to-floor height
const W = 2.3;
const D = 1.55;
const SETBACK_FROM = 12; // floors above this step in
const GLAZED_BELOW = 12; // floors below this are fully glazed
const COL_X = [-0.5, -1 / 6, 1 / 6, 0.5];
const COL_Z = [-0.5, 0, 0.5];
const TOWER_X = 2.35;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const footprint = (i: number) => (i >= SETBACK_FROM ? 0.78 : 1);

/** Deterministic PRNG (mulberry32) — keeps render pure and the dust field stable */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type SharedState = {
  scroll: number;
  pointer: THREE.Vector2;
};

type PartProps = { state: React.RefObject<SharedState>; play: boolean };

/* ---------------------------------- Tower --------------------------------- */

function Tower({ state, play }: PartProps) {
  const start = useRef<number | null>(null);
  const columns = useRef<THREE.InstancedMesh>(null);
  const slabs = useRef<THREE.InstancedMesh>(null);
  const glass = useRef<THREE.InstancedMesh>(null);
  const mullions = useRef<THREE.InstancedMesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const colCount = FLOORS * COL_X.length * COL_Z.length;
  const glassCount = GLAZED_BELOW * 4;
  const mullionsPerFloor = 2 * 7 + 2 * 5;
  const mullionCount = GLAZED_BELOW * mullionsPerFloor;

  const materials = useMemo(
    () => ({
      steel: new THREE.MeshStandardMaterial({ color: "#c9ccd1", metalness: 0.9, roughness: 0.3, envMapIntensity: 0.55 }),
      slab: new THREE.MeshStandardMaterial({ color: "#9a9b9e", metalness: 0.35, roughness: 0.6, envMapIntensity: 0.35 }),
      concrete: new THREE.MeshStandardMaterial({ color: "#5d5f63", metalness: 0.1, roughness: 0.9, envMapIntensity: 0.3 }),
      glass: new THREE.MeshStandardMaterial({
        color: "#8d969f",
        metalness: 0.65,
        roughness: 0.06,
        transparent: true,
        opacity: 0.32,
        envMapIntensity: 1,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      mullion: new THREE.MeshStandardMaterial({ color: "#e4e6e9", metalness: 1, roughness: 0.22, envMapIntensity: 0.6 }),
    }),
    [],
  );

  const geometries = useMemo(
    () => ({
      column: new THREE.BoxGeometry(0.05, 1, 0.05),
      slab: new THREE.BoxGeometry(1, 0.045, 1),
      pane: new THREE.BoxGeometry(1, 1, 0.012),
      mullion: new THREE.BoxGeometry(0.018, 1, 0.03),
      core: new THREE.BoxGeometry(0.62, 1, 0.48),
    }),
    [],
  );

  useLayoutEffect(
    () => () => {
      Object.values(materials).forEach((m) => m.dispose());
      Object.values(geometries).forEach((g) => g.dispose());
    },
    [materials, geometries],
  );

  useFrame(({ clock }) => {
    const s = state.current;
    if (!s) return;
    if (play && start.current === null) start.current = clock.elapsedTime;
    const t = start.current === null ? 0 : clock.elapsedTime - start.current;
    const explode = easeOutExpo(clamp01(s.scroll * 1.1)) * 0.2;

    let c = 0;
    let g = 0;
    let m = 0;

    for (let i = 0; i < FLOORS; i++) {
      const p = clamp01((t * 1.25 - i * 0.085) / 0.75);
      const grow = easeOutExpo(p);
      const fp = footprint(i);
      const w = W * fp;
      const d = D * fp;
      const baseY = i * FH + i * explode * (0.6 + i * 0.04);

      // Columns grow upward from the slab below
      for (const cx of COL_X) {
        for (const cz of COL_Z) {
          const interior = cz === 0 && (cx === COL_X[1] || cx === COL_X[2]);
          const h = FH * Math.max(grow, 0.0001);
          dummy.position.set(cx * w, baseY + h / 2, cz * d);
          dummy.scale.set(interior ? 0.8 : 1, h, interior ? 0.8 : 1);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          columns.current?.setMatrixAt(c++, dummy.matrix);
        }
      }

      // Slab drops in once the columns are up (top floor stays open)
      if (slabs.current) {
        const sp = i === FLOORS - 1 ? 0 : easeOutBack(clamp01((p - 0.45) * 1.9));
        dummy.position.set(0, baseY + FH, 0);
        dummy.scale.set((w + 0.12) * Math.max(sp, 0.0001), 1, (d + 0.12) * Math.max(sp, 0.0001));
        dummy.updateMatrix();
        slabs.current.setMatrixAt(i, dummy.matrix);
      }

      // Curtain wall + mullions on the lower floors
      if (i < GLAZED_BELOW) {
        const gp = easeOutExpo(clamp01((p - 0.7) * 3.3));
        const paneH = (FH - 0.05) * Math.max(gp, 0.0001);
        const y = baseY + 0.025 + paneH / 2;
        const faces: [number, number, number, number][] = [
          [0, d / 2, w, 0],
          [0, -d / 2, w, 0],
          [w / 2, 0, d, Math.PI / 2],
          [-w / 2, 0, d, Math.PI / 2],
        ];
        for (const [fx, fz, len, rot] of faces) {
          dummy.position.set(fx, y, fz);
          dummy.rotation.set(0, rot, 0);
          dummy.scale.set(len, paneH, 1);
          dummy.updateMatrix();
          glass.current?.setMatrixAt(g++, dummy.matrix);

          const n = len === w ? 7 : 5;
          for (let k = 0; k < n; k++) {
            const off = -len / 2 + (len / (n - 1)) * k;
            const mx = rot === 0 ? off : fx;
            const mz = rot === 0 ? fz : off;
            dummy.position.set(mx * 1.003, y, mz * 1.003);
            dummy.scale.set(1, paneH, 1);
            dummy.updateMatrix();
            mullions.current?.setMatrixAt(m++, dummy.matrix);
          }
        }
      }
    }

    if (columns.current) columns.current.instanceMatrix.needsUpdate = true;
    if (slabs.current) slabs.current.instanceMatrix.needsUpdate = true;
    if (glass.current) glass.current.instanceMatrix.needsUpdate = true;
    if (mullions.current) mullions.current.instanceMatrix.needsUpdate = true;

    if (core.current) {
      const total = FLOORS * FH + FLOORS * explode * 1.1;
      const cp = easeOutExpo(clamp01(t * 0.55));
      const h = total * 0.96 * Math.max(cp, 0.0001);
      core.current.scale.set(1, h, 1);
      core.current.position.y = h / 2;
    }
  });

  return (
    <group>
      <instancedMesh ref={columns} args={[geometries.column, materials.steel, colCount]} frustumCulled={false} />
      <instancedMesh ref={slabs} args={[geometries.slab, materials.slab, FLOORS]} frustumCulled={false} />
      <instancedMesh ref={glass} args={[geometries.pane, materials.glass, glassCount]} frustumCulled={false} renderOrder={2} />
      <instancedMesh ref={mullions} args={[geometries.mullion, materials.mullion, mullionCount]} frustumCulled={false} />
      <mesh ref={core} geometry={geometries.core} material={materials.concrete} />
    </group>
  );
}

/* ---------------------------------- Crane --------------------------------- */

function latticeMast(height: number, size: number, step: number): number[] {
  const pts: number[] = [];
  const h = size / 2;
  const corners: [number, number][] = [
    [-h, -h],
    [h, -h],
    [h, h],
    [-h, h],
  ];
  for (const [x, z] of corners) pts.push(x, 0, z, x, height, z);
  for (let y = 0; y <= height + 1e-6; y += step) {
    for (let k = 0; k < 4; k++) {
      const [x1, z1] = corners[k];
      const [x2, z2] = corners[(k + 1) % 4];
      pts.push(x1, y, z1, x2, y, z2);
      if (y + step <= height + 1e-6) pts.push(x1, y, z1, x2, y + step, z2);
    }
  }
  return pts;
}

function latticeJib(from: number, to: number, depth: number, height: number, step: number): number[] {
  const pts: number[] = [];
  const z = depth / 2;
  // two bottom chords + top chord (triangular section)
  pts.push(from, 0, -z, to, 0, -z, from, 0, z, to, 0, z, from, height, 0, to, height * 0.35, 0);
  for (let x = from; x <= to + 1e-6; x += step) {
    const nx = Math.min(x + step, to);
    const top = height - ((x - from) / (to - from)) * height * 0.65;
    const nTop = height - ((nx - from) / (to - from)) * height * 0.65;
    pts.push(x, 0, -z, x, 0, z);
    pts.push(x, 0, -z, nx, nTop, 0, x, 0, z, nx, nTop, 0);
    pts.push(x, top, 0, x, 0, -z, x, top, 0, x, 0, z);
  }
  return pts;
}

function Crane({ state, play }: PartProps) {
  const start = useRef<number | null>(null);
  const slew = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const hook = useRef<THREE.Group>(null);

  const MAST = 2.9;
  const towerTop = FLOORS * FH;

  const { mast, jib, ties, gold, line } = useMemo(() => {
    const goldLine = new THREE.LineBasicMaterial({ color: "#f2c230", transparent: true, opacity: 0.95 });
    const mastGeo = new THREE.BufferGeometry();
    mastGeo.setAttribute("position", new THREE.Float32BufferAttribute(latticeMast(MAST, 0.18, 0.18), 3));
    const jibGeo = new THREE.BufferGeometry();
    jibGeo.setAttribute("position", new THREE.Float32BufferAttribute(
      [...latticeJib(0.1, 4.4, 0.14, 0.22, 0.22), ...latticeJib(-1.7, -0.1, 0.14, 0.16, 0.24)],
      3,
    ));
    const tieGeo = new THREE.BufferGeometry();
    tieGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([0, 0.95, 0, 4.2, 0.08, 0, 0, 0.95, 0, -1.6, 0.16, 0, 0, 0, 0, 0, 0.95, 0], 3),
    );
    const goldSolid = new THREE.MeshStandardMaterial({ color: "#e9b524", metalness: 0.75, roughness: 0.32, emissive: "#3a2600", envMapIntensity: 0.6 });
    return { mast: mastGeo, jib: jibGeo, ties: tieGeo, gold: goldSolid, line: goldLine };
  }, []);

  useLayoutEffect(
    () => () => {
      mast.dispose();
      jib.dispose();
      ties.dispose();
      gold.dispose();
      line.dispose();
    },
    [mast, jib, ties, gold, line],
  );

  useFrame(({ clock }, delta) => {
    const s = state.current;
    if (!s) return;
    if (play && start.current === null) start.current = clock.elapsedTime;
    const t = start.current === null ? 0 : clock.elapsedTime - start.current;
    const appear = easeOutExpo(clamp01((t - 1.35) / 1.2));
    const explode = easeOutExpo(clamp01(s.scroll * 1.1)) * 0.2;
    const top = FLOORS - 1;
    const lift = top * explode * (0.6 + top * 0.04);

    if (root.current) {
      root.current.position.y = towerTop + lift + (1 - appear) * -MAST;
      root.current.scale.setScalar(Math.max(appear, 0.0001));
    }
    if (slew.current) slew.current.rotation.y += delta * (0.12 + s.scroll * 0.8);
    if (hook.current) hook.current.position.y = -0.55 - Math.sin(t * 0.6) * 0.18;
  });

  return (
    <group ref={root} position={[0.55, towerTop, -0.25]}>
      <lineSegments geometry={mast} material={line} />
      <group ref={slew} position={[0, MAST, 0]}>
        <mesh position={[0, -0.08, 0]} material={gold}>
          <boxGeometry args={[0.32, 0.16, 0.26]} />
        </mesh>
        <lineSegments geometry={jib} material={line} />
        <lineSegments geometry={ties} material={line} />
        <mesh position={[-1.45, -0.08, 0]} material={gold}>
          <boxGeometry args={[0.32, 0.22, 0.2]} />
        </mesh>
        <group position={[3.1, 0, 0]}>
          <mesh position={[0, -0.03, 0]} material={gold}>
            <boxGeometry args={[0.14, 0.05, 0.12]} />
          </mesh>
          <group ref={hook} position={[0, -0.55, 0]}>
            <mesh position={[0, 0.3, 0]} material={gold}>
              <boxGeometry args={[0.006, 0.6, 0.006]} />
            </mesh>
            <mesh material={gold}>
              <boxGeometry args={[0.06, 0.08, 0.06]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/* -------------------------------- Particles ------------------------------- */

function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, material, speeds } = useMemo(() => {
    const rand = seeded(1655231);
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.5 + rand() * 6;
      const a = rand() * Math.PI * 2;
      pos[i * 3] = TOWER_X + Math.cos(a) * r;
      pos[i * 3 + 1] = rand() * 11;
      pos[i * 3 + 2] = Math.sin(a) * r;
      spd[i] = 0.04 + rand() * 0.12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: "#f3d68a",
      size: 0.024,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    return { geometry: geo, material: mat, speeds: spd };
  }, [count]);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 11) arr[i * 3 + 1] = 0;
    }
    attr.needsUpdate = true;
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ------------------------------- Camera rig ------------------------------- */

function Rig({ state }: { state: React.RefObject<SharedState> }) {
  const camera = useThree((st) => st.camera) as THREE.PerspectiveCamera;
  const size = useThree((st) => st.size);
  const target = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef({ x: 0, y: 0, scroll: 0 });

  // Shift the projection so the tower sits in the right-hand field,
  // leaving the left for the headline, while orbiting stays centred on it.
  useLayoutEffect(() => {
    const shift = size.width >= 1280 ? 0.22 : 0.17;
    camera.setViewOffset(size.width, size.height, -size.width * shift, 0, size.width, size.height);
    camera.updateProjectionMatrix();
    return () => {
      camera.clearViewOffset();
    };
  }, [camera, size.width, size.height]);

  useFrame(({ clock }, delta) => {
    const s = state.current;
    if (!s) return;
    const k = 1 - Math.pow(0.0015, delta);
    smooth.current.x += (s.pointer.x - smooth.current.x) * k * 0.6;
    smooth.current.y += (s.pointer.y - smooth.current.y) * k * 0.6;
    smooth.current.scroll += (s.scroll - smooth.current.scroll) * k;

    const sc = smooth.current.scroll;
    const t = clock.elapsedTime;
    const angle = 0.7 + t * 0.02 + sc * 0.6 + smooth.current.x * 0.07;
    const radius = 26.5 - sc * 5.5;
    const height = 3.2 + sc * 9 + smooth.current.y * 0.8;

    camera.position.set(TOWER_X + Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    target.set(TOWER_X, 6.5 + sc * 5, 0);
    camera.lookAt(target);
  });

  return null;
}

/* ----------------------------- Studio lighting ---------------------------- */

const nextIdle = () =>
  new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 600 });
    else globalThis.setTimeout(resolve, 16);
  });

/**
 * Procedural reflections (no HDR download): three's RoomEnvironment
 * pre-filtered through PMREM. Built in its own idle task with its shaders
 * compiled in parallel, so it never lands in one long main-thread block.
 */
async function buildEnvironment(gl: THREE.WebGLRenderer) {
  const room = new RoomEnvironment();
  await gl.compileAsync(room, new THREE.PerspectiveCamera());
  await nextIdle();
  const pmrem = new THREE.PMREMGenerator(gl);
  const texture = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  pmrem.dispose();
  return texture;
}

/**
 * Staged warm-up: environment first, then every scene shader compiled with
 * KHR_parallel_shader_compile (compileAsync). Rendering starts only after.
 */
function Stage({ onCompiled }: { onCompiled: () => void }) {
  const gl = useThree((st) => st.gl);
  const scene = useThree((st) => st.scene);
  const camera = useThree((st) => st.camera);
  const [env, setEnv] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let alive = true;
    buildEnvironment(gl).then((texture) => {
      if (alive) setEnv(texture);
      else texture.dispose();
    });
    return () => {
      alive = false;
    };
  }, [gl]);

  useEffect(() => {
    if (!env) return;
    let alive = true;
    nextIdle()
      .then(() => gl.compileAsync(scene, camera))
      .then(() => alive && onCompiled());
    return () => {
      alive = false;
    };
  }, [env, gl, scene, camera, onCompiled]);

  useEffect(() => () => env?.dispose(), [env]);

  return env ? <primitive object={env} attach="environment" /> : null;
}

/** Blueprint ground: fine cells + gold section lines, faded by fog */
function BlueprintGrid() {
  const grids = useMemo(() => {
    const cells = new THREE.GridHelper(80, 200, "#202328", "#202328");
    const sections = new THREE.GridHelper(80, 40, "#5b4a1c", "#3a3220");
    for (const g of [cells, sections]) {
      const m = g.material as THREE.LineBasicMaterial;
      m.transparent = true;
      m.opacity = g === cells ? 0.55 : 0.75;
      m.depthWrite = false;
    }
    sections.position.y = 0.001;
    return [cells, sections];
  }, []);

  useLayoutEffect(
    () => () => {
      grids.forEach((g) => {
        g.geometry.dispose();
        (g.material as THREE.Material).dispose();
      });
    },
    [grids],
  );

  return (
    <group position={[TOWER_X, 0, 0]}>
      {grids.map((g, i) => (
        <primitive key={i} object={g} />
      ))}
    </group>
  );
}

/* ---------------------------------- Scene --------------------------------- */

export type HeroSceneProps = {
  /** Render loop on/off (off when the hero is scrolled out of view) */
  active: boolean;
  /** Start the assembly sequence */
  play: boolean;
  onReady?: () => void;
};

export default function HeroScene({ active, play, onReady }: HeroSceneProps) {
  const [compiled, setCompiled] = useState(false);
  const handleCompiled = useCallback(() => {
    setCompiled(true);
    onReady?.();
  }, [onReady]);
  const state = useRef<SharedState>({ scroll: 0, pointer: new THREE.Vector2() });

  // Scroll progress across the hero + pointer position
  useLayoutEffect(() => {
    const onScroll = () => {
      state.current.scroll = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    };
    const onPointer = (e: PointerEvent) => {
      state.current.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={compiled && active ? "always" : "never"}
      camera={{ fov: 30, near: 0.1, far: 120, position: [14, 6, 18] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden
    >
      <fog attach="fog" args={["#0a0b0d", 24, 48]} />

      <ambientLight intensity={0.22} />
      <directionalLight position={[-6, 11, 7]} intensity={2.6} color="#ffdcae" />
      <directionalLight position={[9, 5, -8]} intensity={0.9} color="#a9bddf" />
      <pointLight position={[TOWER_X, 0.6, 2.2]} intensity={6} distance={6} color="#f2c230" />

      <Stage onCompiled={handleCompiled} />

      <group position={[TOWER_X, 0, 0]} rotation={[0, -0.35, 0]}>
        <Tower state={state} play={play} />
        <Crane state={state} play={play} />
      </group>
      <Dust />

      <BlueprintGrid />

      <Rig state={state} />
    </Canvas>
  );
}
