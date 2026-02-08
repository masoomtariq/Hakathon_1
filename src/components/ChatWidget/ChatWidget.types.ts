export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  text: string;
  chapter: string;
  section?: string;
  url: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error?: string;
}

export interface ChatWidgetProps {
  currentChapter?: string;
  onMessageSend?: (message: string) => void;
}
