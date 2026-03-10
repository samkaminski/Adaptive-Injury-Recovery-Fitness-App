# RehabFit Auth Flow — Slice Implementation Breakdown

**Platform: Web application only** (no iOS or Android).

Each slice is broken down into concrete implementation tasks. Use this as a checklist during development.

---

## Slice 0: Design Tokens and Static Auth Entry Screen

**Purpose:** Lock the look and feel first so later functionality doesn't distort the UI.

### Design Tokens to Implement

- [ ] **Colors**
  - [ ] Mint background (light green, matches screenshot)
  - [ ] Primary green (for logo, icons, primary button)
  - [ ] Dark gray (app name, primary text)
  - [ ] Light gray (supporting copy, secondary text)
- [ ] **Typography**
  - [ ] Bold sans-serif for "RehabFit" app name
  - [ ] Restrained font sizes (no heavy gradients or loud contrast)
- [ ] **Spacing**
  - [ ] Generous whitespace
  - [ ] Narrow centered column width
- [ ] **Components**
  - [ ] Full-width rounded primary button (consistent with screenshot "Get Started" bar)
  - [ ] Rounded pill geometry for secondary buttons

### Auth Entry Screen (Static)

- [ ] **Layout**
  - [ ] Mint background applied
  - [ ] Centered content column
  - [ ] Logo at top center (rounded green square with waveform icon)
  - [ ] "RehabFit" title below logo
  - [ ] Subtitle: "Sign in to save plans and track recovery safely."
- [ ] **Auth Actions (visible, non-functional)**
  - [ ] "Continue with Google" button
  - [ ] "Sign in with email" button
  - [ ] "Continue as Guest" text link
- [ ] **Secondary Links (visible, non-functional)**
  - [ ] "Create account" link
  - [ ] "Forgot password" link
- [ ] **Primary CTA**
  - [ ] Large green button anchored near bottom (e.g., "Continue" or "Get Started")

### Backend / Firebase

- None

### Navigation

- None (or stub handlers that do nothing)

### Testing

- [ ] Snapshot-style visual checks
- [ ] Renders correctly in Chrome
- [ ] Renders correctly in Firefox and Safari (or target browsers)

### Definition of Done

First screen visually matches the reference screenshot's layout and button geometry.

---

## Slice 1: Navigation Scaffold (AuthStack vs AppStack)

**Purpose:** Create the runnable skeleton that will host real authentication.

### Frontend Tasks

- [ ] **Install / configure React Router**
  - [ ] `react-router-dom`
  - [ ] Set up routes for auth flow and app flow
- [ ] **Auth routes (AuthStack)**
  - [ ] Auth Entry (Auth Choice) — from Slice 0
  - [ ] Email Sign In — empty placeholder
  - [ ] Create Account — empty placeholder
  - [ ] Forgot Password — empty placeholder
- [ ] **App routes (AppStack)**
  - [ ] Placeholder Home screen ("You're signed in" + Sign out button)
- [ ] **Root routing**
  - [ ] Conditionally render AuthStack or AppStack based on temporary state variable
  - [ ] Manual toggle for testing (e.g., dev button or hardcoded `isAuthenticated`)

### Navigation Behavior

- [ ] "Continue with Google" → navigate to (stub: could stay or go to Home for testing)
- [ ] "Sign in with email" → navigate to Email Sign In screen
- [ ] "Create account" link → navigate to Create Account screen
- [ ] "Forgot password" link → navigate to Forgot Password screen
- [ ] Back navigation works on all screens

### Backend / Firebase

- None

### Testing

- [ ] Each screen is reachable
- [ ] Back navigation works
- [ ] Can manually switch between AuthStack and AppStack

### Definition of Done

All auth-related screens exist (even if empty), and the app can switch between auth and app sections.

---

## Slice 2: Firebase Initialization and Persistent Auth State

**Purpose:** Make auth "stick" across app restarts.

### Frontend Tasks

- [ ] **AuthProvider (React Context)**
  - [ ] Create `AuthProvider` component
  - [ ] Initialize Firebase Auth on mount
  - [ ] Subscribe to `onAuthStateChanged`
  - [ ] Expose `user` (current user or null)
  - [ ] Expose `loading` (auth initialization in progress)
  - [ ] Expose auth actions: `signIn`, `signOut`, etc. (can be stubbed initially)
