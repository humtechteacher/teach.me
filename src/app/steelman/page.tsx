'use client';

import { useState } from 'react';

export default function SteelmanChallenge() {
  const [essay, setEssay] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [grading, setGrading] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEssayUpload = async () => {
    setIsSubmitting(true);
    const res = await fetch('/api/steelman-challenge', {
      method: 'POST',
      body: JSON.stringify({ essay }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setResponses([data.counterargument]);
    setIsSubmitting(false);
  };

  const sendMessage = async () => {
    const newMessages = [...responses, message];
    setResponses(newMessages);
    setMessage('');
    if (newMessages.length >= 7) {
      const res = await fetch('/api/steelman-challenge', {
        method: 'POST',
        body: JSON.stringify({ conversation: newMessages }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setGrading(data.grade);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl border border-gray-200 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Steelman Challenge</h1>
        <p className="text-gray-600 text-center">
          Upload your argumentative essay. Then engage in a back and forth to steelman the counterargument. You will get feedback on how well you did.
        </p>
        {!responses.length && (
          <div>
            <textarea
              className="w-full h-40 p-4 border rounded-lg text-gray-700"
              placeholder="Paste your argumentative essay here..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />
            <button
              onClick={handleEssayUpload}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Essay'}
            </button>
          </div>
        )}
        {responses.length > 0 && (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 text-sm max-h-64 overflow-y-auto">
              {responses.map((msg, i) => (
                <p key={i} className={`mb-2 ${i % 2 === 0 ? 'text-blue-700' : 'text-green-700'}`}>
                  <strong>{i % 2 === 0 ? 'Counter' : 'You'}:</strong> {msg}
                </p>
              ))}
            </div>
            {grading ? (
              <div className="text-xl text-center font-semibold text-purple-600">
                Final Grade: {grading}
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  className="flex-1 border p-2 rounded-lg text-gray-800"
                  placeholder="Your steelman response..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 rounded-lg"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}