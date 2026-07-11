import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const ADMIN_PASSWORD = "kmnt";

export async function GET() {
  const { data, error } = await supabase.from('app_data').select('data').eq('key', 'services').single();
  if (error || !data) return NextResponse.json([]);
  return NextResponse.json(data.data);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('adminPassword');
  
  if (pass !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { service } = await request.json();
  
  const { data, error } = await supabase.from('app_data').select('data').eq('key', 'services').single();
  let services = data ? data.data : [];
  
  if (!services.includes(service)) {
    services.push(service);
    const { error: updateError } = await supabase.from('app_data').upsert({ key: 'services', data: services });
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, services });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('adminPassword');
  
  if (pass !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { service } = await request.json();
  
  const { data, error } = await supabase.from('app_data').select('data').eq('key', 'services').single();
  let services = data ? data.data : [];
  
  services = services.filter((s: string) => s !== service);
  
  const { error: updateError } = await supabase.from('app_data').upsert({ key: 'services', data: services });
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ success: true, services });
}
