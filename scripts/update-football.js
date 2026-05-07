const fs = require('fs');

const API_KEY = process.env.API_FOOTBALL_KEY;

const headers = {
    "x-apisports-key": API_KEY
};

const requests = [

    {
        league: 3,
        season: 2025,
        output: 'europa-league.json'
    },

    {
        league: 848,
        season: 2025,
        output: 'conference-league.json'
    },

    {
        league: 2,
        season: 2025,
        output: 'champions-league.json'
    }
];

async function fetchMatches(config) {

    const url =
`https://v3.football.api-sports.io/fixtures?league=${config.league}&season=${config.season}`;

    const response = await fetch(url, {
        headers
    });

    const data = await response.json();

    const importantMatches = data.response.filter(match => {

    const round = match.league.round || '';

    return (
        round.includes('Semi-finals') ||
        round.includes('Final')
    );
});

    // 🔥 VALIDACIÓN IMPORTANTE
    if (!importantMatches || importantMatches.length === 0) {

        console.log(`Sin partidos para ${config.output}`);

        fs.writeFileSync(
            `./data/${config.output}`,
            JSON.stringify([], null, 2)
        );

        return;
    }

    const optimized = importantMatches.map(match => ({

        league: match.league.name,

        round: match.league.round,

        date: match.fixture.date,

        status: match.fixture.status.short,

        home: {
            name: match.teams.home.name,
            logo: match.teams.home.logo
        },

        away: {
            name: match.teams.away.name,
            logo: match.teams.away.logo
        },

        goals: {
            home: match.goals.home,
            away: match.goals.away
        }
    }));

    fs.writeFileSync(
        `./data/${config.output}`,
        JSON.stringify(optimized, null, 2)
    );

    console.log(`${config.output} actualizado`);
}

async function main() {

    for (const req of requests) {
        await fetchMatches(req);
    }
}

main();
