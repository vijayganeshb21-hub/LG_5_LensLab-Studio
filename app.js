
// ============================================
// LENSLAB STUDIO - CAMERA RENTAL MANAGEMENT
// ============================================

const express = require("express");
const {
  dbPromise,
  initializeDatabase
} = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

// ============================================
// ROOT ROUTE
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to LensLab Studio Camera Rental API"
  });
});

// ============================================
// PHOTOGRAPHER ROUTES
// ============================================

// GET ALL PHOTOGRAPHERS
app.get("/photographers", async (req, res) => {
  const db = await dbPromise;

  const data = await db.all(
    "SELECT * FROM photographers"
  );

  res.status(200).json(data);
});

// GET PHOTOGRAPHER BY ID
app.get("/photographers/:id", async (req, res) => {
  const db = await dbPromise;

  const data = await db.get(
    "SELECT * FROM photographers WHERE photographer_id = ?",
    [req.params.id]
  );

  if (!data) {
    return res.status(404).json({
      error: "Photographer not found"
    });
  }

  res.status(200).json(data);
});

// CREATE PHOTOGRAPHER
app.post("/photographers", async (req, res) => {
  const { name, phone } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof phone !== "string" || !phone.trim()
  ) {
    return res.status(400).json({
      error: "Name and phone are required"
    });
  }

  const db = await dbPromise;

  const result = await db.run(
    `INSERT INTO photographers (name, phone)
     VALUES (?, ?)`,
    [name.trim(), phone.trim()]
  );

  res.status(201).json({
    message: "Photographer added successfully",
    photographer_id: result.lastID
  });
});

// UPDATE PHOTOGRAPHER
app.put("/photographers/:id", async (req, res) => {
  const { name, phone } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof phone !== "string" || !phone.trim()
  ) {
    return res.status(400).json({
      error: "Name and phone are required"
    });
  }

  const db = await dbPromise;

  const result = await db.run(
    `UPDATE photographers
     SET name = ?, phone = ?
     WHERE photographer_id = ?`,
    [name.trim(), phone.trim(), req.params.id]
  );

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Photographer not found"
    });
  }

  res.status(200).json({
    message: "Photographer updated successfully"
  });
});

// DELETE PHOTOGRAPHER
app.delete("/photographers/:id", async (req, res) => {
  const db = await dbPromise;

  const result = await db.run(
    "DELETE FROM photographers WHERE photographer_id = ?",
    [req.params.id]
  );

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Photographer not found"
    });
  }

  res.status(200).json({
    message: "Photographer deleted successfully"
  });
});

// ============================================
// CAMERA ROUTES
// ============================================

// GET ALL CAMERAS AND SEARCH BY KIND
app.get("/cameras", async (req, res) => {
  const db = await dbPromise;
  const { kind } = req.query;

  let data;

  if (kind) {
    data = await db.all(
      "SELECT * FROM cameras WHERE kind LIKE ?",
      [`%${kind}%`]
    );
  } else {
    data = await db.all(
      "SELECT * FROM cameras"
    );
  }

  res.status(200).json(data);
});

// GET CAMERA BY ID
app.get("/cameras/:id", async (req, res) => {
  const db = await dbPromise;

  const data = await db.get(
    "SELECT * FROM cameras WHERE camera_id = ?",
    [req.params.id]
  );

  if (!data) {
    return res.status(404).json({
      error: "Camera not found"
    });
  }

  res.status(200).json(data);
});

// CREATE CAMERA
app.post("/cameras", async (req, res) => {
  const { name, kind } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof kind !== "string" || !kind.trim()
  ) {
    return res.status(400).json({
      error: "Camera name and kind are required"
    });
  }

  const db = await dbPromise;

  const existing = await db.get(
    `SELECT name FROM cameras
     WHERE name = ? COLLATE NOCASE`,
    [name.trim()]
  );

  if (existing) {
    return res.status(409).json({
      message: `${existing.name} already exists`
    });
  }

  try {
    const result = await db.run(
      `INSERT INTO cameras (name, kind)
       VALUES (?, ?)`,
      [name.trim(), kind.trim()]
    );

    res.status(201).json({
      message: "Camera added successfully",
      camera_id: result.lastID
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      return res.status(409).json({
        message: `${name.trim()} already exists`
      });
    }

    throw error;
  }
});

