const container = document.querySelector("#master-pane");

//Get the data from the API to load more items when scrolling
async function getElements(offSet){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`);
    const data = await response.json();
    return data;
}

//Create html for new Pokemon item on master pane
function createMasterItem(pokemon, container, id){
    const article = document.createElement("article");
    article.innerHTML = `<p><span>${id}</span>${pokemon.name}</p>`;
    article.classList.add("pokemon");
    article.dataset.id = id;
    const parent =  document.querySelector("#master-pane");
    parent.appendChild(article);
  }
  
  //Load html of pokemons created
  async function loadMoreItems(offSet, container){
      //console.log("sup")
    const pokemons = await getElements(offSet);
    //console.log(pokemons.results[0]);
    let id = container.lastElementChild.dataset.id;
    //console.log(pokemons.results.length);
    for(let i = 0; i < pokemons.results.length; i++){
       id++;
       createMasterItem(pokemons.results[i], container, id);
    }
  }


//Detect when the scroll bar reaches the bottom of the master pane aka container
container.addEventListener('scroll', function() {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        const offSet = container.lastChild.datasets;
        loadMoreItems(offSet, container);
    }
  });
  