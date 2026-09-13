import { isMongoConnected } from './db.js';

export const isJsonMode = () => !isMongoConnected();

export { JsonStore } from './jsonStore.js';