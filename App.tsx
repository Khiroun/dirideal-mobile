import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppLoading from "./components/AppLoading";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { materialTheme } from "./constants";
import Screens from "./navigation/Screens";
import { signInWithGoogle } from "./firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function App() {
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        setResult(JSON.stringify({ res }));
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      });
  };
  if (error || result) {
    return (
      <ScrollView>
        <Text>{error}</Text>
        <Text>{result}</Text>
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
