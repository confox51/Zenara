import React, { useState, useEffect } from 'react';
import { Mic, X, Play } from 'lucide-react';
import './Happy.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoice: string | null;
  onVoiceSelect: (voice: { id: string, name: string }) => void;
}

interface Voice {
  voice_id: string;
  name: string;
  preview_url?: string;
}

const VoiceModal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedVoice, 
  onVoiceSelect 
}) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY || ''
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch voices');
        }

        const data = await response.json();
        const allowedVoiceNames = ['Aria', 'Shreyas', 'Female Meditation Teacher'];
        const filteredVoices = data.voices.filter((voice: Voice) => 
          allowedVoiceNames.includes(voice.name)
        );
        setVoices(filteredVoices);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch voices');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchVoices();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h3>Select a Voice</h3>
        <div className="voice-list">
          {isLoading && <div>Loading voices...</div>}
          {error && <div className="error-message">{error}</div>}
          {!isLoading && !error && voices.map(voice => (
            <div
              key={voice.voice_id}
              className={`voice-option ${selectedVoice === voice.voice_id ? 'selected' : ''}`}
              onClick={() => {
                onVoiceSelect({ id: voice.voice_id, name: voice.name });
                onClose();
              }}
            >
              <Mic size={20} />
              <span>{voice.name}</span>
              {voice.preview_url && (
                <button 
                  className="preview-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    new Audio(voice.preview_url).play();
                  }}
                >
                  <Play size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Happy() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<{ id: string, name: string } | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
  ];

  const generateSpeech = async () => {
    if (!selectedVoice) return;
    
    setIsLoading(true);
    try {
      const meditationText = "Welcome to your meditation session. Take a deep breath, and let's begin this journey together. Find a comfortable position, and gently close your eyes. Feel the tension leaving your body with each breath.";
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.id}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY || ''
        },
        body: JSON.stringify({
          text: meditationText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      // Play the audio
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startMeditation = () => {
    generateSpeech();
    console.log('Starting meditation with:', {
      mood: selectedMood,
      voice: selectedVoice?.id,
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
            {selectedVoice ? `Voice: ${selectedVoice.name}` : 'Pick a Voice'}
          </button>
        </div>

        <button 
          className="meditation-button"
          onClick={startMeditation}
          disabled={!selectedMood || !selectedVoice || isLoading}
        >
          {isLoading ? (
            'Generating audio...'
          ) : (
            <>
              <Play size={20} />
              Start Meditation
            </>
          )}
        </button>

        {audioUrl && (
          <div className="audio-player" style={{ marginTop: '20px' }}>
            <audio controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        selectedVoice={selectedVoice?.id || null}
        onVoiceSelect={(voice) => setSelectedVoice(voice)}
      />
    </div>
  );
}