- [ ] **Wrap app with AuthProvider**
  - [ ] Root component wrapped in `<AuthProvider>`

### Firebase / Backend Tasks

- [ ] **Firebase project setup**
  - [ ] Create Firebase project (if not exists)
  - [ ] Add Web app to Firebase project
  - [ ] Install `firebase` package
- [ ] **Auth initialization**
  - [ ] Use `getAuth(app)` — Firebase Auth persists to `localStorage` by default on web
  - [ ] No extra persistence config needed (browser handles it automatically)

### Navigation Behavior

- [ ] Root router shows loading state until auth init completes
- [ ] If `user == null` → show AuthStack
- [ ] If `user` present → show AppStack
- [ ] Remove manual toggle; use real auth state

### Data Model

- None yet

### Testing

- [ ] App shows loading briefly on launch
- [ ] Unauthenticated user sees AuthStack
- [ ] (After Slice 3+) Sign in, close browser tab, reopen app → bypasses AuthStack, lands in AppStack

### Definition of Done

App reliably remembers auth state across restarts.

---

## Slice 3: Guest Mode (Firebase Anonymous Auth)

**Purpose:** Implement "Continue as Guest" with real Firebase identity.

### Frontend Tasks

- [ ] **Wire "Continue as Guest" button**
  - [ ] On press, call `signInAnonymously(auth)`
  - [ ] Show loading/busy state during sign-in
- [ ] **Error handling**
  - [ ] Catch errors from `signInAnonymously`
  - [ ] Display friendly inline error message on failure
- [ ] **Success flow**
  - [ ] Auth state updates automatically
  - [ ] Auth gate routes user to AppStack (no extra code if Slice 2 is correct)

### Firebase / Backend Tasks

- [ ] **Firebase Console**
  - [ ] Enable Anonymous authentication provider
- [ ] **Implementation**
  - [ ] `signInAnonymously(auth)` on button press

### Navigation Behavior

- [ ] On success: user routes to AppStack via auth gate
- [ ] Sign out from Home: user returns to AuthStack

### Data Model (Optional)

- [ ] Create `users/{uid}` document on first sign-in with:
  - [ ] `createdAt` (server timestamp)
  - [ ] `lastLoginAt` (server timestamp)
  - [ ] `isAnonymous: true`
  - [ ] `provider: "anonymous"`

### Testing

- [ ] Press "Continue as Guest" → land in AppStack
- [ ] Sign out → return to AuthStack
- [ ] Repeat guest sessions work (new anonymous UID each time if signed out)

### Definition of Done

Guest entry is functional, stable, and routes correctly.

---

## Slice 4: Email Sign Up and Email Sign In

**Purpose:** Implement standard account flow with minimal UI friction.

### Frontend Tasks

- [ ] **Email Sign In screen**
  - [ ] Email input field
  - [ ] Password input field
  - [ ] Primary "Sign in" button
  - [ ] Link to "Forgot password" (navigate to Forgot Password screen)
  - [ ] Link to "Create account" (navigate to Create Account screen)
- [ ] **Create Account screen**
  - [ ] Email input field
  - [ ] Password input field
  - [ ] Primary "Create account" button
  - [ ] Link back to Sign In
- [ ] **Validation**
  - [ ] Required fields (email, password)
  - [ ] Minimum password length (e.g., 6 chars for Firebase)
  - [ ] Email format validation
  - [ ] Simple error message mapping (Firebase error codes → user-friendly text)
- [ ] **Error display**
  - [ ] Show validation errors inline
  - [ ] Show Firebase auth errors (wrong password, email in use, etc.)

### Firebase / Backend Tasks

- [ ] **Firebase Console**
  - [ ] Enable Email/Password authentication provider
- [ ] **Create Account**
  - [ ] `createUserWithEmailAndPassword(auth, email, password)` on form submit
- [ ] **Sign In**
  - [ ] `signInWithEmailAndPassword(auth, email, password)` on form submit

### Navigation Behavior

