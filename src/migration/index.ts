import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { db } from '../dbconfig/db'

async function migrateData() {
    await migrate(db, { migrationsFolder: "./drizzle" });
    return;
}

migrateData().then(() => {
    console.log("migration ran successfully")
}).catch((error: any) => {
    console.log("migration error", error);
})