const fetchPokemon = () => {
  const pokeNameInput = document.getElementById('pokeName');
  let pokeName = pokeNameInput.value.toLowerCase();

  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != '200') {
        console.log(res);
        pokeImage('./assets/images/pokemon-sad.gif');
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);

        const titlePokemon = document.createElement('div');
        titlePokemon.className = 'main-pokedex-container--title';
        // Nombre de pokemon e ID
        const pokemonName = document.createElement('h2');
        let identificador = `Name: ${data.name} - ID: ${data.id}`;
        pokemonName.innerText = identificador.toUpperCase();

        // Tipo de pokemon
        const pokemonType = document.createElement('h2');
        let type = data.types[0].type.name;
        pokemonType.innerText = `Type: ${type.toUpperCase()}`;

        titlePokemon.append(pokemonName, pokemonType);

        let mainTablesContainer = document.querySelector(
          '.main-tables-container'
        );
        const mainPokedexTable = document.createElement('div');
        mainPokedexTable.className = 'main-pokedex-table';
        const pokedexTableContainer = document.createElement('div');
        pokedexTableContainer.className = 'pokedex-table--container';
        const table = document.createElement('table');
        for (let i = 0; i < 3; i++) {
          const tr = document.createElement('tr');
          table.appendChild(tr);
          for (let j = 0; j < 2; j++) {
            const td = document.createElement('td');
            if (i == 0 && j == 0) {
              // Pokemon HP
              const hp = `HP: ${data.stats[0].base_stat}`;
              td.innerText = hp;
            } else if (i == 0 && j == 1) {
              // Attack power
              const attack = `Attack: ${data.stats[1].base_stat}`;
              td.innerText = attack;
            } else if (i == 1 && j == 0) {
              // Defense
              const defense = `Defense: ${data.stats[2].base_stat}`;
              td.innerText = defense;
            } else if (i == 1 && j == 1) {
              // Special Attack
              const specialAttack = `Special Attack: ${data.stats[3].base_stat}`;
              td.innerText = specialAttack;
            } else if (i == 2 && j == 0) {
              // Special Defense
              const specialDefense = `Special Defense: ${data.stats[4].base_stat}`;
              td.innerText = specialDefense;
            } else if (i == 2 && j == 1) {
              // Speed
              const speed = `Speed: ${data.stats[5].base_stat}`;
              td.innerText = speed;
            }
            tr.appendChild(td);
          }
        }
        mainTablesContainer.appendChild(titlePokemon);
        mainTablesContainer.appendChild(mainPokedexTable);
        mainPokedexTable.appendChild(pokedexTableContainer);
        pokedexTableContainer.appendChild(table);
        document.getElementById('clearPokemon').disabled = false;
        document.getElementById('searchPokemon').disabled = true;
      }
    });
};

const pokeImage = (url) => {
  const pokeImg = document.getElementById('pokeImg');
  if (url == null) {
    url = './assets/images/quienesesepokemon.jpg';
  }
  pokeImg.src = url;
};

const buttonClear = document.getElementById('clearPokemon');
buttonClear.addEventListener('click', deletePokemons);
// buttonClear.addEventListener('touchstart', deletePokemons); //* For mobile devices
const appNode = document.querySelector('.main-tables-container');

function deletePokemons() {
  pokeImage(null);

  let allPokemon = Array.from(appNode.childNodes);
  allPokemon.forEach((pokemon) => {
    pokemon.remove(pokemon);
  });
  document.getElementById('searchPokemon').disabled = false;
  document.getElementById('clearPokemon').disabled = true;
  document.getElementById('pokeName').value = '';
}
