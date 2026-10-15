import goutamBiswas from "@/assets/images/team/goutam-biswas.jpg";
import gourabBiswas from "@/assets/images/team/gourab-biswas.jpg";
import swagatikaRatha from "@/assets/images/team/swagatika-ratha.jpg";
import type { TeamMember } from "./types";

/** Leadership team — names, designations and portraits as supplied by GTS */
export const team: TeamMember[] = [
  {
    name: "Goutam Biswas",
    role: "CEO & Managing Director",
    photo: { src: goutamBiswas, alt: "Portrait of Goutam Biswas, CEO & Managing Director", position: "50% 30%" },
  },
  {
    name: "Gourab Biswas",
    role: "Head of Accounting and Finance",
    photo: { src: gourabBiswas, alt: "Portrait of Gourab Biswas, Head of Accounting and Finance", position: "50% 30%" },
  },
  {
    name: "Swagatika Ratha",
    role: "Head of HR & Administration",
    photo: { src: swagatikaRatha, alt: "Portrait of Swagatika Ratha, Head of HR & Administration", position: "50% 30%" },
  },
];