// UPDATE CAMERA
app.put("/cameras/:id", async (req, res) => {
  const { name, kind } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof kind !== "string" || !kind.trim()
  ) {
    return res.status(400).json({
      error: "Camera name and kind are required"
    });
  }

  const db = await dbPromise;

  const camera = await db.get(
    "SELECT * FROM cameras WHERE camera_id = ?",
    [req.params.id]
  );

  if (!camera) {
    return res.status(404).json({
      error: "Camera not found"
    });
  }

  const existing = await db.get(
    `SELECT name FROM cameras
     WHERE name = ? COLLATE NOCASE
     AND camera_id != ?`,
    [name.trim(), req.params.id]
  );

  if (existing) {
    return res.status(409).json({
      message: `${existing.name} already exists`
    });
  }

  try {
    await db.run(
      `UPDATE cameras
       SET name = ?, kind = ?
       WHERE camera_id = ?`,
      [name.trim(), kind.trim(), req.params.id]
    );

    res.status(200).json({
      message: "Camera updated successfully"
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      return res.status(409).json({
        message: `${name.trim()} already exists`
      });
    }

    throw error;
  }
});

// DELETE CAMERA
app.delete("/cameras/:id", async (req, res) => {
  const db = await dbPromise;

  const result = await db.run(
    "DELETE FROM cameras WHERE camera_id = ?",
    [req.params.id]
  );

  if (result.changes === 0) {
    return res.status(404).json({
      error: "Camera not found"
    });
  }

  res.status(200).json({
    message: "Camera deleted successfully"
  });
});

// ============================================
// RENTAL ROUTES
// ============================================

// GET ALL RENTALS
app.get("/rentals", async (req, res) => {
  const db = await dbPromise;

  const data = await db.all(
    "SELECT * FROM rentals"
  );

  res.status(200).json(data);
});

// JOIN PHOTOGRAPHERS AND CAMERAS
app.get("/rentals/details", async (req, res) => {
  const db = await dbPromise;

  const data = await db.all(`
    SELECT
      rentals.rental_id,
      photographers.name AS photographer_name,
      photographers.phone,
      cameras.name AS camera_name,
      cameras.kind,
      rentals.rental_date,
      rentals.return_date,
      rentals.returned
    FROM rentals
    JOIN photographers
      ON rentals.photographer_id =
         photographers.photographer_id
    JOIN cameras
      ON rentals.camera_id = cameras.camera_id
  `);

  res.status(200).json(data);
});

// GET RENTAL BY ID
app.get("/rentals/:id", async (req, res) => {
  const db = await dbPromise;

  const data = await db.get(
    "SELECT * FROM rentals WHERE rental_id = ?",
    [req.params.id]
  );

  if (!data) {
    return res.status(404).json({
      error: "Rental not found"
    });
  }

  res.status(200).json(data);
});

// CREATE RENTAL
app.post("/rentals", async (req, res) => {
  const {
    photographer_id,
    camera_id,
    rental_date,
    return_date
  } = req.body;

  if (
    !Number.isInteger(photographer_id) ||
    !Number.isInteger(camera_id) ||
    typeof rental_date !== "string" ||
    !rental_date.trim()
  ) {
    return res.status(400).json({
      error: "Valid photographer_id, camera_id and rental_date are required"
    });
  }

  if (
    return_date !== undefined &&
    return_date !== null &&
    typeof return_date !== "string"
  ) {
    return res.status(400).json({
      error: "Return date must be a string"
    });
  }

  const db = await dbPromise;

  const photographer = await db.get(
    "SELECT * FROM photographers WHERE photographer_id = ?",
    [photographer_id]
  );

  const camera = await db.get(
    "SELECT * FROM cameras WHERE camera_id = ?",
    [camera_id]
  );

  if (!photographer || !camera) {
    return res.status(404).json({
      error: "Photographer or camera not found"
    });
  }

  const result = await db.run(
    `INSERT INTO rentals
     (photographer_id, camera_id, rental_date, return_date)
     VALUES (?, ?, ?, ?)`,
    [
      photographer_id,
      camera_id,
      rental_date.trim(),
      return_date || null
    ]
  );

  res.status(201).json({
    message: "Rental created successfully",
    rental_id: result.lastID
  });
});

// RETURN CAMERA
app.put("/rentals/:id/return", async (req, res) => {
  const db = await dbPromise;

  const rental = await db.get(
    "SELECT * FROM rentals WHERE rental_id = ?",
    [req.params.id]
  );

  if (!rental) {
    return res.status(404).json({
      error: "Rental not found"
    });
  }

  if (rental.returned === 1) {
    return res.status(400).json({
      error: "Camera is already returned"
    });
  }

  await db.run(
    "UPDATE rentals SET returned = 1 WHERE rental_id = ?",
    [req.params.id]
  );

  res.status(200).json({
    message: "Camera returned successfully"
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    error: "Internal server error"
  });
});

// ============================================
// START SERVER
// ============================================

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
