const express = require("express");
const connectDB = require("../config/db");

const app = express();

const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`started server on port ${PORT}`);
});
