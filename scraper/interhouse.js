export async function scrapeInterhouse(page, { location, max }) {
  const url = `https://interhouse.nl/huurwoningen/?search_terms=${location}&maximum_price=${max}&number_of_results=20&sort=date-desc&display=list`;

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle0' });

    const urls = await page.$$eval('div.c-result-item', (content) => {
      return content.map((el) => {
        // Check if the building is available
        const status = el.querySelector('span.building-status').innerHTML;
        if (status === 'Beschikbaar') return el.querySelector('a').href;
      });
    });

    urls.forEach((link) => {
      // Output all links.
      if (link) console.log(link);
    });
  } catch (error) {
    console.warn(error);
  }
}
