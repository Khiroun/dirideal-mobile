import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import * as GoogleAuthentication from "expo-google-app-auth";
import * as Linking from "expo-linking";

const firebaseConfig = {
  apiKey: "AIzaSyDOeHNqEkFHB7wYv3r-mc5gO7oIVxtKT5k",
  authDomain: "dirideal-ca7bd.firebaseapp.com",
  projectId: "dirideal-ca7bd",
  storageBucket: "dirideal-ca7bd.appspot.com",
  messagingSenderId: "1097253873155",
  appId: "1:1097253873155:web:300e7435dd78767ccd1036",
  measurementId: "G-S3HWH2X0Q9",
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);

export const signInWithGoogle = () => {
  console.log("Google");
  return GoogleAuthentication.logInAsync({
    androidStandaloneAppClientId:
      "1097253873155-v6hq86846ka4dulu2sb59lo0rrbaaaj2.apps.googleusercontent.com",
    iosClientId:
      "369977814948-guvtfh4url0neohbrm3sk6mpb5i0m8s5.apps.googleusercontent.com",
    androidClientId:
      "1097253873155-v6hq86846ka4dulu2sb59lo0rrbaaaj2.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUrl: `${Linking.makeUrl()}:/oauthredirect`,
  }).then((logInResult) => {
    console.log({ logInResult });
    if (logInResult.type === "success") {
      const { idToken, accessToken } = logInResult;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      return signInWithCredential(auth, credential);
      // Successful sign in is handled by firebase.auth().onAuthStateChanged
    }
    return Promise.reject(); // Or handle user cancelation separatedly
  });
};
