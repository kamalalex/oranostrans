import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let locales = ['en', 'fr']
let defaultLocale = 'fr'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('Middleware triggered for:', pathname)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and common static assets
    '/((?!_next|api|favicon.ico|logo.png|og-image.png|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
}
