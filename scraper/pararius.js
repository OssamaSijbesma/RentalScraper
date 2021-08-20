export async function scrapePararius(page, { location, min, max }) {
  const url = `https://www.pararius.nl/huurwoningen/${location}/${min}-${max}`;

  // Create comparison date
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 2);
  console.log(url);

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get all the urls on the page
    const urls = await page.$$eval(
      'h2.listing-search-item__title',
      (content) => {
        const link = content.map((el) => el.querySelector('a').href);
        return link;
      }
    );

    for (const link of urls) {
      // Navigate to the specific page
      await page.goto(link, { waitUntil: 'domcontentloaded' });

      // Get the raw date
      const rawDate = await page.$eval(
        'dd.listing-features__description--offered_since span',
        (el) => {
          return el.innerHTML;
        }
      );

      if (/[0-9]$/g.test(rawDate)) {
        // Parse the date
        const parsedDate = new Date(rawDate.split(/\D/g).reverse());

        // Log the date
        if (parsedDate > startDate) console.log(link);
      }
    }
  } catch (error) {
    console.warn(error);
  }
}
