const puppeteer = require("puppeteer");

module.exports = async function browser() {
    try {
        return await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            ignoreHTTPSErrors: true,
        });
    } catch(error) {
        Promise.reject(error);
    }
}