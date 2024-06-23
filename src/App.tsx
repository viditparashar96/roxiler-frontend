// import { CalendarDateRangePicker } from "@/components/date-range-picker";

import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./_root/Layout";
import Dashboard from "./_root/pages/Dashboard";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}
