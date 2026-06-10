const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const presentationsDir = path.join(__dirname, 'presentations');

function generateId() {
  const bytes = new Uint8Array(32);
  require('crypto').webcrypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function runWranglerSql(sql) {
  const tempFile = path.join(__dirname, 'temp_seed.sql');
  fs.writeFileSync(tempFile, sql);
  try {
    execSync(`npx wrangler d1 execute rae-slides --remote --file temp_seed.sql`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to execute SQL');
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
}

async function seed() {
  console.log('Seeding deck_versions from git history...');
  
  let sqlBatch = `CREATE TABLE IF NOT EXISTS deck_versions (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    user_id TEXT,
    markdown TEXT NOT NULL,
    created_at TEXT NOT NULL,
    version_name TEXT,
    FOREIGN KEY (slug) REFERENCES decks(slug) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );\n`;

  const files = fs.readdirSync(presentationsDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const slug = file.replace('.md', '');
    console.log(`\nProcessing ${slug}...`);
    
    // Get git history for the file
    let gitLogOutput;
    try {
      gitLogOutput = execSync(`git log --pretty=format:"%h|%aI|%s" presentations/${file}`).toString().trim();
    } catch (e) {
      console.log(`No git history for ${file}`);
      continue;
    }
    
    if (!gitLogOutput) {
      console.log(`No git history for ${file}`);
      continue;
    }

    const commits = gitLogOutput.split('\n');
    
    sqlBatch += `INSERT OR IGNORE INTO decks (slug, markdown, updated_at) VALUES ('${slug}', '', '');\n`;
    sqlBatch += `DELETE FROM deck_versions WHERE slug = '${slug}' AND user_id IS NULL;\n`;

    for (const commit of commits) {
      const [hash, dateIso, message] = commit.split('|');
      console.log(`  - Found version: ${hash} at ${dateIso} - ${message}`);
      
      let markdown;
      try {
        markdown = execSync(`git show ${hash}:presentations/${file}`).toString();
      } catch (e) {
        console.log(`    Failed to retrieve markdown for ${hash}`);
        continue;
      }
      
      const versionId = generateId();
      const escapedMarkdown = markdown.replace(/'/g, "''"); // Escape single quotes for SQL
      const escapedMessage = message.replace(/'/g, "''");
      
      sqlBatch += `INSERT INTO deck_versions (id, slug, user_id, markdown, created_at, version_name) VALUES ('${versionId}', '${slug}', NULL, '${escapedMarkdown}', '${dateIso}', '${escapedMessage}');\n`;
    }
  }
  
  runWranglerSql(sqlBatch);
  console.log('\nSeeding complete.');
}

seed().catch(console.error);
