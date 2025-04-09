import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { tweet, link } = await req.json();
  const prompt = `Does the following link logically refute this tweet? Tweet: "${tweet}" Link: ${link}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 64,
    temperature: 0.7,
  });

  return NextResponse.json({ validation: completion.choices[0].message.content?.trim() });
}
