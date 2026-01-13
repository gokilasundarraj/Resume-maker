const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Enable CORS for all origins
server.use(cors());

// Enable JSON body parsing for POST/PUT
server.use(jsonServer.bodyParser);

// Apply default middlewares (logger, static, etc.)
server.use(middlewares);

// Mount router at root
server.use(router);

// Use Render's dynamic port or fallback to 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("✅ JSON Server running on port", PORT);
});
