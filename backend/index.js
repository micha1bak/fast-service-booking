const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Inicjalizacja bazy SQLite
const db = new sqlite3.Database("./db/bookings.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Połączono z bazą SQLite");
});

// Tworzenie tabeli rezerwacji (jeśli nie istnieje)
db.run(`
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_id INTEGER,
  date TEXT,
  time TEXT,
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,
  status TEXT DEFAULT 'nowa'
)
`);

// Tworzenie tabeli usług (jeśli nie istnieje)
db.run(`
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL
)
`, (err) => {
  if (err) return console.error(err.message);

  // Dodanie przykładowych usług tylko jeśli tabela jest pusta
  db.get("SELECT COUNT(*) AS count FROM services", (err, row) => {
    if (err) return console.error(err.message);
    if (row.count === 0) {
      const insert = "INSERT INTO services (name, price) VALUES (?, ?)";
      db.run(insert, ["Strzyżenie klasyczne", 50]);
      db.run(insert, ["Farbowanie włosów", 120]);
      db.run(insert, ["Manicure", 80]);
      console.log("Dodano przykładowe usługi do tabeli services");
    }
  });
});

// Endpoint: GET /services – pobranie wszystkich usług
app.get("/services", (req, res) => {
  console.log("get");
  db.all("SELECT * FROM services", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Błąd serwera" });
    }
    res.json(rows);
  });
});

// Endpoint: GET /bookings (lista wszystkich rezerwacji)
app.get("/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Endpoint: POST /bookings (nowa rezerwacja)
app.post("/bookings", (req, res) => {
  const { service_id, date, time, client_name, client_email, client_phone } = req.body;

  if (!service_id || !date || !time || !client_name || !client_email || !client_phone) {
    return res.status(400).json({ error: "Wszystkie pola są wymagane" });
  }

  const stmt = `INSERT INTO bookings (service_id, date, time, client_name, client_email, client_phone) 
                VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(stmt, [service_id, date, time, client_name, client_email, client_phone], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: "Rezerwacja zapisana" });
  });
});

// Endpoint: DELETE /bookings/:id (usuń rezerwację)
app.delete("/bookings/:id", (req, res) => {
  const { id } = req.params;

  const stmt = `DELETE FROM bookings WHERE id = ?`;
  db.run(stmt, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    
    if (this.changes === 0) {
      // Nie znaleziono rezerwacji o podanym ID
      return res.status(404).json({ error: "Nie znaleziono rezerwacji" });
    }

    res.json({ message: "Rezerwacja usunięta", id });
  });
});


// Start serwera
app.listen(port, () => {
  console.log(`Backend działa na http://localhost:${port}`);
});
