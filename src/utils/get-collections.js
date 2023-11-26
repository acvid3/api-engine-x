const puppeteerManager = require("../services/puppeteer-manager");

async function getCollections(token, last_update, sort) {
  const session = puppeteerManager.getSession(token);

  if (!session) {
    throw new Error("Session not font");
  }

  const page = session.page;

  await page.waitForSelector("#__NEXT_DATA__");

  const collectionsData = await page.evaluate(() => {
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
