import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('SPOTIFY_CLONE_ACCESS_TOKEN')

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }
}

export const config = {
  matcher: ['/', '/playlist', '/playlist/(.*)', '/library']
}
