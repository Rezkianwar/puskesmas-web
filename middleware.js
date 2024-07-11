import { authMiddleware as clerkAuthMiddleware } from '@clerk/nextjs/server';
import { withAuth as nextAuthMiddleware } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === '/pendaftaran') {
    const response = await clerkAuthMiddleware({
      publicRoutes: ["/", "/pendaftaran", "/factor-one"],
    })(req);
    if (response) return response;
  }

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/dashboardPegawai')) {
    const response = await nextAuthMiddleware({
      callbacks: {
        authorized: ({ token }) => !!token,
      },
      pages: {
        signIn: '/loginDashboard',
      },
    })(req);
    if (response) return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/factor-one', '/pendaftaran', '/dashboard', '/dashboardPegawai'],
};


