import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDEn6jkFcOq9x-eRhFO4l_o0BnG_A8FOZk',
  authDomain: 'edo-ems.firebaseapp.com',
  projectId: 'edo-ems',
  storageBucket: 'edo-ems.appspot.com',
  messagingSenderId: '340775384417',
  appId: '1:340775384417:web:3b25c8930c144ba5cdc120',
  measurementId: 'G-LCJGRFEBR0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let analytics: unknown;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export async function uploadDocument(fileName: string, bytes: ArrayBuffer) {
  const upload = await uploadBytes(
    ref(getStorage(), `institute_materials/${fileName}`),
    bytes
  );
  return upload.ref.fullPath;
}

export async function getURL(path: string) {
  return await getDownloadURL(ref(getStorage(), path));
}
