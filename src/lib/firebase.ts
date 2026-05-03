import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Only initialize Firebase if the API key is present
// This prevents build crashes when env vars are not yet set on the server
let app: FirebaseApp | undefined;
let db: Firestore;
let auth: Auth;

if (firebaseConfig.apiKey) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
} else {
  // Provide safe mock objects so the build doesn't crash
  // Real data will load at runtime when env vars are available
  console.warn("Firebase: API key not found. Firebase features will be disabled until env vars are set.");
  // We still need to export something for the build to succeed
  // Pages will handle the case where db is undefined gracefully
  app = undefined as any;
  db = undefined as any;
  auth = undefined as any;
}

export { db, auth };
