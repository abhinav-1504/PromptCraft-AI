import React, { useState } from 'react';
import ChatComponent from './components/ChatComponent';
import ImageComponent from './components/ImageComponent';
import RecipeComponent from './components/RecipeComponent';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Stock Photo Generator</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={`tab ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          Image Generator
        </button>
        <button
          className={`tab ${activeTab === 'recipe' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipe')}
        >
          Recipe Generator
        </button>
      </div>

      <div className="content">
        {activeTab === 'chat' && <ChatComponent />}
        {activeTab === 'image' && <ImageComponent />}
        {activeTab === 'recipe' && <RecipeComponent />}
      </div>
    </div>
  );
}

export default App;
