import concreteRibs from "@/assets/images/concrete-ribs.jpg";
import concreteWall from "@/assets/images/concrete-wall.jpg";
import cranesDusk from "@/assets/images/cranes-dusk.jpg";
import darkBuilding from "@/assets/images/dark-building.jpg";
import dubaiAerialNight from "@/assets/images/dubai-aerial-night.jpg";
import dubaiBlueHour from "@/assets/images/dubai-blue-hour.jpg";
import dubaiFromAbove from "@/assets/images/dubai-from-above.jpg";
import dubaiNightTower from "@/assets/images/dubai-night-tower.jpg";
import dubaiNightWater from "@/assets/images/dubai-night-water.jpg";
import entranceHall from "@/assets/images/entrance-hall.jpg";
import glassFacadeSky from "@/assets/images/glass-facade-sky.jpg";
import glassTowerUp from "@/assets/images/glass-tower-up.jpg";
import glassTowers from "@/assets/images/glass-towers.jpg";
import kitchenInterior from "@/assets/images/kitchen-interior.jpg";
import loftInterior from "@/assets/images/loft-interior.jpg";
import marbleLobby from "@/assets/images/marble-lobby.jpg";
import rebarWorker from "@/assets/images/rebar-worker.jpg";
import restaurantDusk from "@/assets/images/restaurant-dusk.jpg";
import ropeAccessCleaning from "@/assets/images/rope-access-cleaning.jpg";
import scaffoldWorker from "@/assets/images/scaffold-worker.jpg";
import siteAerial from "@/assets/images/site-aerial.jpg";
import spanners from "@/assets/images/spanners.jpg";
import spiralStair from "@/assets/images/spiral-stair.jpg";
import steelTubes from "@/assets/images/steel-tubes.jpg";
import toolWall from "@/assets/images/tool-wall.jpg";
import whiteStair from "@/assets/images/white-stair.jpg";
import windowCleanersFacade from "@/assets/images/window-cleaners-facade.jpg";
import windowCleanersTower from "@/assets/images/window-cleaners-tower.jpg";
import wineGlasses from "@/assets/images/wine-glasses.jpg";
import type { Media } from "./types";

/**
 * Atmospheric photography.
 *
 * IMPORTANT: none of these images show Gourab projects. They are CC0 /
 * public-domain placeholders that set the visual tone until Gourab supplies
 * its own project photography. Replace freely — every component reads from
 * this registry. Sources are listed in `imageCredits` and on /credits.
 */
