/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1- Calculate number of bookings
  const numBookings = bookings.length;

  //2- Calculate total price
  const sales = confirmedStays.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //3- Calculate number of checkins
  const checkins = confirmedStays.length;

  //4- Calculate occupancy rate
  // number of checkins / number of all available nights
  //if we have 90 days * 8 cabins have benn sold then we have occupancy rate of 100% (num of days * num of cabins)
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        value={numBookings}
        color='blue'
        icon={<HiOutlineBriefcase />}
      />

      <Stat
        title='Sales'
        value={formatCurrency(sales)}
        color='green'
        icon={<HiOutlineBanknotes />}
      />

      <Stat
        title='Check ins'
        value={checkins}
        color='indigo'
        icon={<HiOutlineCalendarDays />}
      />

      <Stat
        title='Occupancy rate'
        value={Math.round(occupation * 100) + "%"}
        color='yellow'
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
