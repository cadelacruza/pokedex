const container = document.querySelector("#master-pane");




function createMasterItem(pokemon, container){
    const article = document.createElement("article");
    article.innerHTML = `<p><span>${pokemon.id}</span>${pokemon.name}</p>`;
    article.classList.add("pokemon");
    container.appendChild(article);
  }
  
  async function loadMoreItems(offSet, container){
    const pokemons = await getElements(offSet);
    pokemons.forEach(pokemon => createMasterItem(pokemon, container));
  }


container.addEventListener('scroll', function() {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      console.log("sup")
    }
  });
  