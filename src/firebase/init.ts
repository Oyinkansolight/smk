import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
  uploadBytes,
} from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDEn6jkFcOq9x-eRhFO4l_o0BnG_A8FOZk',
//   authDomain: 'edo-ems.firebaseapp.com',
//   projectId: 'edo-ems',
//   storageBucket: 'edo-ems.appspot.com',
//   messagingSenderId: '340775384417',
//   appId: '1:340775384417:web:3b25c8930c144ba5cdc120',
//   measurementId: 'G-LCJGRFEBR0',
// };
const firebaseConfigNew = {
  apiKey: 'AIzaSyDqGPS5zqO3_VistA0HQENeUxCXv-Vd_Ng',
  authDomain: 'es-ems.firebaseapp.com',
  projectId: 'es-ems',
  storageBucket: 'es-ems.appspot.com',
  messagingSenderId: '1021261041575',
  appId: '1:1021261041575:web:b7739b53baa9ead8f53082',
  measurementId: 'G-EVXKXMBLP2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfigNew);
export let analytics: unknown;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export async function uploadDocument(
  fileName: string,
  bytes: ArrayBuffer,
  env: string
) {
  const upload = await uploadBytes(
    ref(getStorage(), `${env}/institute_materials/${fileName}`),
    bytes
  );
  return upload.ref.fullPath;
}

export async function getURL(path: string) {
  return await getDownloadURL(ref(getStorage(), path));
}

export async function updateDocumentMetadata(path: string, metadata: any) {
  return await updateMetadata(ref(getStorage(), path), metadata);
}
