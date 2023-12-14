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
export const postDb = async (content) => {
  console.log('Post to the database');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ todo: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const getOneDb = async (id) => {
  console.log('GET from the database');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

initdb();
