// src/app/api/steelman-challenge/route.ts
import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: NextRequest) {
  const { essay, conversation } = await req.json();

  if (essay) {
    const counterPrompt = `You are an expert debater. Given this argumentative essay, provide the best possible counterargument:\n\n${essay}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: counterPrompt }],
    });
    const counterargument = completion.choices[0].message.content;
    return NextResponse.json({ counterargument });
  }

  if (conversation) {
    const gradingPrompt = `You are grading a student's ability to steelman a counterargument. Below is the full back-and-forth. Grade the student's overall performance from A to F and explain briefly why.\n\n${conversation
      .map((msg: any, i: number) => `${i % 2 === 0 ? 'Counter' : 'Student'}: ${msg}`)
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
