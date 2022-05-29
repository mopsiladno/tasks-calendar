import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from "$lib/variables";

/**
 * Приложение Firebase.
 */
const app = initializeApp(firebaseConfig);

/**
 * База данных.
 */
const db = getDatabase(app);

export default db;
