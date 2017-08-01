class DataStore {

  constructor() {
    this.collections = new Map();
    this.subscribers = new Map();
  }

  get(collectionName) {
    return this.collections.get(collectionName);
  }

  set(collectionName, collection) {
    this.collections.set(collectionName, collection);
    // notify subscribers
    if (this.subscribers.has(collectionName)) {
      const subscribers = this.subscribers.get(collectionName);
      for (const subscriber of subscribers) {
        subscriber(collection);
      }
    }
  }

  register(collectionName, element) {
    // create collection if it doesn't yet exist
    if (!this.collections.has(collectionName)) {
      this.collections.set(collectionName, []);
    }
    // add new element to collection
    const collection = this.collections.get(collectionName);
    collection.push(element);
    // notify subscribers
    if (this.subscribers.has(collectionName)) {
      const subscribers = this.subscribers.get(collectionName);
      for (const subscriber of subscribers) {
        subscriber(element, collection);
      }
    }
  }

  subscribeTo(collectionName, callback) {
    // create subscriber collection if it doesn't yet exist
    if (!this.subscribers.has(collectionName)) {
      this.subscribers.set(collectionName, []);
    }
    // add new callback to list of subscribers
    const subscribers = this.subscribers.get(collectionName);
    subscribers.push(callback);
    // notify subscriber about existing collection entries
    if (this.collections.has(collectionName)) {
      const collection = this.collections.get(collectionName);
      for (const entry of collection) {
        callback(entry, collection);
      }
    }
  }

}

// set up store
// export const Store = new DataStore();
