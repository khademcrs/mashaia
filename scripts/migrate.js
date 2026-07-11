const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://pwqjvnafzafojjppfrvx.supabase.co';
const supabaseKey = 'sb_publishable_2v5nWYAu5Ye-NKxQ3SbgdQ_EDdGPhli';
const supabase = createClient(supabaseUrl, supabaseKey);

const dataDir = path.join(__dirname, '../data');

async function migrate() {
  console.log("Starting migration...");

  try {
    // 1. moukebs
    if (fs.existsSync(path.join(dataDir, 'moukebs.json'))) {
      const moukebs = JSON.parse(fs.readFileSync(path.join(dataDir, 'moukebs.json'), 'utf8'));
      if (moukebs.length > 0) {
        // Map to DB columns
        const rows = moukebs.map(m => ({
          column_number: m.column,
          names: m.names,
          country: m.country || '',
          note: m.note || ''
        }));
        const { error } = await supabase.from('moukebs').insert(rows);
        if (error) console.error("Error migrating moukebs:", error);
        else console.log("Migrated moukebs successfully.");
      }
    }

    // 2. pending_moukebs
    if (fs.existsSync(path.join(dataDir, 'pending_moukebs.json'))) {
      const pending = JSON.parse(fs.readFileSync(path.join(dataDir, 'pending_moukebs.json'), 'utf8'));
      if (pending.length > 0) {
        const rows = pending.map(m => ({
          id: m.id,
          column_number: m.column,
          names: m.names,
          country: m.country || '',
          note: m.note || '',
          created_at: m.createdAt || new Date().toISOString()
        }));
        const { error } = await supabase.from('pending_moukebs').insert(rows);
        if (error) console.error("Error migrating pending_moukebs:", error);
        else console.log("Migrated pending_moukebs successfully.");
      }
    }

    // 3. archived_pending
    if (fs.existsSync(path.join(dataDir, 'archived_pending.json'))) {
      const archived = JSON.parse(fs.readFileSync(path.join(dataDir, 'archived_pending.json'), 'utf8'));
      if (archived.length > 0) {
        const rows = archived.map(m => ({
          id: m.id,
          column_number: m.column,
          names: m.names,
          country: m.country || '',
          note: m.note || '',
          created_at: m.createdAt || new Date().toISOString(),
          archived_at: m.archivedAt || new Date().toISOString(),
          status: m.status || 'approved'
        }));
        const { error } = await supabase.from('archived_pending').insert(rows);
        if (error) console.error("Error migrating archived_pending:", error);
        else console.log("Migrated archived_pending successfully.");
      }
    }

    // 4. reports
    if (fs.existsSync(path.join(dataDir, 'reports.json'))) {
      const reports = JSON.parse(fs.readFileSync(path.join(dataDir, 'reports.json'), 'utf8'));
      if (reports.length > 0) {
        const rows = reports.map(r => ({
          id: r.id,
          column_number: r.column,
          text: r.text,
          timestamp: r.timestamp || new Date().toISOString()
        }));
        const { error } = await supabase.from('reports').insert(rows);
        if (error) console.error("Error migrating reports:", error);
        else console.log("Migrated reports successfully.");
      }
    }

    // 5. archived_reports
    if (fs.existsSync(path.join(dataDir, 'archived_reports.json'))) {
      const archivedRep = JSON.parse(fs.readFileSync(path.join(dataDir, 'archived_reports.json'), 'utf8'));
      if (archivedRep.length > 0) {
        const rows = archivedRep.map(r => ({
          id: r.id,
          column_number: r.column,
          text: r.text,
          timestamp: r.timestamp || new Date().toISOString(),
          archived_at: r.archivedAt || new Date().toISOString(),
          status: r.status || 'ignored'
        }));
        const { error } = await supabase.from('archived_reports').insert(rows);
        if (error) console.error("Error migrating archived_reports:", error);
        else console.log("Migrated archived_reports successfully.");
      }
    }

    // 6. services
    if (fs.existsSync(path.join(dataDir, 'services.json'))) {
      const services = JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json'), 'utf8'));
      if (services.length > 0) {
        const { error } = await supabase.from('app_data').insert([{ key: 'services', data: services }]);
        if (error) console.error("Error migrating services:", error);
        else console.log("Migrated services successfully.");
      }
    }

    console.log("Migration complete.");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate();
