const crypto = require("crypto");

exports.createToken = (appName) => {
  const unixTime = Math.floor(Date.now() / 1000);
  const data = `${appName}-${unixTime}`;
  return crypto.createHash("sha256").update(data).digest("hex");
};
