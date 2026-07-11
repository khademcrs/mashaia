import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const ADMIN_PASSWORD = "kmnt";
const HELPER_PASSWORD = "kadm313";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const includeArchived = url.searchParams.get('includeArchived') === 'true';

  const { data: reportsData, error: reportsError } = await supabase.from('reports').select('*').order('timestamp', { ascending: false });
  if (reportsError) return NextResponse.json({ error: reportsError.message }, { status: 500 });

  const reportsFormatted = reportsData.map(r => ({
    id: r.id,
    column: r.column_number,
    text: r.text,
    timestamp: r.timestamp
  }));

  if (includeArchived) {
    const { data: archivedData, error: archivedError } = await supabase.from('archived_reports').select('*').order('archived_at', { ascending: false });
    if (archivedError) return NextResponse.json({ error: archivedError.message }, { status: 500 });
    
    const archivedFormatted = archivedData.map(r => ({
      id: r.id,
      column: r.column_number,
      text: r.text,
      timestamp: r.timestamp,
      archivedAt: r.archived_at,
      status: r.status
    }));
    return NextResponse.json({ active: reportsFormatted, archived: archivedFormatted });
  }

  return NextResponse.json(reportsFormatted);
}

export async function POST(request: Request) {
  const newReport = await request.json();
  const id = Date.now().toString();

  const { error } = await supabase.from('reports').insert({
    id,
    column_number: newReport.column,
    text: newReport.text,
    timestamp: new Date().toISOString()
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('adminPassword');
  
  if (pass !== ADMIN_PASSWORD && pass !== HELPER_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, action } = await request.json();

  // Find the report
  const { data: record, error: findError } = await supabase.from('reports').select('*').eq('id', id).single();
  
  if (record) {
    // Move to archived
    await supabase.from('archived_reports').insert({
      id: record.id,
      column_number: record.column_number,
      text: record.text,
      timestamp: record.timestamp,
      archived_at: new Date().toISOString(),
      status: action === 'approve' ? 'approved' : 'ignored'
    });

    // Delete from reports
    await supabase.from('reports').delete().eq('id', id);
  }

  return NextResponse.json({ success: true });
}
