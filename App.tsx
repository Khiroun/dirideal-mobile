import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AppLoading from "./components/AppLoading";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { materialTheme } from "./constants";
import Screens from "./navigation/Screens";
import * as GoogleAuthentication from "expo-google-app-auth";
import * as Linking from "expo-linking";
import { GoogleAuthProvider, signInWithCredential } from "@firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignInWithGoogle = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        setResult(JSON.stringify({ res }));
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const signInWithGoogle = () => {
    console.log("Google");
    return GoogleAuthentication.logInAsync({
      androidStandaloneAppClientId:
        "1097253873155-v6hq86846ka4dulu2sb59lo0rrbaaaj2.apps.googleusercontent.com",
      iosClientId:
        "369977814948-guvtfh4url0neohbrm3sk6mpb5i0m8s5.apps.googleusercontent.com",
      androidClientId:
        "1097253873155-v6hq86846ka4dulu2sb59lo0rrbaaaj2.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      //   redirectUrl: `${Linking.makeUrl()}:/oauthredirect`,
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
  if (error || result || loading) {
    return (
      <ScrollView>
        <Text>{error}</Text>
        <Text>{result}</Text>
        <Text>{JSON.stringify({ loading })}</Text>
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignInWithGoogle}>
        <Text>Sign in with google</Text>
      </TouchableOpacity>
    </View>
  );
}

/*export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const _handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };
  if (isLoadingComplete) {
    return <AppLoading handleFinishLoading={_handleFinishLoading} />;
  } else {
    return (
      <NavigationContainer>
        <GalioProvider theme={materialTheme}>
          <Block flex>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <Screens />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
