// FILTROS
document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", filterMatches);
});

function filterMatches() {
    const team = document.getElementById("filterTeam").value.toLowerCase();
    const group = document.getElementById("filterGroup").value;
    const day = document.getElementById("filterDay").value;

    const hasOtherFilters = team || group;

    document.querySelectorAll("#matches > div").forEach(col => {
        const match = col.querySelector(".match");

        const isAd = match.dataset.ad === "true";
        const adType = match.dataset.adType;
        const matchTeams = (match.dataset.team || "").toLowerCase();
        const matchGroup = match.dataset.group;
        const matchDay = match.dataset.day;

        let show = true;

        // 👉 FILTRO POR SELECCIÓN (oculta anuncios normales)
        if (team) {
            if (isAd) {
                show = false;
            } else if (!matchTeams.includes(team)) {
                show = false;
            }
        }

        // 👉 FILTRO POR GRUPO
        if (group && matchGroup !== "all" && group !== matchGroup) show = false;

        // 👉 FILTRO POR DÍA
        if (!hasOtherFilters && day && matchDay !== "all" && day !== matchDay) show = false;

        // 👉 OCULTAR anuncios si no hay filtros activos
        if (!team && !group && !day && isAd) {
            show = false;
        }

        // 🔥 👉 AQUÍ VA EL BLOQUE NUEVO
        if (isAd) {

            // ANUNCIO SOLO PARA SELECCIÓN
            if (adType === "team") {
                show = !!team; // solo si hay selección activa
            }

            // ANUNCIO GENERAL (grupo/día)
            if (adType === "general") {
                if (!group && !day) show = false;
                if (team) show = false;
            }
        }

        col.style.display = show ? "" : "none";
    });
}

function resetFilters() {
    document.getElementById("filterTeam").value = "";
    document.getElementById("filterGroup").value = "";
    setSmartDayFilter();

    filterMatches();
}

function showTodayMatches() {
    const today = new Date();

    // Obtener día y mes en español
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    let todayText = today.toLocaleDateString('es-MX', options);

    // Capitalizar primera letra (porque JS lo da en minúsculas)
    todayText = todayText.charAt(0).toUpperCase() + todayText.slice(1);

    // Ejemplo: "Jueves, 11 de junio"

    document.querySelectorAll(".match").forEach(match => {
        const matchDay = match.dataset.day;

        if (matchDay !== todayText) {
            match.style.display = "none";
        }
    });
}

function setTodayFilter() {
    const select = document.getElementById("filterDay");

    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };

    let todayText = today.toLocaleDateString('es-MX', options);

    // Capitalizar (muy importante)
    todayText = todayText.charAt(0).toUpperCase() + todayText.slice(1);

    // Buscar coincidencia en el select
    Array.from(select.options).forEach(option => {
        if (option.text === todayText) {
            option.selected = true;
        }
    });

    // Ejecutar filtro automáticamente
    filterMatches();
}

function setSmartDayFilter() {
    const select = document.getElementById("filterDay");

    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };

    let todayText = today.toLocaleDateString('es-MX', options);
    todayText = todayText.charAt(0).toUpperCase() + todayText.slice(1);

    let found = false;

    // Buscar si hoy existe en el select
    Array.from(select.options).forEach(option => {
        if (option.text === todayText) {
            option.selected = true;
            found = true;
        }
    });

    // 👉 Si NO existe (ej: abril), seleccionar el primer día real del mundial
    if (!found) {
        // índice 1 porque índice 0 es "Día"
        select.selectedIndex = 1;
    }

    filterMatches();
}

setSmartDayFilter();

