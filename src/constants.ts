import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const START_DATE = dayjs("01-01-2012", "DD-MM-YYYY");
export const END_DATE = dayjs("01-01-2022", "DD-MM-YYYY");

export const APP_FONT = "Work Sans";

export const WEAPON_COLOR_SCHEME = [
  "#264653",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#e76f51",
];

export enum Weapon {
  P2000 = "hkp2000",
  USPS = "usp_silencer",
  M4A1_S = "m4a1_silencer",
  MP7 = "mp7",
  M4A4 = "m4a1",
  MP9 = "mp9",
  DEAGLE = "deagle",
  AUG = "aug",
  AK47 = "ak47",
  CZ = "cz75a",
  FIVE_SEVEN = "fiveseven",
  GLOCK = "glock",
  P90 = "p90",
  GALIL = "galilar",
  P250 = "p250",
  AWP = "awp",
  TEC9 = "tec9",
  FAMAS = "famas",
  UMP = "ump45",
  SG556 = "sg556",
  GRENADE = "hegrenade",
  MAC10 = "mac10",
  OTHER = "other",
}

export const WEAPONS = [
  { name: Weapon.AK47, color: "#F94144" },
  { name: Weapon.M4A4, color: "#F3722C" },
  { name: Weapon.M4A1_S, color: "#ef476f" },
  { name: Weapon.FAMAS, color: "#8d99ae" },
  { name: Weapon.GALIL, color: "#F9C74F" },
  { name: Weapon.SG556, color: "#a7b871" },
  { name: Weapon.AUG, color: "#797d62" },
  { name: Weapon.MP9, color: "#43AA8B" },
  { name: Weapon.AWP, color: "#4D908E" },
  { name: Weapon.DEAGLE, color: "#577590" },
  { name: Weapon.USPS, color: "#277DA1" },
  { name: Weapon.GLOCK, color: "#6c584c" },
  { name: Weapon.OTHER, color: "#020100" },
];

export const DEFAULT_SELECTED_WEAPONS = [Weapon.AK47];
