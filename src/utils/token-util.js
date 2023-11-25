const crypto = require("crypto");

exports.createTokenWithExpiry = (appName) => {
  const unixTime = Math.floor(Date.now() / 1000);
  const expiryTime = unixTime + 10 * 3600;
  const data = `${appName}-${unixTime}`;
  const token = crypto.createHash("sha256").update(data).digest("hex");
  return { token, expiryTime };
};
