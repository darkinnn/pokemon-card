


document.addEventListener('DOMContentLoaded', () => {
    const random = getRandom(1,200)
    fetchData(random)
})

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min)
}

const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()

        console.log(data)

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            type: data.types[0].type.name,
            type2: '',
            atk: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            s_atk: data.stats[3].base_stat
        }

        if(data.types.includes(data.types[1])) {
            pokemon.type2 = data.types[1].type.name
        }


        printCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const printCard = pokemon => {
    const flex = document.querySelector('.flex')
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp </span>`
    clone.querySelector('.card-body-text').textContent = pokemon.type
    if(pokemon.type2 !== '') {
        clone.querySelector('.card-body-text').textContent = pokemon.type + ' / ' + pokemon.type2
    }
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.atk
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.def
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.s_atk

    fragment.appendChild(clone)
    flex.appendChild(fragment)

}

