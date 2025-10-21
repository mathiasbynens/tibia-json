import achievements from './data/achievements.json' with { type: 'json' };

const coincidingAchievements = [
	['Nightmare Knight', 'Bone Brother'],
	['Lord Protector', 'Dread Lord'],
	['Nightmare Walker', 'Skull and Bones'],
	['Top AVIN Agent', 'Top CGB Agent', 'Top TBI Agent'],
	['Marid Ally', 'Efreet Ally'],
	['Follower of Azerus', 'Follower of Palimuth', 'Turncoat'],
	['Yalahari of Wisdom', 'Yalahari of Power'],
	// Note: His True Face is dealt with separately, below.
];

const map = new Map();
for (const achievement of achievements) {
	map.set(achievement.name, achievement);
}

let sum = map.get('His True Face').points;
for (const conflicts of coincidingAchievements) {
	for (const unobtainable of conflicts.slice(1)) {
		if (!map.has(unobtainable)) {
			throw new Error(`Achievement not found: ${unobtainable}`);
		}
		const points = map.get(unobtainable).points;
		sum += points;
	}
}

export const UNFAIR_ACHIEVEMENT_POINTS = sum;
