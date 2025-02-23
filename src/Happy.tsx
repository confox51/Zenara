
import React, { useState, useRef } from 'react';
import { Mic, X, Play, Music } from 'lucide-react';
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
  const [showAudio, setShowAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
  ];

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio playback error:', e);
    setAudioError('Failed to load or play audio');
  };

  const startMeditation = () => {
    if (!selectedMood || !selectedVoice) return;
    
    setShowAudio(true);
    setAudioError(null);
    
    setTimeout(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            setAudioError('Unable to start playback');
          });
        }
      }
    }, 500);
  };

  const getMeditationTitle = () => {
    if (!selectedMood) return '';
    const moodMap = {
      'Happy': 'Gratitude Meditation',
      'Neutral': 'Mindfulness Meditation',
      'Sad': 'Healing Meditation'
    };
    return moodMap[selectedMood as keyof typeof moodMap];
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

        {showAudio && (
          <div className="audio-section">
            <div className="audio-title">
              <Music size={20} />
              {getMeditationTitle()}
            </div>
            <audio 
              ref={audioRef}
              className="audio-player"
              controls
              onError={handleAudioError}
              src="/audio/meditation.mp3"
            >
              Your browser does not support the audio element.
            </audio>
            {audioError && (
              <div className="error-message">{audioError}</div>
            )}
          </div>
        )}
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

