const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const collectionsRoutes = require("./routes/collections-routes");
const pageRoutes = require('./routes/page-routes'); 
const translationRoutes = require('./routes/translation-routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/nft", collectionsRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/translate', translationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
