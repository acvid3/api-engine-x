const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const collectionsRoutes = require("./routes/collections-routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/nft", collectionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
