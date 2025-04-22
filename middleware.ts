import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes (require login)
const isDashboardRoute = createRouteMatcher([
  '/dashboard(.*)', // Protect dashboard and its sub-routes
])

// Define public routes (accessible without login, redirect logged-in users away)
const isPublicRoute = createRouteMatcher([
  '/', // Landing page
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Add any webhook routes if they need to be public
  // '/api/webhooks/clerk',
])

/**
 * Enable authentication with Clerk
 */
export default clerkMiddleware(async (auth, req) => {
  // Get userId and redirect helper by calling auth()
  const { userId, redirectToSignIn } = await auth()
  const dashboardUrl = new URL('/dashboard/new-project', req.url)

  // If the user is logged in and trying to access a public-only route,
  // redirect them to the dashboard.
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(dashboardUrl)
  }

  // If the user is not logged in and trying to access a protected route (dashboard),
  // redirect them to the sign-in page using the redirectToSignIn method on the auth object.
  if (!userId && isDashboardRoute(req)) {
    // Redirect unauthenticated users to sign in
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  // If none of the above conditions match, allow the request to proceed.
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)',
  ],
}
