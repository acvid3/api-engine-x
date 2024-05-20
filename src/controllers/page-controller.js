const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

exports.fetchPageContent = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9'
    });

    await page.goto(url, { waitUntil: 'networkidle0' });
    const content = await page.content();

    await browser.close();

    res.send(content);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
