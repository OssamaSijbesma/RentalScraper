import Puppeteer from "puppeteer";
import { scrapeFunda, scrapePararius } from "./scraper/index.js";

const scrapers = [scrapeFunda, scrapePararius];

// IIFE
(async() => {
    console.log('Opening the browser...');
    const browser = await Puppeteer.launch({
        headless: false, // Shows the actions in the browser.
        slowMo: 100, // Slows down puppeteer (No bot speed!)
    });

    await Promise.all(scrapers.map(async (scrapeFunction) => {
        console.log('Opening a new page...')
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 1000 });

        // Start scraping.
        await scrapeFunction(page);

        console.log('Closing the page...');
        await page.close();
    }));

    await browser.close();
})();



