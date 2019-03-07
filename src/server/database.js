import fs from 'fs';
import path from 'path';
import Datastore from 'nedb';
import chokidar from 'chokidar';
import { logger } from './logger';
import { blogStorePath } from './api/blog';

// TODO: clear only data for related store.
function initializeDatabaseStore(store, storePath) {
  logger.log('info', `Initializing store for: ${storePath}`);
  store.remove({}, { multi: true }, err => logger.logError(err, `Failed to clear db store: ${err}`));
  store.insert(JSON.parse(fs.readFileSync(storePath, 'utf8')), err => logger.logError(err, `Failed to populate db store: ${err}`));
}

export default function initializeDatabase() {
  const db = {};
  db.blog = new Datastore();
  initializeDatabaseStore(db.blog, blogStorePath);

  const fileWatcher = chokidar.watch('./content/**/*.json');
  fileWatcher.on('change', (file) => {
    const store = path.basename(file, '.json');
    if (store === 'blog') {
      logger.log('info', 'chokidar: blog.json modified');
      initializeDatabaseStore(db.blog, blogStorePath);
    }
  });

  return db;
}
