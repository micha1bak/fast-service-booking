import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import CustomCalendar from "../components/CustomCalendar";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate(); // ← inicjalizuj hook
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [status, setStatus] = useState("");

  // --- Fetch dostępnych godzin z backendu po zmianie daty ---
  useEffect(() => {
    if (!selectedDate) return;

    const fetchTimes = async () => {
      try {
        const dateStr = selectedDate.toISOString().split("T")[0]; // format YYYY-MM-DD
        const res = await fetch(`${BACKEND_URL}/available-times?serviceId=${serviceId}&date=${dateStr}`);
        if (!res.ok) throw new Error("Nie udało się pobrać godzin");
        const data = await res.json();
        setAvailableTimes(data);
        setSelectedTime(""); // reset wybranej godziny
      } catch (err) {
        console.error(err);
        setAvailableTimes([]);
      }
    };

    fetchTimes();
  }, [selectedDate, serviceId]);

  // --- Wysyłanie rezerwacji ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Wybierz dzień i godzinę!");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch(`${BACKEND_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          date: selectedDate.toISOString().split("T")[0],
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
        setSelectedDate(null);
        setSelectedTime("");
        setAvailableTimes([]);
        setTimeout(() => {
          navigate("/thank-you"); // ← przekierowanie po 1 sek
        }, 1000);
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

        {/* 1️⃣ Inline kalendarz */}
        <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
        />

        {/*Kafelki godzin */}
        {selectedDate && availableTimes.length > 0 && (
          <div className="w-full grid grid-cols-3 gap-4">
            {[...new Set(availableTimes)].map((time) => (
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
