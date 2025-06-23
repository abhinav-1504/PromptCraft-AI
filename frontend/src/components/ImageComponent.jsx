import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

function ImageComponent() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [quality, setQuality] = useState('standard');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setImages([]); // clear previous images
    try {
      const res = await fetch('http://localhost:8080/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size, quality, n: 1 }),
      });

      if (res.ok) {
        const data = await res.json();
        setImages(data.output.images.map(img => img.url));
      } else {
        setError('Failed to generate image.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while generating image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Generate Image</h2>

      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter image description..."
      />

      <select
        className="w-full p-2 border rounded mb-2"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="256x256">256x256</option>
        <option value="512x512">512x512</option>
        <option value="1024x1024">1024x1024</option>
      </select>

      <select
        className="w-full p-2 border rounded mb-2"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      >
        <option value="standard">Standard</option>
        <option value="hd">High Definition</option>
      </select>

      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* ✅ Progress Bar shown above the image grid */}
      {loading && (
        <div className="w-full bg-gray-200 rounded overflow-hidden mt-4">
          <div
            className="h-2 bg-blue-500 animate-pulse"
            style={{ width: '100%' }}
          ></div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4">
        {images.map((url, index) => (
          <div key={index}>
            <img src={url} alt="Generated" className="w-full rounded" />
            <FeedbackForm type="image" contentId={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageComponent;
