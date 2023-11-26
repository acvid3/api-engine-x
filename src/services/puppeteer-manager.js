const puppeteer = require("puppeteer");

class PuppeteerManager {
  constructor() {
    this.sessions = {};
  }

  async createSession(token, expiryTime) {
    console.log(token, expiryTime, Math.floor(Date.now() / 1000));

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "max-age=0",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      Referer: "https://www.google.com/",
      DNT: "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
    });

    await page.goto("https://opensea.io/rankings", {
      waitUntil: "networkidle0",
    });

    await page.screenshot({ path: `./scrapingbee_homepage.jpg` });

    this.sessions[token] = { browser, page, expiryTime };

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
      await this.sessions[token].page.close();
      await this.sessions[token].browser.close();
      delete this.sessions[token];
    }
  }
}

module.exports = new PuppeteerManager();
