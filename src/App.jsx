/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

//this query client that sets up the cashe behind the scenes
const querClient = new QueryClient({
  defaultOptions: {
    //this is how long the data in the cashe stays fresh until they re-fetch again
    // stale time is amount of time data in the cashe stay fresh still valid until they re-fetch again.
    // staleTime: 60 * 1000,
    // now this means data will autimatically become stale
    //this means that when user change data it will automatically become stale and change it
    staleTime: 0,
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={querClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* App Layput has these children inside it expcept login and page not found as they are new pages */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* <Route index element={<Dashboard />} /> */}
              {/* same as the above but in a cleaner way */}
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='cabins' element={<Cabins />} />
              <Route path='users' element={<Users />} />
              <Route path='settings' element={<Settings />} />
              <Route path='account' element={<Account />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </BrowserRouter>
        {/* gutter is the space between toasts */}
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              padding: "16px 24px",
              fontSize: "16px",
              maxWidth: "500px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
