import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const ADMIN_PASSWORD = "kmnt";
const HELPER_PASSWORD = "kadm313";

export async function GET() {
  const { data, error } = await supabase.from('moukebs').select('*').order('column_number', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const formatted = data.map(m => ({
    column: m.column_number,
    names: m.names,
    country: m.country,
    note: m.note
  }));
  return NextResponse.json(formatted);
}

export async function POST(request: Request) {
  const newMoukeb = await request.json();

  const { data: existing, error: fetchError } = await supabase
    .from('moukebs')
    .select('*')
    .eq('column_number', newMoukeb.column)
    .single();

  if (existing) {
    const updatedNames = [...existing.names, ...newMoukeb.names];
    const { error: updateError } = await supabase
      .from('moukebs')
      .update({ names: updatedNames, country: newMoukeb.country || existing.country, note: newMoukeb.note || existing.note })
      .eq('column_number', newMoukeb.column);
      
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
  } else {
    const { error: insertError } = await supabase
      .from('moukebs')
      .insert({
        column_number: newMoukeb.column,
        names: newMoukeb.names,
        country: newMoukeb.country || '',
        note: newMoukeb.note || ''
      });
      
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('adminPassword');

  if (pass !== ADMIN_PASSWORD && pass !== HELPER_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const updatedMoukeb = await request.json();

  const { error } = await supabase
    .from('moukebs')
    .update({
      names: updatedMoukeb.names,
      country: updatedMoukeb.country || '',
      note: updatedMoukeb.note || ''
    })
    .eq('column_number', updatedMoukeb.column);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('adminPassword');
  
  if (pass !== ADMIN_PASSWORD && pass !== HELPER_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { column, name } = await request.json();

  if (name !== undefined) {
    // Delete specific name from column
    const { data: existing, error: fetchError } = await supabase
      .from('moukebs')
      .select('*')
      .eq('column_number', column)
      .single();

    if (existing) {
      const updatedNames = existing.names.filter((n: string) => n !== name);
      if (updatedNames.length === 0) {
        // Delete entire row if names empty
        await supabase.from('moukebs').delete().eq('column_number', column);
      } else {
        await supabase.from('moukebs').update({ names: updatedNames }).eq('column_number', column);
      }
    }
  } else {
    // Delete entire column
    await supabase.from('moukebs').delete().eq('column_number', column);
  }

  return NextResponse.json({ success: true });
}
