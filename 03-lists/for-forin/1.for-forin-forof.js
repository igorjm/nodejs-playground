const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoas('a')
        const names = []

        //FOR
        console.time('for')
        for(let i = 0; i <= result.results.length; i++) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('for')

        //FOR-IN
        console.time('forin')
        for(let i in result.results) {
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('forin')

        //FOR-OF
        console.time('forof')
        for(pessoa of result.results) {
            names.push(pessoa.name)
        }
        console.timeEnd('forof')
        
    } catch (error) {
        console.log(error)
    }
}

main()