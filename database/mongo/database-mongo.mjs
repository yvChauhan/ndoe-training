import mongoDb from 'mongodb';

const { MongoClient } = mongoDb;

let _mongoDb;

export const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://test_user:test%40123@myshop.qinquau.mongodb.net/?retryWrites=true&w=majority&appName=myshop', { useUnifiedTopology: true })
    .then(client => {
      console.log('connected to myShop');
      _mongoDb = client.db();
      callback(_mongoDb);
    })
    .catch(err => {
      console.error(err);
    });
};

export const getDb = () => {
  if (_mongoDb) {
    return _mongoDb;
  }
  throw 'No database found!';
};

