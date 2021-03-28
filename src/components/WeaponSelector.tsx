import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { random } from "underscore";
import {
  APP_FONT,
  DEFAULT_SELECTED_WEAPONS,
  Weapon,
  WEAPON_COLOR_SCHEME,
  WEAPONS,
} from "../constants";
import withAppProperty, { AppProps } from "../AppProperty";
import { Theme, useTheme } from "../ThemeContext";

const styles = StyleSheet.create({
  container: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
    overflow: "hidden",
    borderRadius: 2,
  },
  colorIndicator: {
    width: 20,
    height: 20,
  },
  weaponName: {
    fontSize: 14,
    fontFamily: APP_FONT,
    paddingHorizontal: 4,
  },
});

export type WeaponSelectorItem = {
  color: string;
  name: string;
  selected: boolean;
};

interface WeaponSelectorProps extends AppProps {
  onItemSelected: (items: WeaponSelectorItem[]) => void;
}

export const getDefaultItemList = (): WeaponSelectorItem[] => {
  return WEAPONS.map((item) => ({
    ...item,
    selected: !!DEFAULT_SELECTED_WEAPONS.find((wep) => wep === item.name),
  }));
};

const WeaponSelector = (props: WeaponSelectorProps) => {
  const { theme } = useTheme();

  const weaponTextColorCode = theme === Theme.Light ? 0 : 255;

  const [items, setItems] = useState<WeaponSelectorItem[]>(
    getDefaultItemList()
  );

  useEffect(() => {
    props.onItemSelected(items.filter((value) => value.selected) || []);
  }, []);

  const individualItemView = (item: WeaponSelectorItem) => {
    const onPress = () => {
      setItems((prevState) => {
        const items = prevState.map((value) => ({
          ...value,
          selected: item.name === value.name ? !value.selected : value.selected,
        }));
        props.onItemSelected(items.filter((value) => value.selected) || []);
        return items;
      });
    };

    return (
      <TouchableOpacity key={item.name} onMagicTap={onPress} onPress={onPress}>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: item.selected
                ? "rgba(222,226,230,0.3)"
                : "rgba(222,226,230,0.2)",
              borderColor: item.selected ? item.color : undefined,
              borderWidth: item.selected ? 1 : undefined,
            },
          ]}
        >
          <View
            style={[
              styles.colorIndicator,
              {
                backgroundColor: item.color,
                opacity: item.selected ? 1 : 0.2,
              },
            ]}
          />
          <Text
            style={[
              styles.weaponName,
              {
                color: item.selected
                  ? `rgba(${weaponTextColorCode},${weaponTextColorCode},${weaponTextColorCode},1)`
                  : `rgba(${weaponTextColorCode},${weaponTextColorCode},${weaponTextColorCode},0.35)`,
              },
            ]}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { maxWidth: props.width }]}>
      {items.map((value) => individualItemView(value))}
    </View>
  );
};

export default withAppProperty(WeaponSelector);
