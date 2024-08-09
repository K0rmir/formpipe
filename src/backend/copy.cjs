const fs = require('fs');

fs.copyFile('src/backend/db-source.json', 'src/backend/db.json', (err) => {
  if (err) throw err;
  console.log('db.json was copied to db-live.json');
});
