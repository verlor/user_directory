import { NextRequest, NextResponse } from "next/server";

const DEFAULT_ALLOWED_HEADERS = "Content-Type, Authorization";
const DEFAULT_ALLOWED_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";
const CORS_ALLOWED_ORIGINS = "http://localhost:3001,https://codesandbox.io";


function getAllowedOrigins(): string[] {
  return (CORS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getCorsHeaders(request: NextRequest): Headers {
  const requestOrigin = request.headers.get("origin");
  const headers = new Headers();

  if (!requestOrigin) {
    return headers;
  }

  const allowedOrigins = getAllowedOrigins();
  const isAllowedOrigin = allowedOrigins.includes(requestOrigin);

  if (!isAllowedOrigin) {
    return headers;
  }

  headers.set("Access-Control-Allow-Origin", requestOrigin);
  headers.set("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
  headers.set(
    "Access-Control-Allow-Headers",
    request.headers.get("access-control-request-headers") ?? DEFAULT_ALLOWED_HEADERS,
  );
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Max-Age", "86400");
  headers.set("Vary", "Origin");

  return headers;
}

export function middleware(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const response = NextResponse.next();
  corsHeaders.forEach((value, key) => response.headers.set(key, value));
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
