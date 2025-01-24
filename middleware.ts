import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const languageValue = request.cookies.get("lang")?.value || "id";

  response.cookies.set("lang", languageValue);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!abc|api|_next/static|images|temp|texture|data|fonts|icons|video|logo|favicon.ico).*)"],
};

