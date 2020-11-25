const container = document.querySelector("#master-pane");
const p = document.querySelector("#text");

//Get the data from the API to load more items when scrolling
async function getElements(offSet){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`);
    const data = await response.json();
    return data;
}

//Create html for new Pokemon item on master pane
function createMasterItem(pokemon, container, id){
    const anchor = document.createElement("a");
    anchor.innerHTML = `<p><span>${id}</span>${pokemon.name.toUpperCase()}</p>`;
    anchor.classList.add("pokemon");
    anchor.dataset.id = id;
    anchor.href = `#/${pokemon.name}`;
    const parent =  document.querySelector("#master-pane");
    parent.appendChild(anchor);
  }
  
  //Load html of pokemons created
  async function loadMoreItems(offSet, container){
    const pokemons = await getElements(offSet);
    let id = container.lastElementChild.dataset.id;
    for(let i = 0; i < pokemons.results.length; i++){
       id++;
       createMasterItem(pokemons.results[i], container, id);
    }
  }

  //Display pokemon main Info
  function changeMain(pokemon){
    const img = document.querySelector("#pokemonImage");
    img.src = pokemon.sprites.other["official-artwork"].front_default;

    const element = document.querySelector("#element");
    element.textContent = pokemon.types[0].type.name.toUpperCase();
 

    const skill = document.querySelector("#skill");
    skill.textContent = pokemon.types.length === 1 ? "UNDEFINED" : pokemon.types[1].type.name.toUpperCase() ;

    const name = document.querySelector("#pokemonName");
    name.textContent = pokemon.name.toUpperCase();

    const num = document.querySelector("#pokemonNum");
    num.textContent = pokemon.id;
    
  }

  //Display pokemon stats
  function changeStats(pokemon){
    const name = document.querySelector("#statName");
    name.textContent = `${pokemon.name.toUpperCase()}'S`;

    document.querySelector("#hp").style.width = `${pokemon.stats[0].base_stat}%`;
    document.querySelector("#hpNum").textContent = pokemon.stats[0].base_stat;

    document.querySelector("#attack").style.width = `${pokemon.stats[1].base_stat}%`;
    document.querySelector("#attackNum").textContent = pokemon.stats[1].base_stat;

    document.querySelector("#defense").style.width = `${pokemon.stats[2].base_stat}%`;
    document.querySelector("#defenseNum").textContent = pokemon.stats[2].base_stat;

    document.querySelector("#special-attack").style.width = `${pokemon.stats[3].base_stat}%`;
    document.querySelector("#speacialAttackNum").textContent = pokemon.stats[3].base_stat;

    document.querySelector("#special-deffense").style.width = `${pokemon.stats[4].base_stat}%`;
    document.querySelector("#specialDefenseNum").textContent = pokemon.stats[4].base_stat;

    document.querySelector("#speed").style.width = `${pokemon.stats[5].base_stat}%`;
    document.querySelector("#speedNum").textContent = pokemon.stats[5].base_stat;


  }




//Detect when the scroll bar reaches the bottom of the master pane aka container
container.addEventListener('scroll', function() {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        const offSet = container.lastElementChild.dataset.id;
        loadMoreItems(offSet, container);
    }
  });

//Check for when details for a pokemon are requested
  window.addEventListener("hashchange", async () =>{
      const pokemonName = window.location.hash.substring(2);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemon = await response.json();
      changeMain(pokemon);
      changeStats(pokemon);
      changeWH(pokemon);
      changeSprites(pokemon);
  });

  