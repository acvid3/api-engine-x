const puppeteerManager = require("../services/puppeteerManager");
const tokenUtil = require("../utils/tokenUtil");

exports.generateToken = async (req, res) => {
  const { appName } = req.body;
  if (!appName) {
    return res.status(400).send("App name is required");
  }

  const token = tokenUtil.createToken(appName);
  await puppeteerManager.createSession(token);
  res.json({ token });
};
