import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDqGPS5zqO3_VistA0HQENeUxCXv-Vd_Ng",
  authDomain: "es-ems.firebaseapp.com",
  projectId: "es-ems",
  storageBucket: "es-ems.appspot.com",
  messagingSenderId: "1021261041575",
  appId: "1:1021261041575:web:b7739b53baa9ead8f53082",
  measurementId: "G-EVXKXMBLP2"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging);
    return token;
  } catch (err) {
    console.error("Failed to get Firebase token", err);
  }
};
