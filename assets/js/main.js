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
        let pokeImg = data.sprites.other.dream_world.front_default;
        let pokeName = data.name;
        let pokeId = data.id;
        let pokeWeight = data.weight;
        let pokeHeight = data.height;
        const { types, stats, moves } = data;
        pokeImage(pokeImg);
        pokeIdentifider(`#${pokeId}`);
        pokeTitle(`Nombre: ${pokeName}`);
        pokeTypes(types);
        pokeStats(stats);
        pokeSizeWeight(pokeWeight);
        pokeSizeHeight(pokeHeight);
        pokeMoves(moves.sort((a, b) => 0.5 - Math.random()).slice(0, 4));
    });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById('pokeImg');
    pokeImg.src = url;
}

const pokeIdentifider = (id) => {
    const pokeId = document.getElementById('pokeId');
    pokeId.style.textTransform = 'capitalize';
    pokeId.innerHTML = id;
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
    pokeTypes.innerHTML = " ";
    types.forEach(type => {
        const typeTextElement = document.createElement("span");
        const lineBreak = document.createElement("br");
        typeTextElement.style.textTransform = 'capitalize';
        typeTextElement.textContent = typeTraslate[type.type.name];
        pokeTypes.appendChild(typeTextElement);
        pokeTypes.appendChild(lineBreak);
        pokeTypes.replaceChild(typeTextElement, typeTextElement);
        pokeTypes.replaceChild(lineBreak, lineBreak);
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
    pokeStats.innerHTML = " ";
    stats.forEach(stat => {
        const statElementName = document.createElement("span");
        const statElementAmount = document.createElement("span");
        const lineBreak = document.createElement("br");
        statElementName.style.textTransform = 'capitalize';
        statElementName.style.fontWeight = 'bold';
        statElementName.textContent = statsTraslate[stat.stat.name] + ": ";
        statElementAmount.textContent = stat.base_stat;
        pokeStats.appendChild(statElementName);
        pokeStats.appendChild(statElementAmount);
        pokeStats.appendChild(lineBreak);
        pokeStats.replaceChild(statElementName, statElementName);
        pokeStats.replaceChild(statElementAmount, statElementAmount);
    });
}

const pokeMoves = (moves) => {
    const pokeMoves = document.getElementById('pokeMoves');
    pokeMoves.innerHTML = " ";
    moves.forEach(move => {
        const moveElement = document.createElement("span");
        const lineBreak = document.createElement("br");
        moveElement.style.textTransform = 'capitalize';
        moveElement.textContent = move.move.name;
        pokeMoves.appendChild(moveElement);
        pokeMoves.appendChild(lineBreak);
        pokeMoves.replaceChild(moveElement, moveElement);
    });
}

const pokeSizeWeight = (weight) => {
    const pokeWeight = document.getElementById('pokeWeight');
    pokeWeight.innerHTML = weight;
}

const pokeSizeHeight = (height) => {
    const pokeHeight = document.getElementById('pokeHeight');
    pokeHeight.innerHTML = height;
}
