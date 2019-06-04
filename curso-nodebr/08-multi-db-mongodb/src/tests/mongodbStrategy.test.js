const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDb())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Batman',
    poder: 'Dinheiro'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem-Aranha-${Date.now()}`,
    poder: 'Sensor Aranhar'
}

describe('MongoDB Suite de testes', function() {
    this.beforeAll(async() => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome,poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        //const result = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })
})