import achievements from './data/achievements.json' with { type: 'json' };
import bestiary from './data/bestiary.json' with { type: 'json' };
import bosstiary from './data/bosstiary.json' with { type: 'json' };

const analyzeAchievementData = (data) => {
	const UNFAIR_ACHIEVEMENT_POINTS = 45;

	let sum = 0;
	for (const achievement of data) {
			if (!achievement.name) continue;
			const points = Number(achievement.points);
			if (Number.isNaN(points)) {
					console.log('Unknown achievement points for', achievement.name);
					continue;
			}
			sum += points;
	}
	console.log(`Max achievement points incl. coinciding achievements: ${sum}`);
	console.log(`Max achievement points excl. coinciding achievements: ${sum - UNFAIR_ACHIEVEMENT_POINTS}`);
};

const analyzeBestiaryData = (data) => {
	let sum = 0;
	for (const creature of data) {
			if (!creature.name) continue;
			const points = Number(creature.charmPoints);
			if (Number.isNaN(points)) {
					console.log('Unknown charm points for', creature.name);
					continue;
			}
			sum += points;
	}
	console.log(`Max charm points: ${sum}`);
};

const analyzeBosstiaryData = (data) => {
	const classToPoints = new Map([
			['Nemesis', 100],
			['Archfoe', 100],
			['Bane',     50],
	]);

	let sum = 0;
	for (const boss of data) {
			if (!boss.bosstiaryClass) continue;
			const points = classToPoints.get(boss.bosstiaryClass);
			if (points == null || Number.isNaN(points)) {
					console.log('Unknown boss points for', boss.name);
					continue;
			}
			sum += points;
	}
	console.log(`Max boss points: ${sum}`);
};

analyzeAchievementData(achievements);
analyzeBestiaryData(bestiary);
analyzeBosstiaryData(bosstiary);

// Update https://github.com/mathiasbynens/tibia-highscores/blob/main/max.mjs accordingly.
