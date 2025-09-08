import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero */}
      <header className="w-full bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">BeautyTime</h1>
        <p className="text-gray-500">Umów wizytę online w kilka kliknięć</p>
      </header>

      <main className="flex flex-col items-center mt-10 w-full max-w-md">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Zarezerwuj swoją wizytę</h2>
          <p className="text-gray-600">
            Wybierz usługę, termin i podaj dane – to zajmie mniej niż minutę.
          </p>
        </section>

        {/* Formularz */}
        <form className="bg-white shadow-md rounded-2xl p-6 w-full space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Usługa</label>
            <select className="w-full border rounded-lg p-2">
              <option>Manicure</option>
              <option>Pedicure</option>
              <option>Strzyżenie</option>
              <option>Masaż</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Data</label>
            <input type="date" className="w-full border rounded-lg p-2" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Godzina</label>
            <select className="w-full border rounded-lg p-2">
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Imię</label>
            <input type="text" className="w-full border rounded-lg p-2" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">E-mail</label>
            <input type="email" className="w-full border rounded-lg p-2" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Telefon</label>
            <input type="tel" className="w-full border rounded-lg p-2" />
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
            Zarezerwuj wizytę
          </button>
        </form>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 BeautyTime – ul. Testowa 10, Warszawa
      </footer>
    </div>
    </>
  )
}

export default App
