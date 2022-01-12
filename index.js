const puppeteer = require('puppeteer');
const fs = require('fs');


// Create the browser
const browser = (async () => {
    let browser;

    try {
        console.log("Opening the browser");

        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            ignoreHTTPSErrors: true,
        });
    } catch(err) {
        console.log("Could not create a browser instance => : ", err);
    }

    return browser;
})();

// Scrap the site
const colors = (async browserPromise => {
    const url = 'https://coolors.co/ff1f26';
    const browser = await browserPromise;
    const page = await browser.newPage();

    console.log(`Navigating to ${url}`);

    await page.goto(url);

    await page.waitForSelector('.palette-stripe_colors');

    // Get the colors from the span
    const colors = await page.$$eval(
        '#color-picker-page_variations_tints .palette-stripe_colors > div',     // Query the color palette
        palette => palette.map(color => color.querySelector('span').innerText)  // Get the HEX color
    );

    await page.close();

    await browser.close();

    return colors;
})(browser);


// Save it as a JSON file\\\\\\
(async colors => {
    colors = await colors;

    fs.writeFile('data.json', JSON.stringify(colors), 'utf-8', err => {
        if (err) {
            return console.log('Something happend :`3');
        }

        console.log('The data haas been succesfully saved');
    })
})(colors);