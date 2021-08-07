export async function scrapeFunda(page) {
    const url = 'https://www.funda.nl/huur/gemeente-amersfoort/0-900/sorteer-datum-af/';

    console.log(`Navigate to ${url}.`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get all the urls on the page
    const urls = await page.$$eval('div.search-result-media', (content) => {
        const link = content.map(el => el.querySelector('a').href);
        return link;
    });

    urls.forEach(link => {
        if(!link.includes('parkeergelegenheid'))
            console.log(link);
    });
}
