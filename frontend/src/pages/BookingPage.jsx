import { useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { serviceId } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [status, setStatus] = useState("");
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  // --- Funkcja do wyboru daty i ustawienia dostępnych godzin (przykład) ---
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Tutaj możesz fetchować dostępne godziny z backendu
    setAvailableTimes(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]); // przykładowe godziny
    setSelectedTime(""); // reset wybranej godziny po zmianie dnia
  };

  // --- Funkcja wysyłania rezerwacji ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          date: selectedDate,
          time: selectedTime,
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setSelectedDate("");
        setSelectedTime("");
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

      <main className="flex flex-col items-center mt-10 w-full max-w-md space-y-6">
        {/* 1️⃣ Kalendarz */}
        <div className="w-full bg-white shadow-md rounded-xl p-4">
          <label className="block text-gray-700 mb-2">Wybierz dzień</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* 2️⃣ Dostępne godziny */}
        {selectedDate && (
          <div className="w-full grid grid-cols-3 gap-4">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-xl border ${
                  selectedTime === time
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        )}

        {/* 3️⃣ Formularz danych klienta */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-6 w-full space-y-4"
        >
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
