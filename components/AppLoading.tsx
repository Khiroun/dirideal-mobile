import React from "react";
import ExpoAppLoading from "expo-app-loading";
import { Image } from "react-native";
import { Asset } from "expo-asset";

import { Images } from "../constants";

const assetImages = [
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
  Images.Products.Auto,
  Images.Products.Motocycle,
  Images.Products.Watches,
  Images.Products.Makeup,
  Images.Products.Accessories,
  Images.Products.Fragrance,
  Images.Products.BMW,
  Images.Products.Mustang,
  Images.Products["Harley-Davidson"],
];

// cache product images
// products.map(product => assetImages.push(product.image));

// cache categories images
// Object.keys(categories).map(key => {
//   categories[key].map(category => assetImages.push(category.image));
// });

function cacheImages(images: string[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

type Props = {
  handleFinishLoading: () => void;
};

const AppLoading: React.FC<Props> = ({ handleFinishLoading }) => {
  const _loadResourcesAsync = async () => {
    const promises: Promise<any>[] = [...cacheImages(assetImages)];
    return Promise.all(promises);
  };
  const _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  return (
    <ExpoAppLoading
      startAsync={_loadResourcesAsync}
      onError={_handleLoadingError}
      onFinish={handleFinishLoading}
    />
  );
};

export default AppLoading;
