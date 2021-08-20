export async function scrapeFunda(page, { location, min, max }) {
  const url = `https://www.funda.nl/huur/gemeente-${location}/${min}-${max}/sorteer-datum-af/`;

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get all the urls on the page.
    const urls = await page.$$eval('div.search-result-media', (content) => {
      const fetchedLink = content.map((el) => el.querySelector('a').href);
      return fetchedLink;
    });

    urls.slice(0, 2).forEach((link) => {
      // Output all links.
      if (!link.includes('parkeergelegenheid')) console.log(link);
    });
  } catch (error) {
    console.warn(error);
  }
}
