const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Igor'
            })
        }, 1000);
    })
}

function obterTelefone(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone: '99939584',
                ddd: '48'
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua das Gaivotas',
            numero: '428'
        })
    }, 2000);
}

main()
async function main() {
    try {
        console.time('medida-promise')
        
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.numero}, ${endereco.rua}
        `)

        console.timeEnd('medida-promise')
    } catch (error) {
        console.log(error)
    }
}

// obterUsuario(function resolverUsuario(error, usuario) {
//     console.log('usuario', usuario)
//     if(error) {
//         console.log('Erro em usuario', error)
//         return
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error) {
//             console.log('Erro em telefone', error1)
//             return
//         }

//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error) {
//                 console.log('Erro em endereco', error2)
//                 return
//             }

//             console.log(
//                 `
//                     Nome: ${usuario.nome},
//                     Enredeço: ${endereco.rua}, ${endereco.numero},
//                     Telefone: (${telefone.ddd})${telefone.telefone}
//                 `
//             )
//         })
//     })
// })