import { NextResponse } from "next/server";

type AvatarStyle = "pattern" | "persona";

const PALETTES = [
  ["#0F172A", "#1D4ED8", "#38BDF8", "#E2E8F0"],
  ["#111827", "#059669", "#34D399", "#ECFDF5"],
  ["#1F2937", "#D97706", "#FBBF24", "#FFFBEB"],
  ["#3F1D2E", "#BE185D", "#F472B6", "#FDF2F8"],
  ["#202938", "#7C3AED", "#A78BFA", "#F5F3FF"],
  ["#1A2E2A", "#0F766E", "#2DD4BF", "#F0FDFA"],
];

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed: number) {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length) % arr.length];
}

function renderPatternAvatar(seed: number, label: string): string {
  const rng = createRng(seed);
  const palette = pick(PALETTES, rng);
  const [base, accentA, accentB, accentC] = palette;

  const bars = Array.from({ length: 7 }, (_, i) => {
    const y = 12 + i * 24;
    const h = 10 + Math.floor(rng() * 18);
    const w = 80 + Math.floor(rng() * 120);
    const x = Math.floor(rng() * (180 - w));
    const opacity = 0.2 + rng() * 0.45;
    const color = i % 2 === 0 ? accentA : accentB;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.floor(h / 2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
  }).join("\n    ");

  const rings = Array.from({ length: 5 }, () => {
    const cx = 20 + Math.floor(rng() * 140);
    const cy = 20 + Math.floor(rng() * 140);
    const r = 10 + Math.floor(rng() * 45);
    const stroke = rng() > 0.5 ? accentC : accentB;
    const strokeWidth = 2 + Math.floor(rng() * 5);
    const opacity = 0.2 + rng() * 0.4;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity.toFixed(2)}"/>`;
  }).join("\n    ");

  const dots = Array.from({ length: 36 }, () => {
    const cx = Math.floor(rng() * 180);
    const cy = Math.floor(rng() * 180);
    const r = 1 + Math.floor(rng() * 4);
    const color = rng() > 0.5 ? accentB : accentC;
    const opacity = 0.3 + rng() * 0.5;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
  }).join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Pattern avatar for ${escapeXml(label)}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${base}"/>
      <stop offset="100%" stop-color="#0b1020"/>
    </linearGradient>
    <clipPath id="clip">
      <rect width="180" height="180" rx="90"/>
    </clipPath>
  </defs>
  <rect width="180" height="180" rx="90" fill="url(#bg)"/>
  <g clip-path="url(#clip)">
    ${bars}
    ${rings}
    ${dots}
  </g>
</svg>`;
}

function renderPersonaAvatar(seed: number, label: string): string {
  const rng = createRng(seed);
  const [bgA, bgB, accentA, accentB] = pick(PALETTES, rng);

  const skinTones = ["#FEE4C7", "#F6D2B1", "#E7B98F", "#D39C72", "#B87A52", "#8D5E3C"];
  const hairColors = ["#111827", "#2D1B10", "#5B3A29", "#8A5A44", "#D6B37A", "#5F4B8B", "#0F766E"];
  const eyeColors = ["#0F172A", "#1E293B", "#334155", "#5B4636", "#0F766E", "#1D4ED8"];
  const shirtColors = ["#E11D48", "#0284C7", "#16A34A", "#A21CAF", "#EA580C", "#0F766E", "#334155"];

  const skin = pick(skinTones, rng);
  const hairColor = pick(hairColors, rng);
  const eyeColor = pick(eyeColors, rng);
  const shirt = pick(shirtColors, rng);

  const faceShape = Math.floor(rng() * 3);
  const hairStyle = Math.floor(rng() * 5);
  const eyeStyle = Math.floor(rng() * 3);
  const noseStyle = Math.floor(rng() * 3);
  const mouthStyle = Math.floor(rng() * 4);
  const browTilt = -2 + Math.floor(rng() * 5);

  const hasGlasses = rng() > 0.55;
  const hasFreckles = rng() > 0.65;
  const hasFacialHair = rng() > 0.62;
  const hasEarrings = rng() > 0.75;

  const head =
    faceShape === 0
      ? `<ellipse cx="90" cy="95" rx="35" ry="43" fill="${skin}"/>`
      : faceShape === 1
        ? `<rect x="57" y="52" width="66" height="86" rx="30" fill="${skin}"/>`
        : `<path d="M90 50c20 0 36 14 36 34v22c0 21-16 37-36 37s-36-16-36-37V84c0-20 16-34 36-34z" fill="${skin}"/>`;

  const hair =
    hairStyle === 0
      ? `<path d="M40 86c5-30 22-46 50-46s45 16 50 46c-8-8-18-13-31-14H71c-13 1-23 6-31 14z" fill="${hairColor}"/>`
      : hairStyle === 1
        ? `<path d="M36 90c4-35 25-52 54-52s50 17 54 52c-13-12-27-17-54-17s-41 5-54 17z" fill="${hairColor}"/>`
        : hairStyle === 2
          ? `<path d="M43 84c8-24 24-38 47-38s39 14 47 38l-8 4c-10-10-20-15-39-15S61 78 51 88z" fill="${hairColor}"/>`
          : hairStyle === 3
            ? `<path d="M45 87c2-29 20-45 45-45s43 16 45 45c-11-9-22-14-45-14s-34 5-45 14z" fill="${hairColor}"/><path d="M54 70c8-7 18-10 36-10" stroke="#ffffff33" stroke-width="3"/>`
            : `<path d="M38 90c6-32 23-49 52-49s46 17 52 49c-9-8-22-14-52-14s-43 6-52 14z" fill="${hairColor}"/>`;

  const eyes =
    eyeStyle === 0
      ? `<ellipse cx="73" cy="98" rx="6" ry="4" fill="#fff"/><ellipse cx="107" cy="98" rx="6" ry="4" fill="#fff"/><circle cx="73" cy="98" r="2.5" fill="${eyeColor}"/><circle cx="107" cy="98" r="2.5" fill="${eyeColor}"/>`
      : eyeStyle === 1
        ? `<circle cx="73" cy="98" r="4" fill="${eyeColor}"/><circle cx="107" cy="98" r="4" fill="${eyeColor}"/><circle cx="72" cy="97" r="1" fill="#fff"/><circle cx="106" cy="97" r="1" fill="#fff"/>`
        : `<path d="M67 98c2-4 10-4 12 0" stroke="${eyeColor}" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M101 98c2-4 10-4 12 0" stroke="${eyeColor}" stroke-width="3" stroke-linecap="round" fill="none"/>`;

  const brows = `<path d="M65 88c4 ${browTilt} 12 ${browTilt} 16 0" stroke="#3a2a21" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M99 88c4 ${-browTilt} 12 ${-browTilt} 16 0" stroke="#3a2a21" stroke-width="3" stroke-linecap="round" fill="none"/>`;

  const nose =
    noseStyle === 0
      ? `<path d="M90 101v12" stroke="#a26c4a" stroke-width="2.5" stroke-linecap="round"/>`
      : noseStyle === 1
        ? `<path d="M90 100c-2 6-2 10 0 13" stroke="#a26c4a" stroke-width="2.5" stroke-linecap="round" fill="none"/>`
        : `<circle cx="90" cy="110" r="2" fill="#a26c4a"/>`;

  const mouth =
    mouthStyle === 0
      ? `<path d="M76 121c5 6 23 6 28 0" stroke="#7C2D12" stroke-width="3" stroke-linecap="round" fill="none"/>`
      : mouthStyle === 1
        ? `<path d="M76 123c6-3 22-3 28 0" stroke="#7C2D12" stroke-width="3" stroke-linecap="round" fill="none"/>`
        : mouthStyle === 2
          ? `<ellipse cx="90" cy="123" rx="8" ry="4" fill="#B91C1C" opacity="0.85"/>`
          : `<path d="M80 123h20" stroke="#7C2D12" stroke-width="3" stroke-linecap="round"/>`;

  const glasses = hasGlasses
    ? `<rect x="63" y="91" width="18" height="13" rx="4" fill="none" stroke="#111827" stroke-width="2"/><rect x="99" y="91" width="18" height="13" rx="4" fill="none" stroke="#111827" stroke-width="2"/><path d="M81 97h18" stroke="#111827" stroke-width="2"/>`
    : "";

  const freckles = hasFreckles
    ? `<circle cx="78" cy="111" r="1.2" fill="#8b5a3c"/><circle cx="72" cy="113" r="1.1" fill="#8b5a3c"/><circle cx="102" cy="111" r="1.2" fill="#8b5a3c"/><circle cx="108" cy="113" r="1.1" fill="#8b5a3c"/>`
    : "";

  const facialHair = hasFacialHair
    ? `<path d="M74 126c5 7 27 7 32 0" stroke="#3f2a1f" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M84 118c2 2 10 2 12 0" stroke="#3f2a1f" stroke-width="3" stroke-linecap="round" fill="none"/>`
    : "";

  const earrings = hasEarrings
    ? `<circle cx="54" cy="110" r="2.2" fill="${accentB}"/><circle cx="126" cy="110" r="2.2" fill="${accentB}"/>`
    : "";

  const shoulderShape = rng() > 0.5
    ? `<rect x="28" y="126" width="124" height="72" rx="34" fill="${shirt}"/>`
    : `<path d="M24 188c8-34 28-55 66-55s58 21 66 55z" fill="${shirt}"/>`;

  const bgDecoration = `<circle cx="28" cy="26" r="16" fill="${accentA}" opacity="0.35"/><circle cx="152" cy="30" r="11" fill="${accentB}" opacity="0.25"/><path d="M18 153c20-9 39-8 55 0" stroke="#ffffff33" stroke-width="4" stroke-linecap="round"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Persona avatar for ${escapeXml(label)}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${bgA}"/>
      <stop offset="100%" stop-color="${bgB}"/>
    </linearGradient>
    <clipPath id="clip">
      <rect width="180" height="180" rx="90"/>
    </clipPath>
  </defs>
  <rect width="180" height="180" rx="90" fill="url(#bg)"/>
  <g clip-path="url(#clip)">
    ${bgDecoration}
    ${shoulderShape}
    ${head}
    ${hair}
    ${brows}
    ${eyes}
    ${nose}
    ${mouth}
    ${glasses}
    ${freckles}
    ${facialHair}
    ${earrings}
  </g>
</svg>`;
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(request.url);
  const { id } = await context.params;

  const styleParam = (searchParams.get("style") ?? "persona").toLowerCase();
  const style: AvatarStyle = styleParam === "pattern" ? "pattern" : "persona";
  const name = searchParams.get("name") ?? `User ${id}`;

  const seed = hashString(`${id}:${name}:${style}`);
  const svg = style === "pattern" ? renderPatternAvatar(seed, name) : renderPersonaAvatar(seed, name);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
