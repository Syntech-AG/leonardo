import { NextResponse } from 'next/server'

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/shop')) {
    
    const allCookies = req.cookies.getAll()
    const hasSession = allCookies.some(cookie => 
      cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
    )

    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/shop/:path*'],
}