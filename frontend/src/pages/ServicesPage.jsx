import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Fetch usług z backendu
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/services`);
        if (!res.ok) throw new Error("Nie udało się pobrać usług");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Ładowanie usług...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Błąd: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">BeautyTime</h1>
        <p className="text-gray-500">Umów wizytę online w kilka kliknięć</p>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center mt-10 w-full max-w-md">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Wybierz usługę</h2>
          <p className="text-gray-600">
            Kliknij „Umów”, aby przejść do wyboru terminu wizyty.
          </p>
        </section>

        {/* Lista usług */}
        <div className="grid grid-cols-1 gap-4 w-full">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center bg-white shadow-md rounded-xl p-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-500">{service.price} zł</p>
              </div>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={() => navigate(`/rezerwacja/${service.id}`)}
              >
                Umów
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 BeautyTime – ul. Testowa 10, Warszawa
      </footer>
    </div>
  );
}
