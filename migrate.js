const { MongoClient } = require('mongodb');

// Replace with your connection strings
const localUri = 'mongodb://127.0.0.1:27017';
const atlasUri = 'mongodb+srv://vyvenkateshyadav:venki@cluster0.qd0ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Replace with your DB name
const dbName = 'payslipdb';

async function migrateData() {
  const localClient = new MongoClient(localUri);
  const atlasClient = new MongoClient(atlasUri);

  try {
    await localClient.connect();
    await atlasClient.connect();

    const localDb = localClient.db(dbName);
    const atlasDb = atlasClient.db(dbName);

    const collections = await localDb.collections();

    for (const coll of collections) {
      const name = coll.collectionName;
      const data = await coll.find({}).toArray();
      if (data.length > 0) {
        console.log(`Migrating ${data.length} documents from ${name}...`);
        const atlasCollection = atlasDb.collection(name);
        await atlasCollection.insertMany(data);
      } else {
        console.log(`Skipping ${name}, no documents.`);
      }
    }

    console.log('✅ Migration complete.');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await localClient.close();
    await atlasClient.close();
  }
}

migrateData();
