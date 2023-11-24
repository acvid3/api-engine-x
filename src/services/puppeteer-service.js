const puppeteer = require("puppeteer");

class PuppeteerManager {
  constructor() {
    this.sessions = {};
  }

  async createSession(token) {
    const browser = await puppeteer.launch({ headless: true });
    this.sessions[token] = { browser };
  }

  getSession(token) {
    return this.sessions[token];
  }

  async closeSession(token) {
    if (this.sessions[token]) {
      await this.sessions[token].browser.close();
      delete this.sessions[token];
    }
  }
}

module.exports = new PuppeteerManager();
