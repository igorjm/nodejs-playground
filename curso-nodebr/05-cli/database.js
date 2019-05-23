const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivos()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        const heroiComId = {
            id,
            ...heroi
        }
        const dadosFinal = [
            ...dados,
            heroiComId
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivos()
        const dadosFiltrados = dados.filter(item  => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async remove(id) {
        if(!id) {
            return await this.escreverArquivo([])
        }
        const data = await this.obterDadosArquivos()
        const index = await data.findIndex(item => item.id === parseInt(id))
        if(index === -1) {
            throw Error('O usuario informado nao existe')
        }
        data.splice(index, 1)
        return await this.escreverArquivo(data)
    }

    async atualizar(id, modificacoes) {
        const data = await this.obterDadosArquivos()
        const index = data.findIndex(item => item.id === parseInt(id))

        if(index === -1) {
            throw Error('Heroi informado nao existe')
        }

        const atual = data[index]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        data.splice(index, 1)

        return await this.escreverArquivo([
            ...data,
            objetoAtualizar
        ])
    }
}

module.exports = new Database()