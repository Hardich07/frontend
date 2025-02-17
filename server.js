const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Import Routes
const binanceRoutes = require("./routes/binance");
const bybitRoutes = require("./routes/bybit");
const mexcRoutes = require("./routes/mexc");
const kucoinRoutes = require("./routes/kucoin");

// API Routes
app.use("/api/binance", binanceRoutes);
app.use("/api/bybit", bybitRoutes);
app.use("/api/mexc", mexcRoutes);
app.use("/api/kucoin", kucoinRoutes);

// WebSocket Handlers
require("./sockets/spot")(io);
require("./sockets/futures")(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
