
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Authentication routes handling
  if (req.nextUrl.pathname.startsWith('/auth')) {
    // If user is logged in and trying to access auth pages, redirect to dashboard
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Let unauthenticated users access auth pages
    return res;
  }

  // Protected route handling
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // If user is not logged in, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    // Let authenticated users access dashboard
    return res;
  }

  // Handle root path
  if (req.nextUrl.pathname === '/') {
    // If user is logged in and accessing root, redirect to dashboard
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Let unauthenticated users access landing page
    return res;
  }

  return res;
}

export const config = {
  matcher: ['/', '/auth/:path*', '/dashboard/:path*'],
};
