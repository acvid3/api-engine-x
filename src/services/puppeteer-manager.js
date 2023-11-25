const puppeteer = require("puppeteer");

class PuppeteerManager {
  constructor() {
    this.sessions = {};
  }

  async createSession(token, expiryTime) {
    console.log(token, expiryTime, Math.floor(Date.now() / 1000));

    const browser = await puppeteer.launch({ headless: true });
    this.sessions[token] = { browser, expiryTime };

    const timeLeft = expiryTime * 1000 - Date.now();
    if (timeLeft <= 0) {
      console.error(`The token has already expired: ${timeLeft} мс`);
      await this.closeSession(token);
    } else {
      setTimeout(() => this.closeSession(token), timeLeft);
    }

    return token;
  }

  getSession(token) {
    return this.sessions[token];
  }

  async closeSession(token) {
    if (this.sessions[token]) {
      console.log(`Closing session for token: ${token}`);
      await this.sessions[token].browser.close();
      delete this.sessions[token];
    }
  }
}

module.exports = new PuppeteerManager();
