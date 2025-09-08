import { useState, useEffect } from "react";

export default function AdminLogin() {
  const [adminPassword, setAdminPassword] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [bookings, setBookings] = useState([]);

  const BACKEND_URL = "http://localhost:5000"; // Twój backend

  const loginAdmin = () => {
    if (adminPassword === "admin123") {
      setAdminMode(true);
      fetchBookings();
    } else {
      alert("Błędne hasło");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/bookings/${id}`, { method: "DELETE" });
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (adminMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Panel Admina</h1>
        {bookings.length === 0 ? (
          <p>Brak rezerwacji.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Usługa</th>
                <th className="border p-2">Data</th>
                <th className="border p-2">Godzina</th>
                <th className="border p-2">Klient</th>
                <th className="border p-2">E-mail</th>
                <th className="border p-2">Telefon</th>
                <th className="border p-2">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="text-center">
                  <td className="border p-2">{b.id}</td>
                  <td className="border p-2">{b.service_id}</td>
                  <td className="border p-2">{b.date}</td>
                  <td className="border p-2">{b.time}</td>
                  <td className="border p-2">{b.client_name}</td>
                  <td className="border p-2">{b.client_email}</td>
                  <td className="border p-2">{b.client_phone}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => setAdminMode(false)}
        >
          Wyloguj
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Logowanie Admina</h2>
        <input
          type="password"
          placeholder="Hasło admina"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />
        <button
          onClick={loginAdmin}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}
