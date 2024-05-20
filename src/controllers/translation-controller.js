// src/controllers/translation-controller.js
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

exports.translateText = async (req, res) => {
  const { sourceLang, targetLang, text } = req.query;

  if (!sourceLang || !targetLang || !text) {
    return res.status(400).send('sourceLang, targetLang, and text are required');
  }

  const translateUrl = `https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&text=${encodeURIComponent(text)}&op=translate`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(translateUrl, { waitUntil: 'networkidle0' });

    // Wait for the translation result to be available
    await page.waitForSelector('a[href="./details"]');

    const translatedText = await page.evaluate(() => {
      const text = document.querySelectorAll('a[href="./details"]')[1].parentElement.parentElement.parentElement.children[0].innerText;
      
      return text;
    });

    await browser.close();

    res.send({ translated_text: translatedText });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
