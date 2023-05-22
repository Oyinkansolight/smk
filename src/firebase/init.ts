import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDrugHovIIoO4QSOJa3XHs7KMFbdR-dlSw',
  authDomain: 'smk-project-d0ff1.firebaseapp.com',
  projectId: 'smk-project-d0ff1',
  storageBucket: 'smk-project-d0ff1.appspot.com',
  messagingSenderId: '35883128324',
  appId: '1:35883128324:web:1fd396284152ccc5914751',
  measurementId: 'G-3WPGHLYQ6P',
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
