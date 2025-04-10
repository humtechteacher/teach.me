import { NextRequest, NextResponse } from 'next/server'
import openai from '@/lib/openai'

export async function POST(req: NextRequest) {
  const { term } = await req.json()

  const prompt = `Explain the historical significance of the term "${term}" in a concise, student-friendly way suitable for high school learners.`

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    const result = chatResponse.choices[0]?.message.content ?? 'No response found.'
    return NextResponse.json({ result })
  } catch (error) {
    console.error('OpenAI Error:', error)
    return NextResponse.json({ result: 'There was an error fetching information.' })
  }
}
