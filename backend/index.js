const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

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

// Start serwera
app.listen(port, () => {
  console.log(`Backend działa na http://localhost:${port}`);
});
