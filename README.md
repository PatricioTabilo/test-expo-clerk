# Detected Issues: isLoaded and signOut()

## Problem description with isLoaded

**Context:** During the initialization of the application without an authenticated user, we have observed that the isLoaded status never changes to true. This behavior prevents the SplashScreen from hiding and the application from advancing to the operational state.

**How to reproduce:**

- Start the application without being logged in.
- Check the useEffect in `src/app/(app)/_layout.tsx`, specifically at line 16.
- Notice that the SplashScreen remains visible and the isLoaded status does not change to true.

## Problem description with signOut()

**Context:** When executing the signOut() function from src/app/(app)/settings.tsx (line 13), there is a problem: it attempts to make a call to the browser's window object. This approach presents problems in native environments where the window object is not available.

**How to reproduce:**

- Go to the settings within the application and execute the logout function.
- Check the code in src/app/(app)/settings.tsx, at line 13, where signOut() is called.

**Note:** It appears that the error may be due to an attempt to perform a redirect.
