export async function scrapePararius(page) {
    const url = 'https://www.pararius.nl/huurwoningen/amersfoort/0-900';

    console.log(`Navigate to ${url}.`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get all the urls on the page
    const urls = await page.$$eval('h2.listing-search-item__title', (content) => {
        const link = content.map(el => el.querySelector('a').href);
        return link;
    });

    urls.forEach(link => {
        console.log(link);
    });
}
