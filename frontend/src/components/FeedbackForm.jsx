import React, { useState } from 'react';

function FeedbackForm({ type, contentId }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, contentId, rating, comment }),
      });
      if (res.ok) {
        setMessage('Feedback submitted successfully!');
        setRating(1);
        setComment('');
      } else {
        setMessage('Error submitting feedback.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-semibold">Submit Feedback</h3>
      <select
        className="w-full p-2 border rounded mb-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your feedback..."
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
}

export default FeedbackForm;