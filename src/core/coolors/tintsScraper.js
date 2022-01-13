import { Page } from "puppeteer";
import { paletteStripe } from "../../helpers/colorHelpers";

/**
 * Extract the tints of the color you choose
 * 
 * @param {Page} pageInstance The from where you want to extract the information
 * @returns 
 */
export default function(pageInstance) {
    //
    const page = await pageInstance;

    return page.$$eval('#color-picker-page_variations_tints .palette-stripe_colors > div[style]', paletteStripe);
}