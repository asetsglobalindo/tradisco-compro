import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const locale = request.cookies.get("locale") || "en";
  const url = request.nextUrl;

  if (!url.pathname.startsWith(`/${locale}`)) {
    url.pathname = `/${locale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!abc|api|_next/static|images|temp|texture|data|fonts|icons|video|logo|favicon.ico).*)"],
};

