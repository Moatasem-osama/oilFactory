import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  // Handle API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Handle admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Handle static files
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.includes('.')) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
