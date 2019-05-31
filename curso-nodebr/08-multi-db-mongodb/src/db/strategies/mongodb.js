const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    defineModel() {
        heroiSchema = new Mongoose.Schema({
            nome: {
               type: String,
               required: true
            },
            poder: {
               type: String,
               required: true
            },
            insertedAt: {
               type: Date,
               default: new Date()
            }
        })
        this._herois = Mongoose.model('herois', heroiSchema)
    }

    connect() {
        Mongoose.connect('mongodb://igorjm:node123@localhost:27017/herois', {useNewUrlParser: true}, function(error) {
            if(!error) return
            console.log('Falha na conexao', error)
        })
        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('connected'))
    }

    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        })
        console.log('resultCadastrar', resultCadastrar)
    }
}

module.exports = MongoDB