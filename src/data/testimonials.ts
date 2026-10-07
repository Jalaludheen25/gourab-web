import type { Client, Testimonial } from "./types";

/**
 * Client testimonials — only publish genuine, approved quotes.
 * None supplied yet; the testimonials section stays hidden while empty.
 */
export const testimonials: Testimonial[] = [];

/**
 * Client / partner logos — only add organisations Gourab has worked with and
 * has permission to name. Place monochrome SVG/PNG logos in /public/clients.
 * The section stays hidden while empty.
 */
export const clients: Client[] = [];
