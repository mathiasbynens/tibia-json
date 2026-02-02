import puppeteer from 'puppeteer';

import { writeJsonFile } from './utils.mjs';

const browser = await puppeteer.launch({
	headless: 'shell',
});
const page = await browser.newPage();

const toBoolean = (value) => {
	const normalized = value.trim().toLowerCase();
	switch (normalized) {
		case 'yes': {
			return true;
		}
		case 'no': {
			return false;
		}
	}
};

const toNumber = (value) => {
	const number = Number(value);
	return number;
};

const toMultiplier = (value) => {
	const multiplier = Number(value.replace('%', '')) / 100;
	return multiplier;
};

const patchObject = (object) => {
	const isAchievement = Object.hasOwn(object, 'secret');
	if (isAchievement) {
		object.name = object.name.replace(' (Achievement)', '');
		object.secret = toBoolean(object.secret);
	}
	const isCreatureOrBoss =
		Object.hasOwn(object, 'bestiaryClass') ||
		Object.hasOwn(object, 'bosstiaryClass');
	if (isCreatureOrBoss) {
		object.name = object.name.replace(' (Creature)', '');
	}
	const numberProps = new Set([
		'armor',
		'mitigation',
		'charmPoints',
		'experience',
		'hitpoints',
		'points',
	]);
	for (const prop of numberProps) {
		if (Object.hasOwn(object, prop)) {
			object[prop] = toNumber(object[prop]);
		}
	}
	const multiplierProps = new Set([
		'deathDmgMod',
		'earthDmgMod',
		'energyDmgMod',
		'fireDmgMod',
		'healMod',
		'holyDmgMod',
		'iceDmgMod',
		'physicalDmgMod',
	]);
	for (const prop of multiplierProps) {
		if (Object.hasOwn(object, prop)) {
			object[prop] = toMultiplier(object[prop]);
		}
	}
	return object;
};

const extractJson = async (url) => {
	await page.goto(url);
	const element = await page.waitForSelector('.mw-parser-output');
	const json = await element?.evaluate((element) => element.textContent);
	const data = JSON.parse(json);
	const filtered = data
		// Allow non-empty objects only.
		.filter((element) => {
			return Object.hasOwn(element, 'name') && element.name.length > 0;
		})
		// Fix-up properties where applicable.
		.map((element) => patchObject(element));
	if (url.includes('soulcoresjson')) {
		filtered.sort((a, b) => a.id - b.id);
	}
	return filtered;
};

const urlsToFileNames = new Map([
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson',
		'achievements.json',
	],
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/bestiaryjson',
		'bestiary.json',
	],
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/bosstiaryjson',
		'bosstiary.json',
	],
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/soulcoresjson',
		'soul-core-ids.json',
	],
]);

for (const [url, fileName] of urlsToFileNames) {
	const data = await extractJson(url);
	await writeJsonFile(`./data/${fileName}`, data);
}

await browser.close();
