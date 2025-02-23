import React, { useState } from 'react';
import { Mic, X, Play } from 'lucide-react';
import './Happy.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoice: string | null;
  onVoiceSelect: (voice: string) => void;
}

const VoiceModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedVoice, 
  onVoiceSelect 
}) => {
  const voices = [
    { id: 'john', name: 'John' },
    { id: 'sabrina', name: 'Sabrina' },
    { id: 'rahul', name: 'Rahul' },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h3>Select a Voice</h3>
        <div className="voice-list">
          {voices.map(voice => (
            <div
              key={voice.id}
              className={`voice-option ${selectedVoice === voice.id ? 'selected' : ''}`}
              onClick={() => {
                onVoiceSelect(voice.id);
                onClose();
              }}
            >
              <Mic size={20} />
              <span>{voice.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Happy() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
  ];

  const startMeditation = () => {
    // Handle meditation start logic
    console.log('Starting meditation with:', {
      mood: selectedMood,
      voice: selectedVoice,
    });
  };

  return (
    <div className="happy-container">
      <div className="content-wrapper">
        <h1 className="question">How are you feeling right now?</h1>

        <div className="emoji-grid">
          {moods.map(mood => (
            <div
              key={mood.label}
              className={`emoji-option ${selectedMood === mood.label ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood.label)}
            >
              <div className="emoji">{mood.emoji}</div>
              <div className="emoji-label">{mood.label}</div>
            </div>
          ))}
        </div>

        <div className="voice-section">
          <button 
            className="voice-button"
            onClick={() => setIsVoiceModalOpen(true)}
          >
            <Mic size={20} />
            {selectedVoice ? `Voice: ${selectedVoice}` : 'Pick a Voice'}
          </button>
        </div>

        <button 
          className="meditation-button"
          onClick={startMeditation}
          disabled={!selectedMood || !selectedVoice}
        >
          <Play size={20} />
          Start Meditation
        </button>
      </div>

      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        selectedVoice={selectedVoice}
        onVoiceSelect={setSelectedVoice}
      />
    </div>
  );
}