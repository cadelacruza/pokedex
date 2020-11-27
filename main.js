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

    let total = 0;
    for(let i = 0; i < 6; i++){
      total += pokemon.stats[i].base_stat;
    }

    document.querySelector("#totalNum").textContent = total;

  }


//Display pokemon Weight and Height and abilities
function changeWH(pokemon){
  const h = pokemon.height;
  const w = pokemon.weight;

  document.querySelector("#kg").textContent = `${w / 10} kg`;
  document.querySelector("#lbs").textContent = `${Math.round((((w/10) * 2.205)) * 10) / 10} lbs`;

  document.querySelector("#m").textContent = `${h / 10} m`;
  document.querySelector("#foot").textContent = `${Math.round((((h/10) * 3.28)) * 10) / 10} ft`;

  document.querySelector("#a1").textContent = pokemon.abilities[0].ability.name.toUpperCase();
  document.querySelector("#a2").textContent = pokemon.abilities.length === 1 ? "UNDEFINED" : pokemon.abilities[1].ability.name.toUpperCase();
}


//Display pokemon's sprites
function changeSprites(pokemon){
  document.querySelector("#uno").src = pokemon.sprites.back_default;
  document.querySelector("#dos").src = pokemon.sprites.front_default;
  document.querySelector("#tres").src = pokemon.sprites.back_shiny;
}

//Display master pane 
function displayMaster(){
  document.querySelector("#text").style.display = "none";
    const master = document.querySelector("#master-pane");
    const details = document.querySelector("#details-pane");
    console.log(details.style.display );
    if(details.style.display === "none"){
      details.style.display = "grid";
    }else{
      details.style.display = "none";

    }
    if(master.classList.contains("active")){
      master.classList.remove("active");
    }else{
      master.classList.add("active");
    }
}

//Display details pane aka poekemonInfo
function displayDetails(){
  const master = document.querySelector("#master-pane");
  const details = document.querySelector("#details-pane");

  master.classList.remove("active");
  details.style.display = "grid";
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

      document.querySelector("#text").style.display = "none";

      changeMain(pokemon);
      changeStats(pokemon);
      changeWH(pokemon);
      changeSprites(pokemon);

      document.querySelector("#details-pane").classList.add("active");
      document.querySelector(".mainInfo").classList.add("active");
      document.querySelector(".mainInfo").style.display = "block";
      document.querySelector(".something").classList.add("active");
      document.querySelector(".stats").style.display = "block";
      document.querySelector(".stats").classList.add("active");
  });

  window.addEventListener("load", async (e) =>{
    const pokemonName = window.location.hash.substring(2);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = await response.json();

    document.querySelector("#text").style.display = "none";
    changeMain(pokemon);
    changeStats(pokemon);
    changeWH(pokemon);
    changeSprites(pokemon);

    document.querySelector("#details-pane").classList.add("active");
    document.querySelector(".mainInfo").classList.add("active");
    document.querySelector(".mainInfo").style.display = "block";
    document.querySelector(".something").classList.add("active");
    document.querySelector(".stats").style.display = "block";
    document.querySelector(".stats").classList.add("active");
  })

  document.querySelector("#menuToggle").addEventListener("click", () => {
    displayMaster();
  });

  document.querySelector("#master-pane").addEventListener("click", (e) =>{
    console.log(e.target.tagName)
    if(e.target.classList.contains("pokemon") || e.target.tagName === "P" || e.target.tagName === "SPAN"){
      displayDetails();
    }
  })
  