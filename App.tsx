import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import AppLoading from "./components/AppLoading";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { materialTheme } from "./constants";
import Screens from "./navigation/Screens";
export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
