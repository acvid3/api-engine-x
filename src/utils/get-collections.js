const puppeteerManager = require("../services/puppeteer-manager");

const findDeepestElementsByText = (
  selector,
  textArray,
  timeout = 5000,
  interval = 10,
  caseSensitive = false
) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkElement = () => {
      const elements = document.querySelectorAll(selector);
      let foundElements = [];

      for (let element of elements) {
        for (let text of textArray) {
          const elementText = caseSensitive
            ? element.textContent.trim()
            : element.textContent.trim().toLowerCase();
          const searchText = caseSensitive
            ? text.trim()
            : text.trim().toLowerCase();

          if (elementText.includes(searchText)) {
            let childHasSameText = Array.from(element.children).some(
              (child) => {
                const childText = caseSensitive
                  ? child.textContent.trim()
                  : child.textContent.trim().toLowerCase();
                return childText.includes(searchText);
              }
            );

            if (!childHasSameText) {
              foundElements.push(element);
            }
          }
        }
      }

      if (foundElements.length > 0 || Date.now() - startTime > timeout) {
        if (foundElements.length > 0) {
          resolve(foundElements);
        } else {
          console.log("No elements found");
          reject(new Error("Timeout exceeded"));
        }
        return;
      }

      setTimeout(checkElement, interval);
    };

    checkElement();
  });
};

async function getCollections(token, last_update, sort) {
  const session = puppeteerManager.getSession(token);

  if (!session) {
    throw new Error("Session not font");
  }

  const page = await session.browser.newPage();
  await page.goto("https://opensea.io/rankings", { waitUntil: "networkidle0" });

  await page.screenshot({ path: `./scrapingbee_homepage.jpg` });
  await page.waitForSelector("#__NEXT_DATA__");
  const collectionsData = await page.evaluate(() => {
    findDeepestElementsByText("body", ["Yes"])[0].click();

    const rawData = document.getElementById("__NEXT_DATA__").innerText;
    const data = JSON.parse(rawData);
    const initialRecords = data.props.pageProps.initialRecords;

    const collections = [];
    for (const key in initialRecords) {
      const record = initialRecords[key];
      if (record && record["__typename"] === "CollectionType") {
        const { name, slug, logo } = record;
        collections.push({ name, slug, logo });
      }
    }
    return collections;
  });
  await page.screenshot({ path: `./${Math.random()}scrapingbee_homepage.jpg` });
  await page.close();

  // filter
  const filteredCollections = filterAndSortCollections(
    collectionsData,
    last_update,
    sort
  );

  return filteredCollections;
}

function filterAndSortCollections(collections, last_update, sort) {
  //  .filter() or .sort()
  //  last_update or sort.

  return collections;
}

module.exports = getCollections;
