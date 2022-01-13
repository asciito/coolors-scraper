import { Browser, launch } from "puppeteer";


/**
 * Open a new page in the browser
 * 
 * TODO:
 * - Remove the browser
 * - Create the browser in other place
 * - Split the responsabilities
 * 
 * @param {string} color The color you want to extract the information
 * @returns {Browser}
 */
export default function getPage(color) {
    try {
        console.log('Launching the browser...')

        const browser = await launch({
            headless: true,
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();

        console.log('Opening a new page...');
        await page.goto(`https://coolors.co/${color}`, { waitUntil: 'domcontentloaded'});

        return page;
    } catch (error) {
        console.log('There has been and error: ' + error);
        
        throw Error("Couldn't launch the browser");
    }
}