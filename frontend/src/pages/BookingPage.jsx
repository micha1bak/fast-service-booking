import { useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { serviceId } = useParams(); // ID wybranej usługi
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [status, setStatus] = useState("");
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          date,
          time,
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
        }),
      });
      if (res.ok) {
        setStatus("success");
        // reset pól
        setDate("");
        setTime("");
        setClientName("");
        setClientEmail("");
        setClientPhone("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="w-full bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">BeautyTime</h1>
        <p className="text-gray-500">Wybierz termin wizyty</p>
      </header>

      <main className="flex flex-col items-center mt-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 w-full space-y-4"
        >
          <div>
            <label className="block text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Godzina</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
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

          {status === "loading" && <p className="text-gray-500 text-sm mt-2">Wysyłanie rezerwacji...</p>}
          {status === "success" && <p className="text-green-600 text-sm mt-2">Rezerwacja zapisana ✅</p>}
          {status === "error" && <p className="text-red-600 text-sm mt-2">Coś poszło nie tak. Spróbuj ponownie.</p>}
        </form>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 BeautyTime – ul. Testowa 10, Warszawa
      </footer>
    </div>
  );
}
