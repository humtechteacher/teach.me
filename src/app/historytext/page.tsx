'use client'

import { useState } from 'react'

const historyText = [
  { text: 'The ', interactive: false },
  { text: 'Renaissance', interactive: true },
  { text: ' was a cultural movement that profoundly affected European intellectual life.', interactive: false },
  { text: ' Humanism', interactive: true },
  { text: ' emerged as a key intellectual force, emphasizing the study of classical texts.', interactive: false }
]

export default function InteractiveHistory() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [definition, setDefinition] = useState<string>('')

  const fetchDefinition = async (term: string) => {
    setSelectedTerm(term)
    const res = await fetch('/api/interactive-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term })
    })
    const data = await res.json()
    setDefinition(data.result)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 flex items-center justify-center">
      <div className="max-w-3xl bg-white shadow-xl rounded-xl border border-gray-200 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Interactive History Textbook</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {historyText.map((chunk, index) =>
            chunk.interactive ? (
              <button
                key={index}
                onClick={() => fetchDefinition(chunk.text)}
                className="text-blue-600 hover:underline font-medium"
              >
                {chunk.text}
              </button>
            ) : (
              <span key={index}>{chunk.text}</span>
            )
          )}
        </p>

        {selectedTerm && (
          <div className="mt-8 p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-blue-700 mb-2">More on: {selectedTerm}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{definition}</p>
          </div>
        )}
      </div>
    </div>
  )
}
