import { app } from 'electron';
import path from 'path';
import SqliteDatabase from 'better-sqlite3';

const db = new SqliteDatabase(path.join(app.getPath('userData'), 'StoryScribe.db'));

export function migrate() {
  const { user_version: currentDatabaseVersion } = db.prepare('PRAGMA user_version').get() as { user_version: number };

  console.log('Migrate: Current database version:', currentDatabaseVersion);

  if (currentDatabaseVersion < 1) {
    const openTabs = `
      CREATE TABLE IF NOT EXISTS open_tabs (
        folder_path TEXT PRIMARY KEY,
        open_tabs TEXT,
        active_tab TEXT
      )
    `;
    db.exec(openTabs);
    db.pragma('user_version = 1');

    console.log('Migrate: Database migrated to version 1');
  }
}

export function getOpenTabs(folderPath: string): { openTabs: string[], activeTab: string } {
  const openTabs = db.prepare('SELECT * FROM open_tabs WHERE folder_path = ? LIMIT 1').get(folderPath) as { folder_path: string, open_tabs: string, active_tab: string };

  if (!openTabs) {
    return { openTabs: [], activeTab: '' };
  }

  return {
    openTabs: JSON.parse(openTabs.open_tabs),
    activeTab: openTabs.active_tab,
  };
}

export function saveOpenTabs(folderPath: string, openTabs: string[], activeTab: string) {
  db.prepare('INSERT OR REPLACE INTO open_tabs (folder_path, open_tabs, active_tab) VALUES (?, ?, ?)').run(folderPath, JSON.stringify(openTabs), activeTab);
}
