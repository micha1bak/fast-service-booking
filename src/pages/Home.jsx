import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    service_id: "",
    date: "",
    time: "",
    client_name: "",
    client_email: "",
    client_phone: "",
  });

  const [status, setStatus] = useState("");
  const BACKEND_URL = "http://localhost:5000"; // zmień po deployu

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Nagłówek */}
      <header className="w-full bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">BeautyTime</h1>
        <p className="text-gray-500">Umów wizytę online w kilka kliknięć</p>
      </header>

      <main className="flex flex-col items-center mt-10 w-full max-w-md">
        {/* Sekcja hero */}
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
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 BeautyTime – ul. Testowa 10, Warszawa
      </footer>
    </div>
  );
}
