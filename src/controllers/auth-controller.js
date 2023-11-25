const tokenUtil = require("../utils/token-util");
const puppeteerManager = require("../services/puppeteer-manager");

exports.generateToken = async (req, res) => {
  const { appName } = req.body;
  if (!appName) {
    return res.status(400).send("App name is required");
  }

  const { token, expiryTime } = tokenUtil.createTokenWithExpiry(appName);
  await puppeteerManager.createSession(token, expiryTime);
  res.json({ token });
};
