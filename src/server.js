const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 5000 || process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://radz:radz@cluster0-y2824.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
    );

    console.log("connected");
  } catch (error) {
    console.log("not connected");
  }
};

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tracks", require("./routes/tracks"));

app.listen(PORT, () => {
  console.log(`started server on port ${PORT}`);
});
