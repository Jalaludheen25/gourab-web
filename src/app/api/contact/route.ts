import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact form endpoint.
 *
 * Delivery: set CONTACT_FORM_ENDPOINT to any service that accepts a JSON POST
 * (e.g. Formspree, Make/Zapier webhook, or your own API). Without it:
 *  - development: the enquiry is logged to the server console
 *  - production:  responds 503 so the form offers a pre-filled email instead
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled → pretend success so bots learn nothing
    if (typeof body === "object" && body !== null && "website" in body && (body as { website?: string }).website) {
      return Response.json({ ok: true });
    }
    return Response.json(
      { ok: false, error: "validation", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 422 },
    );
  }

  const { website: _honeypot, ...enquiry } = parsed.data;
  void _honeypot;
  const payload = { ...enquiry, submittedAt: new Date().toISOString(), source: "gourab-website" };
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!res.ok) return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
      return Response.json({ ok: true });
    } catch {
      return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] New enquiry (CONTACT_FORM_ENDPOINT not set):", payload);
    return Response.json({ ok: true, delivered: false });
  }

  return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
}
