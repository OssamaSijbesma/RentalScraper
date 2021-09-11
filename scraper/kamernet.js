export async function scrapeKamernet(page, { location, max }) {
  const url = `https://kamernet.nl/huren/kamers-amersfoort`;

  try {
    // Navigate to the page
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    console.log(
      await page.evaluate(() => {
        return fetch('kamernet.nl/en/PropertiesApi/GetResultCount', {
          method: 'POST',
          body: 'Variant=&PageNumber=1&DontFecthEarlyBird=True&SearchResults.SearchView=Tile&SearchResults.ResultType=Search&IsNoResultsPage=False&SortId=1&LocationText=Amersfoort&RadiusId=1&RentalPriceId=8&SurfaceId=14&Variant=&RoomTypeId%5B%5D=1&RoomTypeId%5B%5D=2&RoomTypeId%5B%5D=4&AvailableFromDate=&AvailableFromDate_submit=&SuitableForNumberOfPersonsId%5B%5D=-&CandidateAge%5B%5D=-&RoommateMaxNumberId%5B%5D=-',
        }).then((res) => res.json());
      })
    );
  } catch (error) {
    console.warn(error);
  }
}
