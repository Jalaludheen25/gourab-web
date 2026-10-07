"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny store that coordinates the first-load sequence:
 * the Loader marks the intro as done, the Hero and Navbar wait for it.
 */

const SESSION_KEY = "gts:intro-seen";
let done = false;
const listeners = new Set<() => void>();

export function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroDone() {
  if (done) return;
  done = true;
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* storage unavailable — intro will simply replay next visit */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false,
  );
}
