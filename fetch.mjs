
import fs from 'node:fs/promises';

import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const extractJson = async (url) => {
  await page.goto(url);
  const element = await page.waitForSelector('.mw-parser-output');
  const json = await element?.evaluate(element => element.textContent);
  const data = JSON.parse(json);
  // Remove empty objects (incl. at the end).
  const filtered = data.filter(element => Object.hasOwn(element, 'name'));
  return filtered;
};

const stringify = (data) => {
  return JSON.stringify(data, null, '\t') + '\n';
};

const urlsToFileNames = new Map([
  ['https://tibia.fandom.com/wiki/User:Mathias/test/bestiaryjson',     'bestiary.json'],
  ['https://tibia.fandom.com/wiki/User:Mathias/test/bosstiaryjson',    'bosstiary.json'],
  ['https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson', 'achievements.json'],
]);

for (const [url, fileName] of urlsToFileNames) {
  const data = await extractJson(url);
  await fs.writeFile(`./data/${fileName}`, stringify(data));
}

await browser.close();