export const media = {
  dubaiBlueHour: {
    src: dubaiBlueHour,
    alt: "Dubai skyline at blue hour, the Burj Khalifa reflected in still water",
    position: "55% 60%",
  },
  dubaiNightWater: {
    src: dubaiNightWater,
    alt: "Downtown Dubai towers lit at night across the water",
    position: "50% 55%",
  },
  dubaiAerialNight: {
    src: dubaiAerialNight,
    alt: "Aerial view of Dubai at night with illuminated highways and towers",
    position: "45% 50%",
  },
  dubaiFromAbove: {
    src: dubaiFromAbove,
    alt: "Dubai at night seen from high above, a glass tower facade in the foreground",
    position: "40% 50%",
  },
  dubaiNightTower: {
    src: dubaiNightTower,
    alt: "Downtown Dubai skyline at night with the Burj Khalifa rising above",
    position: "70% 50%",
  },
  cranesDusk: {
    src: cranesDusk,
    alt: "Tower cranes silhouetted against a dusk sky over a construction site",
    position: "60% 50%",
  },
  siteAerial: {
    src: siteAerial,
    alt: "Aerial view of an active construction site with excavation and site works",
    position: "50% 50%",
  },
  rebarWorker: {
    src: rebarWorker,
    alt: "Construction worker in orange overalls walking across a reinforcement mesh",
    position: "62% 30%",
  },
  scaffoldWorker: {
    src: scaffoldWorker,
    alt: "Site worker in a hard hat and high-visibility vest working on scaffolding",
    position: "45% 40%",
  },
  steelTubes: {
    src: steelTubes,
    alt: "Steel tubes and reinforcement stacked on a construction site, seen from above",
    position: "50% 50%",
  },
  glassFacadeSky: {
    src: glassFacadeSky,
    alt: "Looking up a glass curtain wall that reflects the clouds",
    position: "50% 60%",
  },
  glassTowers: {
    src: glassTowers,
    alt: "Two reflective glass towers converging against the sky",
    position: "50% 50%",
  },
  glassTowerUp: {
    src: glassTowerUp,
    alt: "Upward view of a glass high-rise facade with a cantilevered glazed walkway",
    position: "50% 50%",
  },
  concreteWall: {
    src: concreteWall,
    alt: "Board-formed concrete wall with tie holes against a blue sky",
    position: "60% 50%",
  },
  concreteRibs: {
    src: concreteRibs,
    alt: "White concrete ribs forming a rhythmic curved facade",
    position: "30% 50%",
  },
  loftInterior: {
    src: loftInterior,
    alt: "Contemporary interior with a leather lounge chair, concrete beams and a city view",
    position: "45% 55%",
  },
  marbleLobby: {
    src: marbleLobby,
    alt: "Polished marble lobby with a sculptural white wall installation",
    position: "60% 55%",
  },
  kitchenInterior: {
    src: kitchenInterior,
    alt: "Modern fitted kitchen with white cabinetry and black pendant lights",
    position: "50% 50%",
  },
  spanners: {
    src: spanners,
    alt: "A row of heavy ring spanners hanging in order on a workshop rail",
    position: "50% 45%",
  },
  toolWall: {
    src: toolWall,
    alt: "Workshop wall with hand tools arranged on racks",
    position: "50% 50%",
  },
  spiralStair: {
    src: spiralStair,
    alt: "Looking down a white spiral staircase",
    position: "50% 50%",
  },
  whiteStair: {
    src: whiteStair,
    alt: "Minimal white stairwell seen through a narrow opening",
    position: "50% 50%",
  },
  darkBuilding: {
    src: darkBuilding,
    alt: "Corner of a dark brick and glass building seen from below",
    position: "50% 40%",
  },
  restaurantDusk: {
    src: restaurantDusk,
    alt: "Restaurant dining room at dusk, guests seated by tall windows with the city beyond",
    position: "55% 50%",
  },
  wineGlasses: {
    src: wineGlasses,
    alt: "A row of glasses on a bar counter in warm, low light",
    position: "35% 50%",
  },
  entranceHall: {
    src: entranceHall,
    alt: "Grand entrance hall with a red carpet, brass balustrades and arched windows",
    position: "50% 40%",
  },
  windowCleanersTower: {
    src: windowCleanersTower,
    alt: "Rope-access window cleaners working on the glass facade of a tower",
    position: "50% 45%",
  },
  ropeAccessCleaning: {
    src: ropeAccessCleaning,
    alt: "A window cleaner on ropes cleaning the glazing of a residential tower",
    position: "55% 50%",
  },
  windowCleanersFacade: {
    src: windowCleanersFacade,
    alt: "Two harnessed window cleaners working across a building facade",
    position: "45% 45%",
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

export const imageCredits: {
  key: MediaKey;
  title: string;
  author: string;
  license: string;
  source: string;
}[] = [
  { key: "dubaiBlueHour", title: "Dubai skyline", author: "Robert Bock", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg" },
  { key: "dubaiNightWater", title: "Dubai skyscrapers at night", author: "Michaelbibin (Pixabay)", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Dubai_skyscrapers_at_night_2011.jpg" },
  { key: "dubaiAerialNight", title: "Downtown, Dubai", author: "bulletrain743 (Pixabay)", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Downtown,_Dubai_(36714617205).jpg" },
  { key: "dubaiFromAbove", title: "Views from Burj Khalifa", author: "nextvoyage", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Views_from_Burj_Khalifa-3717383.jpg" },
  { key: "dubaiNightTower", title: "Dubai Night Time", author: "Zaib Azhar", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Dubai_Night_Time_(Pexels-804915).jpg" },
  { key: "cranesDusk", title: "Kepong, Kuala Lumpur, Malaysia", author: "EJ Yao", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Kepong,_Kuala_Lumpur,_Malaysia_(Unsplash).jpg" },
  { key: "siteAerial", title: "View Above Construction Site", author: "chuttersnap", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:View_Above_Construction_Site_(Unsplash).jpg" },
  { key: "rebarWorker", title: "Worker at the old Othon palace hotel", author: "Guilherme Cunha", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Worker_at_the_old_Othon_palace_hotel_(Unsplash).jpg" },
  { key: "scaffoldWorker", title: "At a Building site", author: "Clem Onojeghuo", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:At_a_Building_site_(Unsplash).jpg" },
  { key: "steelTubes", title: "Geneva, Switzerland", author: "Samuel Zeller", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Geneva,_Switzerland_(Unsplash).jpg" },
  { key: "glassFacadeSky", title: "Clouds in a tall glass facade", author: "Samuel Zeller", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Clouds_in_a_tall_glass_facade_(Unsplash).jpg" },
  { key: "glassTowers", title: "Reflective skyscraper facade", author: "Guillaume Bolduc", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Reflective_skyscraper_facade_(Unsplash).jpg" },
  { key: "glassTowerUp", title: "Staircase to Heaven", author: "Tobias S.", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Staircase_to_Heaven_(Unsplash).jpg" },
  { key: "concreteWall", title: "Concrete architecture", author: "Lance Anderson", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Concrete_architecture_(Unsplash).jpg" },
  { key: "concreteRibs", title: "Concrete ribs in a facade", author: "Luca Bravo", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Concrete_ribs_in_a_facade_(Unsplash).jpg" },
  { key: "loftInterior", title: "Coffee table corner in a London apartment", author: "Alexander Pemberton", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Coffee_table_corner_in_a_London_apartment_(Unsplash).jpg" },
  { key: "marbleLobby", title: "Hotel lobby with white sculpture", author: "MCMAZ Lunggma", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:MC_%E8%90%AC%E8%B1%AA%E9%85%92%E5%BA%97_JW_Marriott_%E6%BE%B3%E9%96%80%E9%8A%80%E6%B2%B3_Galaxy_Macau_interior_hotel_lobby_white_sculpture_March_2026_N13P_01.jpg" },
  { key: "kitchenInterior", title: "Kitchen", author: "Naomi Hébert", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Kitchen_(Unsplash).jpg" },
  { key: "spanners", title: "Tools in order", author: "Mikael Kristenson", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Tools_in_order_(Unsplash).jpg" },
  { key: "toolWall", title: "Workshop tools", author: "Igor Trepeshchenok", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Werkstatt_Werkzeuge_work_shop_tools_690038.jpg" },
  { key: "spiralStair", title: "Spiral staircase", author: "chuttersnap", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Spiral_staircase_(Unsplash).jpg" },
  { key: "whiteStair", title: "White staircase", author: "Todd Quackenbush", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:White_staircase_(Unsplash).jpg" },
  { key: "darkBuilding", title: "Hell's Kitchen, New York", author: "Ari Crespo", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Hell%27s_Kitchen,_New_York,_United_States_(Unsplash).jpg" },
  { key: "restaurantDusk", title: "Restaurant at dusk", author: "Patryk Sobczak", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Restaurant_at_dusk_(Unsplash).jpg" },
  { key: "wineGlasses", title: "Row of wine glasses in close-up", author: "Henry Fournier", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Row_of_wine_glasses_in_close-up_(Unsplash).jpg" },
  { key: "entranceHall", title: "Elegant entrance hall", author: "Crew", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Elegant_entrance_hall_(Unsplash).jpg" },
  { key: "windowCleanersTower", title: "Harnessed Window Cleaners on Millennium Point, Battery Park", author: "Julian Lupyan", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Harnessed_Window_Cleaners_on_Millennium_Point,_Battery_Park.jpg" },
  { key: "ropeAccessCleaning", title: "Rapel, Clean, Repeat.", author: "Adam Birkett", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Rapel,_Clean,_Repeat._(Unsplash).jpg" },
  { key: "windowCleanersFacade", title: "Window cleaners on a building", author: "Samuel Zeller", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Window_cleaners_on_a_building_(Unsplash).jpg" },
];
