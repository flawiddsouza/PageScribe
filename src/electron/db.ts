import { app } from 'electron';
import path from 'path';
import SqliteDatabase from 'better-sqlite3';

const db = new SqliteDatabase(path.join(app.getPath('userData'), 'StoryScribe.db'));

export function migrate() {
  const { user_version: currentDatabaseVersion } = db.prepare('PRAGMA user_version').get() as { user_version: number };

  console.log('Migrate: Current database version:', currentDatabaseVersion);

  if (currentDatabaseVersion < 1) {
    const openTabs = `
      CREATE TABLE IF NOT EXISTS folder_config (
        folder_path TEXT PRIMARY KEY,
        open_tabs TEXT DEFAULT '[]',
        active_tab TEXT DEFAULT '',
        collapsed_folders TEXT DEFAULT '[]'
      )
    `;
    db.exec(openTabs);
    db.pragma('user_version = 1');

    console.log('Migrate: Database migrated to version 1');
  }
}

export function getOpenTabs(folderPath: string): { openTabs: string[], activeTab: string } {
  const openTabs = db.prepare('SELECT * FROM folder_config WHERE folder_path = ? LIMIT 1').get(folderPath) as { folder_path: string, open_tabs: string, active_tab: string };

  if (!openTabs) {
    return { openTabs: [], activeTab: '' };
  }

  return {
    openTabs: JSON.parse(openTabs.open_tabs),
    activeTab: openTabs.active_tab,
  };
}

export function saveOpenTabs(folderPath: string, openTabs: string[], activeTab: string) {
  console.log('saveOpenTabs', folderPath, openTabs, activeTab);
  db.prepare(`
    INSERT INTO folder_config (folder_path, open_tabs, active_tab)
    VALUES (?, ?, ?)
    ON CONFLICT(folder_path) DO UPDATE SET
      open_tabs = excluded.open_tabs,
      active_tab = excluded.active_tab
  `).run(folderPath, JSON.stringify(openTabs), activeTab);
}

export function getCollapsedFolders(folderPath: string): string[] {
  const collapsedFolders = db.prepare('SELECT collapsed_folders FROM folder_config WHERE folder_path = ? LIMIT 1').get(folderPath) as { collapsed_folders: string };

  if (!collapsedFolders) {
    return [];
  }

  return JSON.parse(collapsedFolders.collapsed_folders);
}

export function saveCollapsedFolders(folderPath: string, collapsedFolders: string[]) {
  db.prepare(`
    INSERT INTO folder_config (folder_path, collapsed_folders)
    VALUES (?, ?)
    ON CONFLICT(folder_path) DO UPDATE SET
      collapsed_folders = excluded.collapsed_folders
  `).run(folderPath, JSON.stringify(collapsedFolders));
}
