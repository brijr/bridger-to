import { jsonResponse, notFoundResponse, optionsResponse } from "@/lib/agent/http";
import { abs, paths } from "@/lib/site";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const joined = path.join("/");

  if (joined === "identity") {
    let type = "anonymous";
    try {
      const body: unknown = await request.json();
      if (
        typeof body === "object" &&
        body !== null &&
        "type" in body &&
        typeof body.type === "string"
      ) {
        type = body.type;
      }
    } catch {
      type = "anonymous";
    }

    if (type !== "anonymous") {
      return jsonResponse({
        error: "invalid_request",
        error_description: "Only anonymous registration is supported.",
      });
    }

    return jsonResponse({
      registration_id: "reg_public",
      registration_type: "anonymous",
      identity_assertion: "public",
      assertion_expires: new Date(Date.now() + 86400 * 1000).toISOString(),
      pre_claim_scopes: ["read"],
      claim_url: abs(paths.claim),
    });
  }

  if (joined === "identity/claim") {
    return jsonResponse({
      error: "claimed_or_in_flight",
      error_description:
        "Anonymous public access does not require a claim ceremony.",
    });
  }

  return notFoundResponse();
}

export function OPTIONS() {
  return optionsResponse();
}
