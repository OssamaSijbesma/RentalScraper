export async function scrapeDomica(page, { location, max }) {
  const url = `https://domica.nl/huurwoningen/plaatsnaam-${location}/prijsmax-${max}/slaapkamers-1`;

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get all the urls on the page.
    const urls = await page.$$eval('div.images', (content) =>
      content.map((el) => {
        // Check if the building is available
        const status = el.querySelector('span.product-label')?.innerHTML;
        if (status == null) return el.querySelector('a').href;
      })
    );

    urls.forEach((link) => {
      // Output all links.
      if (link) console.log(link);
    });
  } catch (error) {
    console.warn(error);
  }
}
