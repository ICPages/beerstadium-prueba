const fs = require('fs');

const API_KEY = process.env.API_FOOTBALL_KEY;

const headers = {
    "x-apisports-key": API_KEY
};

const requests = [

    {
        league: 3,
        season: 2026,
        date: '2026-05-07',
        output: 'europa-league.json'
    },

    {
        league: 848,
        season: 2026,
        date: '2026-05-07',
        output: 'conference-league.json'
    },

    {
        league: 2,
        season: 2026,
        date: '2026-05-30',
        output: 'champions-league.json'
    }
];

async function fetchMatches(config) {

    const url =
`https://v3.football.api-sports.io/fixtures?league=${config.league}&season=${config.season}&date=${config.date}`;

    const response = await fetch(url, {
        headers
    });

    const data = await response.json();

    const optimized = data.response.map(match => ({

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