- [ ] Auth Entry "Sign in with email" → Email Sign In screen
- [ ] Auth Entry "Create account" link → Create Account screen
- [ ] On success: user routes to AppStack via auth gate

### Data Model (Optional)

- [ ] Create/update `users/{uid}` on sign-up or first sign-in:
  - [ ] `createdAt`, `lastLoginAt`
  - [ ] `isAnonymous: false`
  - [ ] `provider: "password"`
  - [ ] `email` (from user)

### Testing

- [ ] Create account → success
- [ ] Sign out → Sign in again → success
- [ ] Wrong password → friendly error
- [ ] Weak password → validation error
- [ ] Malformed email → validation error
- [ ] Email already in use → friendly error

### Definition of Done

New user can create account, sign in, stay signed in, and sign out.

---

## Slice 5: Forgot Password and Recovery UX

**Purpose:** Implement password reset flow.

### Frontend Tasks

- [ ] **Forgot Password screen**
  - [ ] Email input field
  - [ ] Primary "Send reset email" (or similar) button
  - [ ] Link "Back to sign in" → Email Sign In screen
- [ ] **Success state**
  - [ ] After successful request: show "Check your email" message
  - [ ] Option to go "Back to sign in"
- [ ] **Error state**
  - [ ] Neutral error message (don't reveal whether email exists)
  - [ ] Handle Firebase errors without crashing

### Firebase / Backend Tasks

- [ ] **Implementation**
  - [ ] `sendPasswordResetEmail(auth, email)` on form submit
- [ ] **Firebase Console (optional)**
  - [ ] Customize password reset email template if desired

### Navigation Behavior

- [ ] Email Sign In screen → "Forgot password" link → Forgot Password screen
- [ ] Forgot Password → "Back to sign in" → Email Sign In screen

### Data Model

- None

### Testing

- [ ] Test with real email or Auth emulator
- [ ] Verify flow triggers (email sent or emulator receives)
- [ ] UI handles errors without crashing
- [ ] Success state displays correctly

### Definition of Done

Password reset requests can be initiated from the web app.

---

## Slice 6: Google Sign-In Implementation

**Purpose:** Deliver "Continue with Google" end-to-end.

### Frontend Tasks

- [ ] **Wire "Continue with Google" button**
  - [ ] On press, initiate Google OAuth flow
  - [ ] Show busy/loading state during sign-in
- [ ] **Error handling**
  - [ ] Catch errors (user cancel, network, config issues)
  - [ ] Display friendly error message on failure

### Firebase / Backend Tasks

- [ ] **Firebase Console**
  - [ ] Enable Google authentication provider
  - [ ] Configure Web OAuth client ID (add authorized domain for your app URL)
- [ ] **Implementation (web)**
  - [ ] Create `GoogleAuthProvider` instance
  - [ ] Use `signInWithPopup(auth, googleProvider)` (or `signInWithRedirect` if popups are blocked)
  - [ ] Firebase handles the OAuth flow natively in the browser

### Navigation Behavior

- [ ] On success: auth gate routes to AppStack

### Data Model (Optional)

- [ ] Store provider metadata on `users/{uid}`: `provider: "google"`

### Testing

- [ ] Test in Chrome, Firefox, Safari (popup/redirect behavior may vary)
- [ ] Verify authorized domain is configured in Firebase Console
- [ ] Verify persistence across browser refresh/close (Slice 2)

### Definition of Done

Clicking "Continue with Google" results in Firebase-authenticated session and correct routing.

---

## Appendix: Minimal Firestore Schema (Optional, Slices 3–6)

```
users/{uid}
├── createdAt      (server timestamp)
├── lastLoginAt    (server timestamp)
├── isAnonymous    (boolean)
├── provider       ("anonymous" | "password" | "google")
├── displayName    (nullable string)
└── email          (nullable string)
```

**Security rule:** `allow read, write: if request.auth.uid == uid;`

---

## Appendix: Firebase Auth Emulator (Recommended)

- [ ] Install Firebase CLI
- [ ] `firebase init emulators` → Auth emulator
- [ ] `connectAuthEmulator(auth, "http://127.0.0.1:9099")` in dev
- [ ] Use emulator for local testing (no production user pollution)
