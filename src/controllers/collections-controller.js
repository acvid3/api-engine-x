const getCollections = require("../utils/get-collections");

exports.fetchCollections = async (req, res) => {
  try {
    const { token, last_update, sort } = req.query;
    const collections = await getCollections(token, last_update, sort);
    res.json(collections);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
