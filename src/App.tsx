import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WepStats from "./weapon_stats_monthly_avg.json";
import LineChart  from "./components/LineChart";
import { APP_FONT } from "./constants";
import WeaponSelector, {
  WeaponSelectorItem,
} from "./components/WeaponSelector";
import withAppProperty, { AppProps } from "./AppProperty";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Theme, ThemeContext } from "./ThemeContext";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: APP_FONT,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: APP_FONT,
  },
  link: {
    fontSize: 12,
    fontFamily: APP_FONT,
    color: "#5390d9",
  },
  lastUpdatedText: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: APP_FONT,
  },
  chartContainer: {
    marginVertical: 10,
    paddingBottom: 10,
    backgroundColor: "rgba(222,226,230,0.3)",
    borderRadius: 4,
  },
  weaponSelectorContainer: {
    marginVertical: 10,
  },
  themeSwitcherContainer: {
    alignItems: "center",
  },
  footerTextContainer: {
    flexDirection: "row",
  },
});

const App = (props: AppProps) => {
  const [theme, setTheme] = useState(Theme.Light);
  const [selectedWeapons, setSelectedWeapons] = useState<WeaponSelectorItem[]>(
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View
        style={[
          styles.root,
          { backgroundColor: theme === Theme.Light ? "white" : "black" },
        ]}
      >
        <View style={{ minWidth: props.width }}>
          <Text
            style={[
              styles.title,
              { color: theme === Theme.Light ? "black" : "white" },
            ]}
          >
            {"CSGO Weapon Usage in Esports Events"}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: theme === Theme.Light ? "black" : "white" },
            ]}
          >{`Monthly data from Aug 2012 - March 2021`}</Text>
          <View style={styles.chartContainer}>
            <LineChart data={WepStats} selectedWeapons={selectedWeapons} />
          </View>
          <View style={styles.weaponSelectorContainer}>
            <WeaponSelector
              onItemSelected={(items) => setSelectedWeapons(items)}
            />
          </View>
          <View style={styles.footerTextContainer}>
            <Text
              style={[
                styles.subtitle,
                { color: theme === Theme.Light ? "black" : "white" },
              ]}
            >
              {`Data scraped from `}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.hltv.org/stats");
              }}
            >
              <Text style={styles.link}>{"hltv.org"}</Text>
            </TouchableOpacity>
          </View>
          {/*Theme switcher currently disabled*/}
          {/*<View style={styles.themeSwitcherContainer}>*/}
          {/*  <ThemeSwitcher/>*/}
          {/*</View>*/}
        </View>
      </View>
    </ThemeContext.Provider>
  );
};

export default withAppProperty(App);
