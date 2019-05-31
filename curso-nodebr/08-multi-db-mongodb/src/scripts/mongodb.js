// docker ps
// docker exec -it /*id docker mongo */ mongo -u igorjm -p node123 --authenticationDatabase herois

// databases
// show dbs;

// mudando o xontexto para uma database
// use herois;

// mostrar tables (collections)
// show collections;

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find.pretify()

for(let i=0; i<= 10000; i ++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-10-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

//Create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//Read
db.herois.find()

//Update
db.herois.update({_id: ObjectId('id')}, {nome: 'Superman'})
db.herois.update({_id: ObjectId('id')}, {$set: {nome: 'Batman'}})

//delete
db.herois.remove({nome: 'Batman'})