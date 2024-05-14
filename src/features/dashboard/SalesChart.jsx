/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "./../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

//bookings would be an array of booking objects, and numDays indicates the number of days to display data for.
function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  //eachDayOfInterval({start, end}): This function from the date-fns library generates an array of dates for each day in the specified interval. The interval is defined from start to end.

  //subDays(new Date(), numDays - 1): Here, subDays is a function that subtracts a certain number of days from a given date. new Date() creates a new date object representing the current date and time. numDays - 1 calculates how many days to go back from the current day to start the interval. The subtraction of 1 is used to include the current day in the interval count.

  //For example, if numDays is 7, the start date would be 6 days before today (inclusive), creating a 7-day range.

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  //allDates.map((date) => {...}): This line maps over the allDates array, creating a new array where each element is an object containing formatted date labels and aggregated sales data.

  //format(date, 'MMM dd'): This function from date-fns formats each date to a more readable form, such as "Jan 09", "Jan 10", etc.

  //bookings.filter(...): This filters the bookings array to include only those bookings that occurred on the same day as the current date in the iteration. It uses isSameDay(date, new Date(booking.created_at)) to compare the current date in the loop to the created_at date of each booking. booking.created_at must be converted to a Date object as it might be stored as a string.

  //reduce((acc, curr) => acc + curr.totalPrice, 0): This reduces the filtered array to a single sum value. It accumulates (acc) the totalPrice of each booking that matches the current date. The initial value for the accumulator is set to 0 to handle cases where there might be no matching bookings.

  //reduce((acc, curr) => acc + curr.extrasPrice, 0): Similarly, this line calculates the sum of extrasPrice for the bookings on the same date. It aggregates the prices of any extra services or items purchased.

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  // console.log(data);

  //stroke: The color used for the line part of an area chart. "line itself"
  //fill: The color used for the area below the line in the area chart. "area itself"
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  /*
  format function from the date-fns library on the first date in the allDates array.
  allDates.at(0): Retrieves the first element of the allDates array, representing the start date of the interval.
  "MMM dd yyy": This string is a date format specifier telling the format function how to format the date. It results in a date format like "Jan 01 2024".

  {format(allDates.at(-1), "MMM dd yyy")}: Similar to the previous format function call, but this time using allDates.at(-1). The .at(-1) method retrieves the last element from the array, which is the end date of the interval. The date is formatted in the same way as the start date.

  <ResponsiveContainer>: This component from Recharts makes the chart responsive to its container's size.
    <AreaChart data={data}>: The main chart component that renders the area chart with the data processed earlier.
    <XAxis> and <YAxis>:
    dataKey='label': Specifies the key from data items which should be used as the label for the X-axis.
    tick={{ fill: colors.text }}: Sets the color of the text (ticks) on the axes.
    tickLine={{ stroke: colors.text }}: Sets the color of the tick lines on the axes.
    <CartesianGrid strokeDasharray='4' />: Adds a grid to the chart area, making the data easier to read, with dashed lines (strokeDasharray controls the pattern).
    <Tooltip contentStyle={{ backgroundColor: colors.background }}>: Customizes the tooltip appearance that shows data details when hovering over areas in the chart.
    <Area>:
    dataKey: Specifies which key from the data objects to display in this area.
    type='monotone': Defines the interpolation type of the line, making it smooth.
    stroke and fill: Set the line and area colors respectively.
    strokeWidth={2}: Sets the thickness of the line.
    name: Label for the legend (if any).
    unit='$': Specifies the unit of the values (here, dollars).*/

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates.at(0), "MMM dd yyy")} &ndash;
        {format(allDates.at(-1), "MMM dd yyy")}
      </Heading>

      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray='4' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name='Total Sales'
            unit='$'
          />
          <Area
            dataKey='extrasSales'
            type='monotone'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name='Extras Sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
