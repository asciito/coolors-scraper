const browserPromise = require('./browser');

/**
 * Open a new page in the browser
 * 
 * @param {string} color The color you want to extract the information
 * @returns {Promise<Page>}
 */
module.exports = async function getPage(color) {
    const browser = await browserPromise();
    const page = await browser.newPage();
    
    await page.goto(`https://coolors.co/${color}`, { waitUntil: 'domcontentloaded'});

    return {
        page,
        browser
    };
}