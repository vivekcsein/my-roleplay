import { NextResponse } from "next/server";
import {
  AD_CATEGORIES,
  getAdDataset,
  getDatasetVersion,
} from "@/packages/security/ads-registry.server";
import { obfuscate } from "@/packages/security/obfuscate";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ category: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { category } = await context.params;

  if (!AD_CATEGORIES.includes(category as (typeof AD_CATEGORIES)[number])) {
    return NextResponse.json({ error: "Unknown ad category" }, { status: 404 });
  }

  const version = getDatasetVersion(category);
  const requestedVersion = new URL(request.url).searchParams.get("v");

  // Cheap revalidation short-circuit: client already has this exact content.
  if (requestedVersion && requestedVersion === version) {
    return NextResponse.json(
      { notModified: true, version },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const dataset = getAdDataset(category);
  if (!dataset) {
    return NextResponse.json({ error: "Unknown ad category" }, { status: 404 });
  }

  const payload = obfuscate(dataset);

  return NextResponse.json(
    { version, payload },
    { headers: { "Cache-Control": "no-store" } },
  );
}
