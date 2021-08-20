export async function scrapeSpots4You(page, { location }) {
  const url = `https://spots4you.com/en/nl/spaces/living/1?country=NL&city=${location}`;

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Get all the urls on the page.
    const urls = await page.$$eval('a.space', (anchors) =>
      anchors.map((link) => link.href)
    );

    urls.forEach((link) => {
      // Output all links.
      console.log(link);
    });
  } catch (error) {
    console.warn(error);
  }
}
