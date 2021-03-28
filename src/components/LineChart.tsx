import React, { useEffect, useState } from "react";
import { scaleLinear, ScaleLinear, scaleTime, ScaleTime } from "d3-scale";
import { range } from "underscore";
import { Animated, Easing, View } from "react-native";
import { line } from "d3-shape";
import Svg, { G, Line, Path, Text as SvgText } from "react-native-svg";
import { APP_FONT, END_DATE, START_DATE, Weapon } from "../constants";
import { WeaponSelectorItem } from "./WeaponSelector";
import withAppProperty, { AppProps } from "../AppProperty";

type StatEntry = {
  date: number;
  value: number;
};

export type WeaponStats = {
  [key in Weapon]: StatEntry[];
};

type ScaleX = ScaleTime<number, number>;
type ScaleY = ScaleLinear<number, number>;

interface LineChartProps extends AppProps {
  data?: WeaponStats;
  selectedWeapons: WeaponSelectorItem[];
}

type LinePath = {
  weapon: WeaponSelectorItem;
  value: string;
};

type AxisLabel = {
  label?: string;
  x: number;
  y: number;
};

const computeScales = (
  chartWidth: number,
  chartHeight: number
): { scaleX: ScaleX; scaleY: ScaleY } => {
  const startDate = START_DATE.unix();
  const endDate = END_DATE.unix();

  const scaleX: ScaleX = scaleTime()
    .domain([startDate, endDate])
    .range([20, chartWidth - 20]);

  const scaleY: ScaleY = scaleLinear().domain([0, 60]).range([chartHeight, 0]);

  return { scaleX, scaleY };
};

const getPathData = (
  data: WeaponStats,
  selectedWeapons: WeaponSelectorItem[],
  scaleX: ScaleX,
  scaleY: ScaleY
): LinePath[] => {
  const pathGenerator = line<StatEntry>()
    .x((d) => scaleX(d.date))
    .y((d) => scaleY(d.value));

  const paths: LinePath[] = [];

  selectedWeapons.forEach((selectedWeapon) => {
    // const sortedData = sortData(data, selectedWeapon.name as Weapon);
    const path = pathGenerator(data[selectedWeapon.name as Weapon]);
    if (path) {
      paths.push({
        weapon: selectedWeapon,
        value: path,
      });
    }
  });

  return paths;
};

const getXAxisLabels = (scaleX: ScaleX): AxisLabel[] => {
  const months = END_DATE.diff(START_DATE, "months");

  return range(months + 1).map((value) => {
    const currDate = START_DATE.clone().add(value, "month");
    return {
      label: currDate.month() === 0 ? currDate.format("YYYY") : undefined,
      x: scaleX(currDate.unix()),
      y: 5,
    };
  });
};

const getYAxisLabels = (scaleY: ScaleY): AxisLabel[] => {
  return [
    {
      label: "10%",
      x: 0,
      y: scaleY(10),
    },
    {
      label: "20%",
      x: 0,
      y: scaleY(20),
    },
    {
      label: "30%",
      x: 0,
      y: scaleY(30),
    },
    {
      label: "40%",
      x: 0,
      y: scaleY(40),
    },
    {
      label: "50%",
      x: 0,
      y: scaleY(50),
    },
  ];
};

const LineChart = (props: LineChartProps) => {
  const [scaleX, setScaleX] = useState<ScaleX>();
  const [scaleY, setScaleY] = useState<ScaleY>();
  const [xAxisLabels, setXAxisLabels] = useState<AxisLabel[]>([]);
  const [yAxisLabels, setYAxisLabels] = useState<AxisLabel[]>([]);
  const [paths, setPaths] = useState<LinePath[]>([]);
  const [chartOpacity] = useState<Animated.Value>(new Animated.Value(0));

  const updateProperties = async () => {
    // Fetch scales.
    const { scaleX, scaleY } = computeScales(props.width, 400);
    setScaleX(() => scaleX);
    setScaleY(() => scaleY);

    // Fetch X and Y labels
    const xAxisLabels = getXAxisLabels(scaleX);
    const yAxisLabels = getYAxisLabels(scaleY);
    setXAxisLabels(xAxisLabels);
    setYAxisLabels(yAxisLabels);

    // Fetch line paths for selected weapons
    if (props.data) {
      const paths = getPathData(
        props.data,
        props.selectedWeapons,
        scaleX,
        scaleY
      );
      setPaths(paths);
    }

    // Animate the chart opacity to 1.
    Animated.timing(chartOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    updateProperties()
      .then(() => {
        console.log("Chart properties updated");
      })
      .catch((error) => {
        console.error("Error in updating chart properties", error);
      });
  }, [props.data, props.selectedWeapons]);

  const xAxis = (
    <Svg width={props.width} height="20">
      <G>
        {xAxisLabels.map((value, index) => (
          <SvgText
            key={index.toString()}
            fill={value.label ? "#000000" : "rgba(0,0,0,0.5)"}
            fontSize={value.label ? "10" : "6"}
            fontWeight="bold"
            x={value.x}
            y={value.y}
            textAnchor="middle"
            fontFamily={APP_FONT}
          >
            {"."}
          </SvgText>
        ))}
        {xAxisLabels.map((value, index) => (
          <SvgText
            key={index.toString()}
            fill="black"
            fontSize="8"
            fontWeight="bold"
            x={value.x}
            y={value.y + 10}
            textAnchor="middle"
            fontFamily={APP_FONT}
          >
            {value.label}
          </SvgText>
        ))}
      </G>
    </Svg>
  );

  const yAxis = (
    <G>
      {yAxisLabels.map((value, index) => (
        <G key={value.label}>
          <SvgText
            key={index.toString()}
            fill={"rgba(0,0,0,0.3)"}
            fontSize="8"
            fontWeight="bold"
            x={value.x + 20}
            y={value.y - 5}
            textAnchor="middle"
            fontFamily={APP_FONT}
          >
            {value.label}
          </SvgText>
          <Line
            x1={scaleX !== undefined ? scaleX?.range()[0] - 10 : 0}
            y1={value.y}
            x2={scaleX?.range()[1]}
            y2={value.y}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
            strokeLinecap={"round"}
          />
        </G>
      ))}
    </G>
  );

  return (
    <Animated.View style={{ opacity: chartOpacity }}>
      <Svg width={props.width} height="400">
        {paths.map((path) => (
          <Path
            key={path.weapon.name}
            d={path.value}
            fill="none"
            stroke={path.weapon.color}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {yAxis}
      </Svg>
      {xAxis}
    </Animated.View>
  );
};

export default withAppProperty(LineChart);
