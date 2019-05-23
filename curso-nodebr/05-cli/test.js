const {
    deepEqual
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = { 
    nome: "Flash",
    poder: "Speed",
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Lanterna Verde",
    poder: "Energia do anel",
    id: 2
}

describe('Suit de manipulação de Herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar heroi', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [result] = await database.listar(expected.id)

        deepEqual(result, expected)
    })

    it('deve cadastrar um heroi', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const result = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    })

    it('deve remover um heroi por id', async () => {
        const expected = true
        const result = await database.remove(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(result, expected)
    })

    it('deve atualizar um heroi por id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const result = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        
        deepEqual(result, expected)
    })
})