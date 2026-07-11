import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const ADMIN_PASSWORD = "kmnt";
const HELPER_PASSWORD = "kadm313";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const includeArchived = url.searchParams.get('includeArchived') === 'true';

  const { data: pendingData, error: pendingError } = await supabase.from('pending_moukebs').select('*').order('created_at', { ascending: false });
  if (pendingError) return NextResponse.json({ error: pendingError.message }, { status: 500 });

  const pendingFormatted = pendingData.map(m => ({
    id: m.id,
    column: m.column_number,
    names: m.names,
    country: m.country,
    note: m.note,
    createdAt: m.created_at
  }));

  if (includeArchived) {
    const { data: archivedData, error: archivedError } = await supabase.from('archived_pending').select('*').order('archived_at', { ascending: false });
    if (archivedError) return NextResponse.json({ error: archivedError.message }, { status: 500 });
    
    const archivedFormatted = archivedData.map(m => ({
      id: m.id,
      column: m.column_number,
      names: m.names,
      country: m.country,
      note: m.note,
      createdAt: m.created_at,
      archivedAt: m.archived_at,
      status: m.status
    }));
    return NextResponse.json({ active: pendingFormatted, archived: archivedFormatted });
  }

  return NextResponse.json(pendingFormatted);
}

export async function POST(request: Request) {
  const newPending = await request.json();
  const id = Date.now().toString();

  const { error } = await supabase.from('pending_moukebs').insert({
    id,
    column_number: newPending.column,
    names: newPending.names,
    country: newPending.country || '',
    note: newPending.note || '',
    created_at: new Date().toISOString()
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

  // Find the pending record
  const { data: record, error: findError } = await supabase.from('pending_moukebs').select('*').eq('id', id).single();
  
  if (record) {
    // Move to archived
    await supabase.from('archived_pending').insert({
      id: record.id,
      column_number: record.column_number,
      names: record.names,
      country: record.country || '',
      note: record.note || '',
      created_at: record.created_at,
      archived_at: new Date().toISOString(),
      status: action === 'approve' ? 'approved' : 'rejected'
    });

    // Delete from pending
    await supabase.from('pending_moukebs').delete().eq('id', id);
  }

  return NextResponse.json({ success: true });
}
