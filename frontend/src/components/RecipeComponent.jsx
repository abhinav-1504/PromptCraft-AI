import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

function RecipeComponent() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });
      if (res.ok) {
        const data = await res.text();
        setRecipe(data);
      } else {
        setError('Failed to generate recipe.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while generating recipe.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async () => {
    if (!recipe) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: recipe }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        setError('Failed to generate audio.');
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      setError('Error occurred while generating audio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Recipe Generator</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (e.g., chicken, rice, broccoli)..."
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {recipe && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold">Recipe:</h3>
          <p>{recipe}</p>
          <button
            className="bg-green-500 text-white p-2 rounded mt-2"
            onClick={handlePlayAudio}
            disabled={loading}
          >
            {loading ? 'Generating Audio...' : 'Play Audio'}
          </button>
          {audioUrl && (
            <audio controls className="mt-2">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <FeedbackForm type="recipe" contentId={recipe.substring(0, 50)} />
        </div>
      )}
    </div>
  );
}

export default RecipeComponent;