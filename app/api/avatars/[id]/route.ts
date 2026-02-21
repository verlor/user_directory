import { NextResponse } from "next/server";

const COLORS = [
  "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#14B8A6", "#8B5CF6", "#F97316", "#0EA5E9",
];

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
  return initials || "U";
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(request.url);
  const { id } = await context.params;

  const numericId = Number(id);
  const name = searchParams.get("name") ?? `User ${id}`;
  const initials = initialsFromName(name);
  const bg = COLORS[Math.abs(Number.isFinite(numericId) ? numericId : 0) % COLORS.length];
  const label = escapeXml(name);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Avatar for ${label}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="90" fill="url(#bg)"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="64" font-family="Arial, sans-serif" font-weight="700">${initials}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
