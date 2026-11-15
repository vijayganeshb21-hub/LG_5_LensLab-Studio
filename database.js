
// ============================================
// LENSLAB STUDIO - DATABASE CONFIGURATION
// ============================================

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// DATABASE CONNECTION
const dbPromise = open({
  filename: "./lenslab.db",
  driver: sqlite3.Database
});

// INITIALIZE DATABASE
async function initializeDatabase() {
  const db = await dbPromise;

  // ENABLE FOREIGN KEYS
  await db.exec("PRAGMA foreign_keys = ON");

  // CREATE DATABASE TABLES
  await db.exec(`
    CREATE TABLE IF NOT EXISTS photographers (
      photographer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cameras (
      camera_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      kind TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rentals (
      rental_id INTEGER PRIMARY KEY AUTOINCREMENT,
      photographer_id INTEGER NOT NULL,
      camera_id INTEGER NOT NULL,
      rental_date TEXT NOT NULL,
      return_date TEXT,
      returned INTEGER DEFAULT 0,
      FOREIGN KEY (photographer_id)
        REFERENCES photographers(photographer_id),
      FOREIGN KEY (camera_id)
        REFERENCES cameras(camera_id),
      CHECK (returned IN (0, 1))
    );

    CREATE UNIQUE INDEX IF NOT EXISTS unique_camera_name
    ON cameras(name COLLATE NOCASE);
  `);

  // ==========================================
  // INSERT 10 PHOTOGRAPHERS
  // ==========================================

  await db.run(`
    INSERT OR IGNORE INTO photographers
    (photographer_id, name, phone)
    VALUES
    (1, 'Rahul Sharma', '9876543210'),
    (2, 'Arjun Kumar', '9876543211'),
    (3, 'Priya Reddy', '9876543212'),
    (4, 'Sneha Patel', '9876543213'),
    (5, 'Vikram Singh', '9876543214'),
    (6, 'Karthik Rao', '9876543215'),
    (7, 'Ananya Das', '9876543216'),
    (8, 'Suresh Babu', '9876543217'),
    (9, 'Meghana Reddy', '9876543218'),
    (10, 'Aditya Verma', '9876543219')
  `);

  // ==========================================
  // INSERT 10 CAMERAS
  // ==========================================

  await db.run(`
    INSERT OR IGNORE INTO cameras
    (camera_id, name, kind)
    VALUES
    (1, 'Canon EOS 90D', 'DSLR'),
    (2, 'Nikon D750', 'DSLR'),
    (3, 'Sony Alpha A7 III', 'Mirrorless'),
    (4, 'Canon EOS R5', 'Mirrorless'),
    (5, 'Fujifilm X-T5', 'Mirrorless'),
    (6, 'Nikon Z6 II', 'Mirrorless'),
    (7, 'Canon EOS 5D', 'DSLR'),
    (8, 'Sony Alpha A6400', 'Mirrorless'),
    (9, 'Panasonic Lumix GH5', 'Mirrorless'),
    (10, 'Nikon D850', 'DSLR')
  `);

  // ==========================================
  // INSERT 9 RENTALS
  // ==========================================

  await db.run(`
    INSERT OR IGNORE INTO rentals
    (rental_id, photographer_id, camera_id,
     rental_date, return_date, returned)
    VALUES
    (1, 1, 1, '2026-11-10', '2026-11-12', 1),
    (2, 2, 2, '2026-11-13', '2026-11-17', 0),
    (3, 3, 3, '2026-11-11', '2026-11-14', 1),
    (4, 4, 4, '2026-11-14', '2026-11-18', 0),
    (5, 5, 5, '2026-11-12', '2026-11-14', 1),
    (6, 6, 6, '2026-11-14', '2026-11-18', 0),
    (7, 7, 7, '2026-11-13', '2026-11-16', 0),
    (8, 8, 8, '2026-11-10', '2026-11-12', 1),
    (9, 9, 9, '2026-11-15', '2026-11-19', 0)
  `);

  console.log("Database tables created successfully");
  console.log("10 Photographers inserted");
  console.log("10 Cameras inserted");
  console.log("9 Rentals inserted");
}

// EXPORT DATABASE
module.exports = {
  dbPromise,
  initializeDatabase
};
