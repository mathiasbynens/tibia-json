import fs from 'node:fs/promises';

export const writeJsonFile = async (fileName, data) => {
	const json = JSON.stringify(data, null, '\t');
	await fs.writeFile(fileName, `${json}\n`);
};
