import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/s(.*)",          // public storefront
  "/sign-in(.*)",    // Clerk sign-in page
  "/sign-up(.*)",    // Clerk sign-up page
  "/api/webhooks(.*)" // keep webhooks public if you have them
])

export default clerkMiddleware(async (auth, req) => {
  // Platform domain - use normal routing
  // Allow public routes without auth
  if (isPublicRoute(req)) return

  // Protect everything else (including /onboarding and /dashboard)
  // Note: /onboarding requires auth but NOT merchant (handled in page)
  auth().protect()
})

export const config = {
  matcher: [
    // run middleware on all routes except next internals and static files
    "/((?!_next|.*\\.(?:css|js|map|png|jpg|jpeg|gif|svg|ico|webp|ttf|woff|woff2)).*)",
    "/(api|trpc)(.*)",
  ],
};