// PATROCINADORES DE PARTIDOS
const sponsorsByCity = {
    "Acapulco": {
//        "mexico-sudafrica": { name: "Beer Stadium", logo: "Imágenes/Icono.webp", link: "index.html" },
//        "brasil-marruecos": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "argentina-argelia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "inglaterra-croacia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "mexico-coreadelsur": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "chequia-mexico": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "ecuador-alemania": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "noruega-francia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "uruguay-españa": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "colombia-portugal": { name: "", logo: "Imágenes/.webp", link: ".html" }
    },
    "Puebla": {
//        "mexico-sudafrica": { name: "Beer Stadium", logo: "Imágenes/Icono.webp", link: "index.html" },
//        "brasil-marruecos": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "argentina-argelia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "inglaterra-croacia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "mexico-coreadelsur": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "chequia-mexico": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "ecuador-alemania": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "noruega-francia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "uruguay-españa": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "colombia-portugal": { name: "", logo: "Imágenes/.webp", link: ".html" }
    },
    "Querétaro": {
//        "mexico-sudafrica": { name: "Beer Stadium", logo: "Imágenes/Icono.webp", link: "index.html" },
//        "brasil-marruecos": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "argentina-argelia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "inglaterra-croacia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "mexico-coreadelsur": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "chequia-mexico": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "ecuador-alemania": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "noruega-francia": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "uruguay-españa": { name: "", logo: "Imágenes/.webp", link: ".html" },
//        "colombia-portugal": { name: "", logo: "Imágenes/.webp", link: ".html" }
    }
};

function updateSponsors() {

    const city = localStorage.getItem("city") || "";
    const sponsors = sponsorsByCity[city] || {};

    document.querySelectorAll("[data-match-id]").forEach(match => {

        const matchId = match.dataset.matchId;
        if (!matchId) return;

        const logo = match.querySelector(".sponsor-logo");
        const name = match.querySelector(".sponsor-name");

        // 🔥 FIX AQUÍ
        const link = match.closest(".col-lg-6")?.querySelector(".sponsor-link");

        if (!logo || !name) return;

        if (sponsors[matchId]) {
            const sponsor = sponsors[matchId];

            logo.src = sponsor.logo;
            name.textContent = sponsor.name;

            if (link) link.href = sponsor.link;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateSponsors();
});

// APPI-FOOTBALL
async function loadUEFAMatches() {

    const container = document.getElementById("uefaMatches");

    try {

        const files = [
            './data/europa-league.json',
            './data/conference-league.json',
            './data/champions-league.json'
        ];

        const responses = await Promise.all(
            files.map(file => fetch(file))
        );

        const jsons = await Promise.all(
            responses.map(r => r.json())
        );

        const matches = jsons.flat();

        matches.sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

        container.innerHTML = '';

        matches.forEach(match => {

            let statusText = '';
            let statusClass = '';

            switch(match.status) {

                case 'LIVE':
                case '1H':
                case '2H':
                case 'HT':
                    statusText = '🔴 EN VIVO';
                    statusClass = 'text-danger';
                    break;

                case 'FT':
                    statusText = '✅ FINAL';
                    statusClass = 'text-success';
                    break;

                default:
                    statusText = '⏳ PRÓXIMAMENTE';
                    statusClass = 'text-warning';
            }

            container.innerHTML += `
            
            <div class="col-lg-6">

                <div class="card bg-dark text-light p-3 border-warning h-100">

                    <div class="mb-2 fw-bold text-warning">
                        ${match.league}
                    </div>

                    <div class="small text-secondary mb-2">
                        ${match.round}
                    </div>

                    <div class="d-flex align-items-center justify-content-between">

                        <div class="text-center w-100">

                            <img src="${match.home.logo}"
                                 width="45"
                                 height="45"
                                 style="object-fit:contain">

                            <div class="mt-2 fw-semibold">
                                ${match.home.name}
                            </div>

                        </div>

                        <div class="px-3 text-center">

                            <div class="fs-3 fw-bold">
                                ${match.goals.home ?? 0}
                                -
                                ${match.goals.away ?? 0}
                            </div>

                            <div class="${statusClass} fw-bold small">
                                ${statusText}
                            </div>

                        </div>

                        <div class="text-center w-100">

                            <img src="${match.away.logo}"
                                 width="45"
                                 height="45"
                                 style="object-fit:contain">

                            <div class="mt-2 fw-semibold">
                                ${match.away.name}
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            `;
        });

    } catch(error) {

        console.error(error);

        container.innerHTML = `
            <div class="text-danger text-center">
                Error cargando partidos
            </div>
        `;
    }
}

loadUEFAMatches();