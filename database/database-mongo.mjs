import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://test_user:test%40123@myshop.qinquau.mongodb.net/?retryWrites=true&w=majority&appName=myshop';
const client = new MongoClient(uri, { useNewUrlParser: true });

export const mongoConnect = callBack => {
    client.connect().then(result => {
        console.log('Connected');
    }).catch(err => {
        console.log('error occured', err)
    });
}
