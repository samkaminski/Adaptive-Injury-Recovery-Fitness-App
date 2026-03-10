# RehabFit – Injury Recovery Fitness App

## Short Description

RehabFit is a mobile-style fitness app focused on injury-safe rehabilitation workouts. It guides users through exercise-based recovery after common injuries, adapting workouts based on pain, soreness, and readiness signals. The current version is an early skeleton that includes only the UI foundation and navigation scaffold for authentication—no real authentication or backend logic is implemented yet.

## Current Features

The project currently includes:

- **Design tokens and UI styling** — Mint background, primary green, typography, and spacing aligned with a calm, clinical-friendly aesthetic
- **Static Auth Entry screen** — Logo, branding, and auth action buttons (non-functional)
- **Auth navigation scaffold** — React Router setup with AuthStack and AppStack
- **Placeholder screens** — Sign In, Create Account, Forgot Password, and Home
- **Temporary authentication state toggle** — "Continue with Google" and "Sign out" switch between auth and app views for testing navigation

## Tech Stack

- **React** — UI library
- **React Router** — Client-side routing
- **JavaScript** — Application logic
- **CSS** — Styling (design tokens in `index.css`, screen-specific CSS)
- **Firebase** — Planned for authentication and backend; not yet implemented

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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   ```
   http://localhost:5173
   ```

The app will load the RehabFit auth entry screen. You can navigate between placeholder auth pages (Sign In, Create Account, Forgot Password) and a placeholder Home screen using "Continue with Google" and "Sign out" to toggle the auth state for testing.

## Project Structure

```
src/
├── main.jsx          # App entry point
├── App.jsx           # Root component with routing (AuthStack vs AppStack)
├── index.css         # Design tokens and global styles
└── screens/          # Screen components
    ├── AuthEntry.jsx       # Auth entry / choice screen
    ├── AuthEntry.css
    ├── EmailSignIn.jsx     # Placeholder
    ├── CreateAccount.jsx   # Placeholder
    ├── ForgotPassword.jsx  # Placeholder
    ├── Home.jsx            # Placeholder (app home)
    └── PlaceholderScreen.css
```

## Current Development Status

This is an early development skeleton. Upcoming slices will implement:

- Firebase authentication
- Google sign-in
- Guest mode (anonymous auth)
- Onboarding flow
- Workout generation and adaptation logic
