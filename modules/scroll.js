function createMasterItem(pokemon){
  const article = document.createElement("article");
  article.innerHTML = `<p><span>${pokemon.id}</span>${pokemon.name}</p>`;
  article.classList.add("pokemon");
  container.appendChild(article);
}

async function loadMoreItems(offSet, container){
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    const pokemons = await getElements(offSet);
    pokemons.forEach(pokemon => {
      createMasterItem(pokemon);
    })
}
}
