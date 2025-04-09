'use client';

import { useState } from 'react';

export default function DisinfoPage() {
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
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <button onClick={generateTweet} className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate Disinformation Tweet
      </button>

      {tweet && (
        <>
          <p className="mt-4">{tweet}</p>
          <input
            type="text"
            value={userLink}
            onChange={(e) => setUserLink(e.target.value)}
            placeholder="Paste a link to refute the tweet"
            className="w-full mt-4 p-2 border rounded"
          />
          <button onClick={validateLink} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
          {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
        </>
      )}
    </div>
  );
}
