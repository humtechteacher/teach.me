// src/app/api/steelman-challenge/route.ts
import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { essay, conversation } = await req.json();

  if (essay) {
    const counterPrompt = `Given this argumentative essay, provide a counterargument that students will argue against:\n\n${essay}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: counterPrompt }],
    });
    const counterargument = completion.choices[0].message.content;
    return NextResponse.json({ counterargument });
  }

  if (conversation) {
    const conversationLength = conversation.length;

    if (conversationLength > 7) {
      const gradingPrompt = `Given the this conversation, evaluate how well the student argued against the points on a 1-10 scale. Explain what they did well and what they could improve .\n\n${conversation
        .map((msg: string, i: number) => `${i % 2 === 0 ? 'Counter' : 'Student'}: ${msg}`)
        .join('\n')}`;
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: gradingPrompt }],
      });
      const gradeText = completion.choices[0].message.content;
      return NextResponse.json({ grade: gradeText });
    }

    const gradingPrompt = `Given this conversation, where you are Counter, continue the argument.\n\n${conversation
      .map((msg: string, i: number) => `${i % 2 === 0 ? 'Counter' : 'Student'}: ${msg}`)
      .join('\n')}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: gradingPrompt }],
    });
    const gradeText = completion.choices[0].message.content;
    return NextResponse.json({ grade: gradeText });
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
