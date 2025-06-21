import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import GlobalStyle from "./GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import User from "./pages/User";
import Setting from "./pages/Setting";
import Booking from "./pages/Booking";
import Cabin from "./pages/Cabin";
import Account from "./pages/Account";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="cabins" element={<Cabin />} />
          <Route path="account" element={<Account />} />
          <Route path="users" element={<User />} />
          <Route path="login" element={<Login />} />
          <Route path="settings" element={<Setting />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
