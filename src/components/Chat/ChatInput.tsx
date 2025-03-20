
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { transcribeVoiceRecording } from '@/api/voice';
import { toast } from "@/components/ui/use-toast";

interface ChatInputProps {
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ className }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const { sendMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set up media recorder when recording state changes
  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else if (mediaRecorder) {
      stopRecording();
    }
    // Don't include mediaRecorder in deps as it would cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, e.data]);
        }
      };
      
      recorder.onstop = async () => {
        // Process the collected audio chunks
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          await processAudioBlob(audioBlob);
          setAudioChunks([]);
        }
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      recorder.start();
      setMediaRecorder(recorder);
      
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      toast({
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      toast({
        title: "Processing Speech",
        description: "Converting your speech to text...",
      });
    }
  };

  const processAudioBlob = async (audioBlob: Blob) => {
    try {
      const response = await transcribeVoiceRecording({ audioBlob });
      
      if (response.status === 'success' && response.transcription) {
        setMessage(response.transcription);
        toast({
          title: "Transcription Complete",
          description: `"${response.transcription}"`,
        });
      } else {
        toast({
          title: "Transcription Failed",
          description: response.message || "Could not understand the audio",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process your speech",
        variant: "destructive",
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      
      // Refocus the textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative flex items-end gap-2 bg-white dark:bg-slate-800 border border-border p-3 rounded-xl shadow-soft",
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about travel..."
        rows={1}
        className="flex-1 resize-none border-0 bg-transparent p-2 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground text-sm"
        style={{ 
          minHeight: '40px',
          maxHeight: '120px',
        }}
      />
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleRecording}
          className={cn(
            "p-2 rounded-full transition-colors",
            isRecording 
              ? "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400 animate-pulse" 
              : "text-muted-foreground hover:text-compass-600 dark:hover:text-compass-400"
          )}
          aria-label={isRecording ? "Stop recording" : "Start voice recording"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>
        
        <button
          type="submit"
          className={cn(
            "p-2 rounded-full bg-compass-500 text-white transition-transform hover:scale-105 active:scale-95",
            !message.trim() && "opacity-70 cursor-not-allowed hover:scale-100 active:scale-100"
          )}
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
