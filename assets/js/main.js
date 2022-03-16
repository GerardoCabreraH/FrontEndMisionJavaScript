const fetchPokemon = () => {
    const pokeName = document.getElementById('pokeName');
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != 200) {
            console.log(res);
            pokeImage('assets/img/pokeball-open.png');
            pokeTitle('No se encontro ningun pokemon');
        }
        else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        let pokeName = data.name;
        let pokeId = data.id;
        const { stats, types, moves } = data;
        console.log(pokeImg);
        pokeImage(pokeImg);
        pokeTitle(`ID: ${pokeId} Nombre: ${pokeName}`);
        pokeTypes(types);
        pokeStats(stats);
        pokeMoves(moves.sort((a, b) => 0.5 - Math.random()).slice(0, 4));
    });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}

const pokeTitle = (name) => {
    const pokeTitle = document.getElementById('pokeTitle');
    pokeTitle.style.textTransform = 'capitalize';
    pokeTitle.innerHTML = name;
}

const typeTraslate = {
    electric: 'eléctrico',
    normal: 'normal',
    fire: 'fuego',
    water: 'agua',
    ice: 'hielo',
    rock: 'roca',
    flying: 'volador',
    grass: 'planta',
    psychic: 'psíquico',
    ghost: 'fantasma',
    bug: 'insecto',
    poison: 'veneno',
    ground: 'tierra',
    dragon: 'dragón',
    steel: 'acero',
    fighting: 'lucha',
    default: 'común',
};

const pokeTypes = (types) => {
    const pokeTypes = document.getElementById('pokeType');
    const typeTextTitle = document.createElement("h2");
    typeTextTitle.textContent = "Tipo de pokemon";
    pokeTypes.appendChild(typeTextTitle);
    types.forEach(type => {
        const typeTextElement = document.createElement("p");
        typeTextElement.style.textTransform = 'capitalize';
        typeTextElement.textContent = typeTraslate[type.type.name];
        pokeTypes.appendChild(typeTextElement);
    });
}

const statsTraslate = {
    "hp": 'hp',
    "attack": 'ataque',
    "defense": 'defensa',
    "special-attack": 'ataque especial',
    "special-defense": 'defensa especial',
    "speed": 'velocidad',
};

const pokeStats = (stats) => {
    const pokeStats = document.getElementById('pokeStats');
    const typeTextTitle = document.createElement("h2");
    typeTextTitle.textContent = "Estadisticas";
    pokeStats.appendChild(typeTextTitle);
    stats.forEach(stat => {
        const statElement = document.createElement("p");
        const statElementName = document.createElement("span");
        const statElementAmount = document.createElement("span");
        statElementName.style.textTransform = 'capitalize';
        statElementName.style.fontWeight = 'bold';
        statElementName.textContent = statsTraslate[stat.stat.name] + ": ";
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const pokeMoves = (moves) => {
    const pokeMoves = document.getElementById('pokeMoves');
    const movesTextTitle = document.createElement("h2");
    movesTextTitle.textContent = "Movimientos";
    pokeMoves.appendChild(movesTextTitle);
    moves.forEach(move => {
        const moveElement = document.createElement("p");
        moveElement.style.textTransform = 'capitalize';
        moveElement.textContent = move.move.name;
        pokeMoves.appendChild(moveElement);
    });
}
