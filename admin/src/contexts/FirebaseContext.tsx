import {
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
  setUserId
} from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore
} from 'firebase/firestore';
import {
  connectFunctionsEmulator,
  Functions,
  getFunctions
} from 'firebase/functions';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { firebaseConfig } from './firebase';

interface FirebaseContextProps {
  auth: Auth;
  firestore: Firestore;
  functions: Functions;
  recordEvent: (event: string, params?: any) => void;
  recordNavigation: (path: string, name: string) => void;
}

const FirebaseContext = createContext<FirebaseContextProps>({
  auth: {} as Auth,
  firestore: {} as Firestore,
  functions: {} as Functions,
  recordEvent: () => {},
  recordNavigation: () => {}
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const functions = getFunctions(app);

  const recordEvent = (event: string, params?: any) => {
    logEvent(analytics, event, params);
  };

  const recordNavigation = (path: string, name: string) => {
    logEvent(analytics, 'screen_view', {
      firebase_screen: path,
      firebase_screen_class: name
    });
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      setAnalyticsCollectionEnabled(analytics, false);
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      connectFunctionsEmulator(functions, 'localhost', 5001);
      (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
        import.meta.env.VITE_APPCHECK_DEBUG_TOKEN ?? true;
    }

    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_V3_KEY),
      isTokenAutoRefreshEnabled: true
    });

    onAuthStateChanged(auth, (user: User | null) => {
      setUserId(analytics, user ? user.uid : null);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{ auth, firestore, functions, recordEvent, recordNavigation }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
