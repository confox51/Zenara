import React, { useState, useRef } from 'react';
import { Camera, Book, FileText, Type, Mic, Plus, X } from 'lucide-react';
import './Train.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <h3 className="modal-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default function Train() {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: string;
    title: string;
  }>({
    isOpen: false,
    type: '',
    title: ''
  });
  const [textContent, setTextContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const memoryOptions = [
    { id: 'photos', icon: <Camera className="memory-option-icon" size={24} />, label: 'Photos' },
    { id: 'journal', icon: <Book className="memory-option-icon" size={24} />, label: 'Journal' },
    { id: 'notes', icon: <FileText className="memory-option-icon" size={24} />, label: 'Notes' },
    { id: 'texts', icon: <Type className="memory-option-icon" size={24} />, label: 'Texts' },
  ];

  const voices = [
    { id: 'john', name: 'John' },
    { id: 'sabrina', name: 'Sabrina' },
    { id: 'rahul', name: 'Rahul' },
  ];

  const handleMemoryClick = (id: string) => {
    if (id === 'photos') {
      setModalConfig({
        isOpen: true,
        type: 'photo',
        title: 'Upload Photos'
      });
    } else {
      setModalConfig({
        isOpen: true,
        type: 'text',
        title: `Add ${id.charAt(0).toUpperCase() + id.slice(1)}`
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files selected:', files);
    }
  };

  const handleSubmit = () => {
    // Handle content submission logic here
    console.log('Submitting content:', textContent);
    setTextContent('');
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="train-container">
      <div className="content-wrapper">
        <h1 className="train-title">Train Me</h1>

        <section>
          <h2 className="section-title">Happy Memories</h2>
          <div className="memory-options">
            {memoryOptions.map((option) => (
              <div
                key={option.id}
                className="memory-option"
                onClick={() => handleMemoryClick(option.id)}
              >
                {option.icon}
                <div className="memory-option-label">{option.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Voice Preferences</h2>
          <div className="voice-grid">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`voice-option ${selectedVoice === voice.id ? 'selected' : ''}`}
                onClick={() => setSelectedVoice(voice.id)}
              >
                <Mic className="voice-icon" size={20} />
                <span>{voice.name}</span>
              </div>
            ))}
            <div className="voice-option">
              <Plus size={20} className="voice-icon" />
              <span>Add Voice</span>
            </div>
          </div>
        </section>
      </div>

      <div className="side-label">Pull for AI Help</div>

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
      >
        {modalConfig.type === 'photo' ? (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            <div 
              className="photo-upload-area"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={48} color="#5B5BF9" />
              <p>Click to upload photos or drag and drop them here</p>
            </div>
            <button className="button" onClick={handleSubmit}>Upload</button>
          </>
        ) : (
          <>
            <textarea
              className="text-input"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder={`Enter your ${modalConfig.type} content here...`}
            />
            <button className="button" onClick={handleSubmit}>Save</button>
          </>
        )}
      </Modal>
    </div>
  );
}