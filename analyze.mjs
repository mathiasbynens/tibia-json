import {writeJsonFile} from './utils.mjs';
import {UNFAIR_ACHIEVEMENT_POINTS} from './unfair-achievement-points.mjs';

import achievements from './data/achievements.json' with { type: 'json' };
import bestiary from './data/bestiary.json' with { type: 'json' };
import bosstiary from './data/bosstiary.json' with { type: 'json' };

const analyzeAchievementData = (data) => {
	let sum = 0;
	for (const achievement of data) {
		if (!achievement.name) continue;
		const points = achievement.points;
		if (Number.isNaN(points)) {
			console.log('Unknown achievement points for', achievement.name);
			continue;
		}
		sum += points;
	}
	const maxAchievementPointsIncludingCoincidingAchievements = sum;
	const maxAchievementPointsExcludingCoincidingAchievements = sum - UNFAIR_ACHIEVEMENT_POINTS;
	console.log(`Unfair achievement points (obtained by rooking): ${UNFAIR_ACHIEVEMENT_POINTS}`);
	console.log(`Max achievement points incl. coinciding achievements: ${maxAchievementPointsIncludingCoincidingAchievements}`);
	console.log(`Max achievement points excl. coinciding achievements: ${maxAchievementPointsExcludingCoincidingAchievements}`);
	return {
		unfairAchievementPoints: UNFAIR_ACHIEVEMENT_POINTS,
		maxAchievementPointsIncludingCoincidingAchievements,
		maxAchievementPointsExcludingCoincidingAchievements,
	};
};

const analyzeBestiaryData = (data) => {
	let sum = 0;
	for (const creature of data) {
		if (!creature.name) continue;
		const points = creature.charmPoints;
		if (Number.isNaN(points)) {
			console.log('Unknown charm points for', creature.name);
			continue;
		}
		sum += points;
	}
	console.log(`Max charm points: ${sum}`);
	return sum;
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
	return sum;
};

const {
	unfairAchievementPoints,
	maxAchievementPointsIncludingCoincidingAchievements,
	maxAchievementPointsExcludingCoincidingAchievements,
} = analyzeAchievementData(achievements);
const maxCharmPoints = analyzeBestiaryData(bestiary);
const maxBossPoints = analyzeBosstiaryData(bosstiary);

await writeJsonFile('./data/max.json', {
	unfairAchievementPoints,
	maxAchievementPointsIncludingCoincidingAchievements,
	maxAchievementPointsExcludingCoincidingAchievements,
	maxCharmPoints,
	maxBossPoints,
});

// Update https://github.com/mathiasbynens/tibia-highscores/blob/main/max.mjs accordingly.
