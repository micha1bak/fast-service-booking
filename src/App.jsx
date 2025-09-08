import { useState, useEffect } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    service_id: "",
    date: "",
    time: "",
    client_name: "",
    client_email: "",
    client_phone: "",
  });
  const [status, setStatus] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [bookings, setBookings] = useState([]);

  const BACKEND_URL = "http://localhost:5000"; // zmień na swój backend po deployu

  // --- Funkcje formularza ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({
          service_id: "",
          date: "",
          time: "",
          client_name: "",
          client_email: "",
          client_phone: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // --- Funkcje admina ---
  const loginAdmin = () => {
    if (adminPassword === "admin123") { // proste hasło demo
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

  // --- JSX ---
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">BeautyTime</h1>
        <p className="text-gray-500">Umów wizytę online w kilka kliknięć</p>
      </header>

      <main className="flex flex-col items-center mt-10 w-full max-w-md">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Zarezerwuj swoją wizytę</h2>
          <p className="text-gray-600">
            Wybierz usługę, termin i podaj dane – to zajmie mniej niż minutę.
          </p>
        </section>

        {/* Formularz rezerwacji */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 w-full space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Usługa</label>
            <select
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">-- Wybierz usługę --</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Strzyżenie">Strzyżenie</option>
              <option value="Masaż">Masaż</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Godzina</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="">-- Wybierz godzinę --</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Imię</label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="client_email"
              value={formData.client_email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              name="client_phone"
              value={formData.client_phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Zarezerwuj wizytę
          </button>

          {status === "loading" && (
            <p className="text-gray-500 text-sm mt-2">Wysyłanie rezerwacji...</p>
          )}
          {status === "success" && (
            <p className="text-green-600 text-sm mt-2">Rezerwacja zapisana ✅</p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">
              Coś poszło nie tak. Spróbuj ponownie.
            </p>
          )}
        </form>

        {/* Logowanie admina */}
        <div className="mt-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">Panel Admina</h3>
          <input
            type="password"
            placeholder="Hasło admina"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full border rounded-lg p-2 mb-2"
          />
          <button
            onClick={loginAdmin}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Zaloguj
          </button>
        </div>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 BeautyTime – ul. Testowa 10, Warszawa
      </footer>
    </div>
  );
}
