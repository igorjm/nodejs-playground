const axios = require('axios')
const URL = 'http://swapi.co/api/people'

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)

    return response.data
}

obterPessoas('r2')
    .then((resultado) => {
        console.log(resultado)
    }).catch((error) => {
        console.error(error)
    })

module.exports = {
    obterPessoas
}