import React from 'react';
import { Sparkles, Smile } from 'lucide-react';
import './App.css';

function App() {
  return (
    <main className="main">
      <div className="container">
        <h1 className="title">
          <span className="title-welcome">Welcome to </span>
          <span className="title-zenara">Zenara</span>
        </h1>
        <p className="description">
          Choose your path to enlightenment and discover a world of mindful learning and joyful growth
        </p>
        
        <div className="button-container">
          <a href="/train" className="button button-train">
            <Sparkles className="icon" />
            Train me
          </a>
          
          <a href="/happy" className="button button-happy">
            <Smile className="icon" />
            Make me happy
          </a>
        </div>
      </div>
    </main>
  );
}

export default App;