import { useState, useEffect, useCallback } from 'react';
import { getMessages, saveMessage, getAIResponse } from '../services/chatService';

interface Message {
  id?: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  conversation_id: string;
}

export function useChat(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages when conversation ID changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) {
        setMessages([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await getMessages(conversationId);
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Convert string timestamps to Date objects
          const formattedMessages = data.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          
          setMessages(formattedMessages);
        }
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Send a message and get AI response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !conversationId) return;

    setLoading(true);
    setError(null);

    try {
      // Create user message
      const userMessage: Message = {
        content,
        sender: 'user',
        timestamp: new Date(),
        conversation_id: conversationId
      };

      // Update UI immediately
      setMessages(prev => [...prev, userMessage]);

      // Save user message to Supabase
      const { error: saveError } = await saveMessage({
        content,
        sender: 'user',
        conversation_id: conversationId,
        timestamp: new Date().toISOString()
      });

      if (saveError) {
        throw saveError;
      }

      // Format messages for AI
      const messageHistory = messages.map(msg => ({
        content: msg.content,
        sender: msg.sender
      }));

      messageHistory.push({
        content,
        sender: 'user'
      });

      // Get AI response
      const response = await getAIResponse(messageHistory);

      // Create bot message
      const botMessage: Message = {
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        conversation_id: conversationId
      };

      // Save bot message to Supabase
      const { error: botSaveError } = await saveMessage({
        content: response,
        sender: 'bot',
        conversation_id: conversationId,
        timestamp: new Date().toISOString()
      });

      if (botSaveError) {
        throw botSaveError;
      }

      // Update UI with bot response
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  }, [conversationId, messages]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages
  };
}

export default useChat;