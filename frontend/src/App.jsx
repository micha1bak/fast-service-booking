import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import AdminLogin from "./pages/AdminLogin";
import BookingPage from "./pages/BookingPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/rezerwacja/:serviceId" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}
