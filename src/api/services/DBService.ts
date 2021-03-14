import mongoose from 'mongoose';
import SocketService from './SocketService';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

class DBService {
  public db: any;
  public watching: boolean;

  constructor() {
    this.watching = false;
  }

  async connect() {
    const replSet = new MongoMemoryReplSet({
      replSet: { storageEngine: 'wiredTiger' },
    });
    await replSet.waitUntilRunning();
    const uri = await replSet.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.db = mongoose.connection.db;
    console.log('Connected to mongodb');
  }

  listCollections() {
    return this.db.listCollections().toArray();
  }

  watchCollection(collectionName: string) {
    if (!this.watching) {
      this.watching = true;
      const messageCollection = this.db.collection(collectionName);
      const changeStream = messageCollection.watch();
      changeStream.on('change', (change) => {
        const messageDocument = change.fullDocument;
        if (change.operationType === 'insert') {
          SocketService.emit('new-message', messageDocument);
        }
      });
    }
  }
}

export default new DBService();
