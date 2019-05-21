const assert = require('assert')
const { getPeople } = require('./service')
const nock = require('nock')

describe('Star Wars Tests', () => {
    this.beforeAll(() => {
        const response = {

        }
        nock('https://swapi.co/api/people')
        .get('/?search=r2-d2&format=json')
        .reply(200, response)
    })
    
    it('search for r2d2 with rigth format', async () => {
        const expected = [{ name: 'R2-D2', height: '96' }]
        const baseName = `r2-d2`
        const result = await getPeople(baseName)
        assert.deepEqual(result, expected)
    })
})