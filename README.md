# RehabFit – Injury Recovery Fitness App

## Short Description

RehabFit is a mobile-style fitness app focused on injury-safe rehabilitation workouts. It guides users through exercise-based recovery after common injuries, adapting workouts based on pain, soreness, and readiness signals. The current version includes the UI foundation, navigation scaffold, and Firebase authentication with guest (anonymous) sign-in. Email/password and Google sign-in are not yet implemented.

## Current Features

The project currently includes:

- **Design tokens and UI styling** — Mint background, primary green, typography, and spacing aligned with a calm, clinical-friendly aesthetic
- **Auth Entry screen** — Logo, branding, and auth action buttons
- **Firebase authentication** — Auth state persists across browser refresh and restarts
- **Guest mode (anonymous auth)** — "Continue as Guest" signs in anonymously via Firebase
- **Auth navigation scaffold** — React Router with AuthStack and AppStack, gated by auth state
- **Placeholder screens** — Sign In, Create Account, Forgot Password, and Home
- **Sign out** — Returns user to AuthStack

## Tech Stack

- **React** — UI library
- **React Router** — Client-side routing
- **Firebase** — Authentication only (Firestore integration planned for a future slice)
- **JavaScript** — Application logic
- **CSS** — Styling (design tokens in `index.css`, screen-specific CSS)

## Running Without Firebase

The app can render and run locally **without Firebase configuration**. You can test the UI and navigate between auth screens (Sign in with email, Create account, Forgot password). When Firebase is not configured, "Continue with Google" and "Continue as Guest" are disabled, and a small notice is shown. Real guest authentication requires Firebase setup (see below).

## Firebase Setup

To enable guest sign-in and other auth features, configure Firebase:

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/).

2. **Add a Web app** to your project and copy the config values.

3. **Enable Anonymous Authentication** in Firebase Console → Authentication → Sign-in method → Anonymous → Enable.

4. **Create a `.env` file** in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

5. **Fill in your Firebase config** in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

## How to Run the Project

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Adaptive-Injury-Recovery-Fitness-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (see [Firebase Setup](#firebase-setup) above).

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in your browser**
   ```
   http://localhost:5173
   ```

The app will show a loading state briefly, then the RehabFit auth entry screen. Use **"Continue as Guest"** to sign in anonymously—you will be routed to the Home screen. **Sign out** returns you to the auth screen. Auth state persists across page refresh and browser restarts.

## Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Root component with auth-gated routing
├── index.css             # Design tokens and global styles
├── firebase/
│   └── config.js         # Firebase initialization
├── context/
│   └── AuthContext.jsx   # AuthProvider, useAuth hook
└── screens/              # Screen components
    ├── AuthEntry.jsx       # Auth entry (includes guest sign-in)
    ├── AuthEntry.css
    ├── EmailSignIn.jsx     # Placeholder
    ├── CreateAccount.jsx   # Placeholder
    ├── ForgotPassword.jsx  # Placeholder
    ├── Home.jsx            # App home (sign out)
    └── PlaceholderScreen.css
```

## Testing Guest Sign-In

1. Start the app with `npm run dev`.
2. On the auth entry screen, click **"Continue as Guest"**.
3. You should land on the Home screen ("You're signed in").
4. Click **Sign out** — you return to the auth screen.
5. Refresh the page while signed in — you stay on Home (auth persists).
6. Sign out and click "Continue as Guest" again — a new anonymous session is created.

## Current Development Status

**Note:** The app uses **Firebase Authentication only**. Firestore integration is planned for a future slice and will be implemented by a separate teammate. No database setup is required to run the project.

Implemented:

- Firebase authentication with persistent auth state
- Guest mode (anonymous auth)
- Auth-gated routing (AuthStack vs AppStack)

Upcoming slices will implement:

- Email/password sign-in and sign-up
- Google sign-in
- Forgot password
- Onboarding flow
- Workout generation and adaptation logic

## Remaining Work

This section helps teammates quickly see what is done, partially done, and still to build. The current focus has been the UI shell, routing, and auth scaffolding. Firestore and user database work can be handled in a later slice or by another teammate.

### Fully implemented

- **Slice 0: Design Tokens and Static Auth Entry Screen** — Done. Mint background, logo, typography, auth action buttons, primary CTA, "Continue as Guest" link.
- **Slice 1: Navigation Scaffold** — Done. AuthStack (Auth Entry, Email Sign In, Create Account, Forgot Password) and AppStack (Home). React Router, conditional routing, back navigation.

### Partially implemented (depends on Firebase setup)

- **Slice 2: Firebase Initialization and Persistent Auth State**
  - Code is in place: AuthProvider, `onAuthStateChanged`, loading state, auth-gated routing.
  - Remaining (environment-dependent):
    - Create Firebase project if not done
    - Fill in `.env` with real config values
    - Confirm auth initializes without errors locally
    - Verify auth state persists across refresh and browser restart

- **Slice 3: Guest Mode (Firebase Anonymous Auth)**
  - Code is in place: "Continue as Guest" calls `signInAnonymously`, error handling, sign out.
  - Remaining (environment-dependent):
    - Enable Anonymous Authentication in Firebase Console
    - Test "Continue as Guest" end-to-end
    - Confirm sign out returns user to AuthStack
    - Confirm auth-gated routing works after real sign-in (user stays on Home until sign out)

### Not implemented yet

- **Slice 4: Email Sign In and Create Account**
  - Form UI for email and password on both screens
  - Firebase `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`
  - Validation (required fields, password length, email format)
  - Error handling and user-friendly error messages
  - Success routing to AppStack

- **Slice 5: Forgot Password**
  - Forgot Password form with email field
  - Firebase `sendPasswordResetEmail` integration
  - Success state ("Check your email")
  - Error state (neutral message, no email enumeration)

- **Slice 6: Google Sign In**
  - Enable Google provider in Firebase Console
  - Wire "Continue with Google" button
  - Implement `signInWithPopup` (or `signInWithRedirect`) flow
  - Handle auth state after Google sign-in
