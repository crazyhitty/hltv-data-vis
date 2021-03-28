import React from "react";
import { Dimensions } from "react-native";
import { isMobile } from "react-device-detect";

export interface AppProps {
  width: number;
}

const withAppProperty = <T extends AppProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithTheme = (props: Omit<T, keyof AppProps>) => {
    const appProps: AppProps = {
      width: isMobile ? Dimensions.get("window").width - 20 : 768,
    };

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...appProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withAppProperty(${displayName})`;

  return ComponentWithTheme;
};

export default withAppProperty;
