const assert = require('assert')
const api = require('./../api')

let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Thor',
    poder: 'Trovão'
}

describe('Suite de testes da API Heroes', function() {
    this.beforeAll(async() => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar /herois?skip=0&limit=3', async() => {
        const TAMANHO_LIMIT = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })

    it('listar /herois?skip=0&limit=3', async() => {
        const TAMANHO_LIMIT = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        assert.deepEqual(result.payload, "Erro interno")
    })

    it('listar GET - /herois?nome=nome&skip=0&limit=10', async() => {
        const TAMANHO_LIMIT = 10
        const NOME = 'Homem-Aranha'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?nome=${NOME}&skip=0&limit=${TAMANHO_LIMIT}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome === NOME)
    })
    it('cadastrar POST - /herois', async() => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })
        const statusCode = result.statusCode
        const {message, _id} = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })
})