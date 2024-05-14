/* eslint-disable no-unused-vars */
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

//Get All bookings from supabase
// we have the forgien key of guests id and cabins id so to get everything inside them do this "select("*, cabins(*), guests(*)")"
//then we can get from cabins table the cabin name or guest email as we got everything inside them
//OR WE CAN SELECT ONLY THE FIELDS WE NEED > To reduce the amount of unnecessary data we select only the fields we need
export async function getBookings({ filter, sortBy, page }) {
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select(
  //     "*, cabins(name), guests(fullName , email)"
  //   );

  // //eq stands for equal "Field name", "value of field"
  // //gte stands for greather than
  // //lte stands for less than
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select(
  //     "id, created_at, totalPrice, status, startDate,endDate, numGuests, numNights, cabins(name), guests(fullName , email)"
  //   )
  //   .eq("status", "unconfirmed")
  //   .gte("totalPrice", 5000);
  //eq stands for equal "Field name", "value of field"
  //gte stands for greather than
  //lte stands for less than

  //count: "exact" returns the number of rows in the table without taking into account the filters
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, totalPrice, status, startDate,endDate, numGuests, numNights, cabins(name), guests(fullName , email)",
      { count: "exact" }
    );

  //Filter:
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  //Sort:
  //ascending is true by default in supabase
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  //Pagination:
  //rannge returns the rows in the specified range (from 0 to 10)
  if (page) {
    //from is equal to current page * page size
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
//date:ISOString > What supabase expect
//end is true because we are using that if (options?.end) if true   today.setUTCHours(23, 59, 59, 999) else today.setUTCHours(0, 0, 0, 0); so end makes sure that the date is at 23:59:59:999 or 00:00:00:000, fixing the date to the current day so it doesn't change every millisecond
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  /*select("*, guests(fullName, nationality, countryFlag)"):
    This method is used to specify the columns to retrieve. The * denotes that all columns from the bookings table should be retrieved.
    Additionally, it performs a nested selection on a related table guests. The columns retrieved from guests are fullName, nationality, and countryFlag. This is often used when you have a foreign key in one table that relates to another table, allowing you to pull in related data in a single query.

    or(...):
    This method adds a filter condition that uses logical OR to combine different filtering criteria.
    Inside the .or(), there are two conditions combined:
    and(status.eq.unconfirmed,startDate.eq.${getToday()}): This checks for bookings that are unconfirmed and whose startDate is today. The getToday() is a function assumed to return today's date formatted correctly for the query.
    and(status.eq.checked-in,endDate.eq.${getToday()}): This checks for bookings that have a status of checked-in and whose endDate is today.
    These conditions ensure that the query fetches bookings that are either unconfirmed starting today or checked-in ending today.
    
    order("created_at"): This orders the results based on the created_at column. Without specifying asc (ascending) or desc (descending), it defaults to ascending order.*/
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  //ready to arrive or ready to leave
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
