import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const ADMIN_PASSWORD = "kmnt";

const defaultServices = {
  "خدمات أساسية": ["مبيت", "ضيافة وطعام", "دورات مياه"],
  "دعم وطوارئ": ["مفرزة طبية", "علاج طبيعي", "مركز المفقودين", "استفتاءات شرعية"],
  "خدمات تقنية وغيرها": ["شحن هواتف", "إنترنت مجاني", "مركز اتصالات", "صيانة وتصليح", "مفرزة خياطة"]
};

export async function GET() {
  const { data, error } = await supabase.from('app_data').select('data').eq('key', 'services').single();
  
  if (error || !data || !data.data || Array.isArray(data.data)) {
    return NextResponse.json(defaultServices);
  }
  
  return NextResponse.json(data.data);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('adminPassword');
  
  if (pass !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { services } = await request.json();
  
  const { error: updateError } = await supabase.from('app_data').upsert({ key: 'services', data: services });
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ success: true, services });
}

export async function DELETE(request: Request) {
  // We no longer use DELETE for services since we send the whole object via POST,
  // but keep it for legacy compatibility if needed.
  return NextResponse.json({ success: true });
}
