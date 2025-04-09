'use client';

import { useState } from 'react';

export default function DisinfoPageVariantB() {
  const [tweet, setTweet] = useState('');
  const [userLink, setUserLink] = useState('');
  const [feedback, setFeedback] = useState('');

  const generateTweet = async () => {
    const res = await fetch('/api/generate-disinfo', { method: 'POST' });
    const data = await res.json();
    setTweet(data.tweet);
    setFeedback('');
    setUserLink('');
  };

  const validateLink = async () => {
    const res = await fetch('/api/validate-response', {
      method: 'POST',
      body: JSON.stringify({ tweet, link: userLink }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setFeedback(data.validation);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Disinformation Challenge
        </h2>
        <button
          onClick={generateTweet}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 rounded-lg transition-transform transform hover:scale-105"
        >
          Generate Tweet
        </button>
        {tweet && (
          <div className="mt-8 space-y-4">
            <p className="text-lg text-gray-700">{tweet}</p>
            <input
              type="text"
              value={userLink}
              onChange={(e) => setUserLink(e.target.value)}
              placeholder="Paste a link to refute this tweet"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={validateLink}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-transform transform hover:scale-105"
            >
              Submit
            </button>
            {feedback && (
              <p className="text-center font-semibold text-gray-600">
                {feedback}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
