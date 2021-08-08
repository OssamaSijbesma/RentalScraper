import Puppeteer from 'puppeteer';
import {
  scrapeInterhouse,
  scrapeFunda,
  scrapePararius,
} from './scraper/index.js';

const scrapers = [scrapeInterhouse, scrapeFunda, scrapePararius];

// IIFE
(async () => {
  console.log('Opening the browser...');
  const browser = await Puppeteer.launch({
    headless: false, // Shows the actions in the browser.
    slowMo: 100, // Slows down puppeteer (No bot speed!)
  });

  console.log('Scrape the internet...');
  await Promise.all(
    scrapers.map(async (scrapeFunction) => {
      // Open a new page
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1000 });

      // Start scraping.
      await scrapeFunction(page);

      // Close the page
      await page.close();
    })
  );

  console.log('Close the browser...');
  await browser.close();
})();
