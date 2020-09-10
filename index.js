const MongoDb = require('mongodb').MongoClient;
const assert = require('assert');
const { MongoClient } = require('mongodb');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('Connected to the server');

    const db = client.db(dbname);
    dboper.insertDocument(db,{name:"Vadonut",description:"Test"},'dishes',(result)=>{
        console.log('Insert Document :\n',result.ops);

        dboper.findDocument(db,'dishes', (docs)=>{
            console.log('Found Document:\n', docs);

            dboper.updateDocuments(db,{name:"Vadonut"},{description:"Updated Test"},'dishes', (result)=>{
                console.log('Updated Document:\n', result.result);

                dboper.findDocument(db,'dishes', (docs)=>{
                    console.log('Found Updated Document:\n', docs);

                    db.dropCollection('dishes',(result)=>{
                        console.log('Droped collection : ',result);
                        client.close();
                    });

            });
        });
    });
});
});