import { NextResponse } from 'next/server';
import { submitInquiry } from '@/lib/db/catalog';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.company || !body.country) {
      return NextResponse.json(
        { error: 'Missing mandatory fields: name, email, company, country' },
        { status: 400 }
      );
    }

    const inquiry = await submitInquiry(body);
    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error('API Inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to process B2B inquiry' },
      { status: 500 }
    );
  }
}
