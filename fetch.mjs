import puppeteer from 'puppeteer';

import { urlsToSlugs, writeJsonFile } from './utils.mjs';

const browser = await puppeteer.launch({
	headless: 'shell',
});
const page = await browser.newPage();

const extractJson = async (url) => {
	await page.goto(url);
	const element = await page.waitForSelector('.mw-parser-output');
	const json = await element?.evaluate((element) => element.textContent);
	const data = JSON.parse(json);
	return data;
};

for (const [url, slug] of urlsToSlugs) {
	console.log(url);
	const data = await extractJson(url);
	await writeJsonFile(`./data/${slug}-raw.json`, data);
}

await browser.close();
