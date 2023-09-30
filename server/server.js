const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://localhost:27017/GasConnect`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "supplier" }).save(),
        new Role({ name: "admin" }).save()
      ]);
    }
    console.log("Roles added to the roles collection");
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
}

// Import your route files correctly as Router objects
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Use your route objects with app.use
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
