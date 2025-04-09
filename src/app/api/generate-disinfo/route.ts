import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const prompt = 'Generate a unique tweet that contains believable disinformation.';
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 64,
    temperature: 0.7,
  });

  return NextResponse.json({ tweet: completion.choices[0].message.content?.trim() });
}