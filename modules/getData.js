export async function getElemenst(offSet){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=20`);
    const data = response.json();
    return data;
}