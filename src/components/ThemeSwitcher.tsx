import React from "react";
import withAppProperty, { AppProps } from "../AppProperty";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Theme, useTheme } from "../ThemeContext";
import LightThemeIcon from "./icons/LightThemeIcon";
import DarkThemeIcon from "./icons/DarkThemeIcon";

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
});

interface ThemeSwitcherProps extends AppProps {}

const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  const onPress = () =>
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);

  return (
    <TouchableOpacity onMagicTap={onPress} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          { borderColor: theme === Theme.Light ? "black" : "white" },
        ]}
      >
        {theme === Theme.Light ? <DarkThemeIcon /> : <LightThemeIcon />}
      </View>
    </TouchableOpacity>
  );
};

export default withAppProperty(ThemeSwitcher);
