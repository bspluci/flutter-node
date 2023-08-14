require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const { db } = require("./models/Member");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const PORT = process.env.DB_PORT;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(cors());

// socket.io 통신
const server = http.createServer(app);
const io = require("socket.io")(server, {
  // CORS 해결
  cors: {
    origin: "http://localhost:56752",
    credentials: true,
  },
});
module.exports = io;

mongoose.Promise = global.Promise;

app.get("/", (req, res) => {
  res.send("API RUNNING...");
});

connectDB();

app.use("/api/member", require("./routes/api/members"));

app.use("/api/post", require("./routes/api/posts"));

// app.use("/api/member", require("./routes/api/members"));

// app.use("/api/todo", require("./routes/api/todos"));

// app.use("/api/chat", require("./routes/api/chats"));

// app.get("/html/nav", (req, res) => {
//   res.sendFile(__dirname + "/html/nav.html");
// });

// app.get("/html/slider", (req, res) => {
//   res.sendFile(__dirname + "/html/slider.html");
// });

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
