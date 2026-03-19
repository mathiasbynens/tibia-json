import fs from 'node:fs/promises';

export const readJsonFile = async (fileName) => {
	const json = await fs.readFile(fileName, 'utf8');
	const data = JSON.parse(json);
	return data;
};

export const writeJsonFile = async (fileName, data) => {
	const json = JSON.stringify(data, null, '\t');
	await fs.writeFile(fileName, `${json}\n`);
};

// prettier-ignore
export const urlsToSlugs = new Map([
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson',
		'achievements',
	],
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/bestiaryjson',
		'bestiary',
	],
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/bosstiaryjson',
		'bosstiary',
	],
	[
		'https://tibia.fandom.com/wiki/User:Mathias/test/soulcoresjson',
		'soul-core-ids',
	],
]);
