import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
//Opens database with a read/write transaction on the jate object
//content is added to the object store using add method
//wait for completion 
//console log results added to db
  export const putDb = async (content) => {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.add(content);
    await tx.done;
    console.log('Contents added:', result);
  };
  
  // Add logic for a method that gets all the content from the database/
// pulling from db store , we are pulling jate from the object store 
  export const getDb = async () => {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();
    await tx.done;
    console.log('Retrieved contents:', result);
    return result;
  };
initdb();
