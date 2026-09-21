import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cachedAuth: Auth | undefined;
let cachedDb: Firestore | undefined;

const ensureFirebaseAdminApp = () => {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ) as string,
      }),
    });
  }
};

// Firebase Admin is initialized lazily, on first actual use, instead of at
// module import time. This keeps routes that merely import this module (but
// never touch auth/db during Next.js's build-time page data collection) from
// crashing when Firebase credentials aren't configured yet.
export const getFirebaseAuth = (): Auth => {
  if (!cachedAuth) {
    ensureFirebaseAdminApp();
    cachedAuth = getAuth();
  }
  return cachedAuth;
};

export const getFirebaseDb = (): Firestore => {
  if (!cachedDb) {
    ensureFirebaseAdminApp();
    cachedDb = getFirestore();
  }
  return cachedDb;
};
