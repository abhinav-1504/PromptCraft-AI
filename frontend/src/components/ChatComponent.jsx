import React, { useState } from 'react';

function ChatComponent() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while fetching response.');
    }
  };

  const handlePlayAudio = async () => {
    if (!response) return;
    try {
      const res = await fetch('http://localhost:8080/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: response }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Chat with AI</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleSubmit}
      >
        Send
      </button>
      {response && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold">Response:</h3>
          <p>{response}</p>
          <button
            className="bg-green-500 text-white p-2 rounded mt-2"
            onClick={handlePlayAudio}
          >
            Play Audio
          </button>
          {audioUrl && (
            <audio controls className="mt-2">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatComponent;