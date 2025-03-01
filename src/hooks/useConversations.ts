import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getConversations, createConversation } from '../services/chatService';

interface Conversation {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
}

export function useConversations(userId: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations when user ID changes
  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) {
        setConversations([]);
        setCurrentConversation(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await getConversations(userId);
        
        if (error) {
          throw error;
        }
        
        setConversations(data || []);
        
        // Set current conversation to the most recent one if no current conversation is selected
        if (data && data.length > 0 && !currentConversation) {
          setCurrentConversation(data[0]);
        }
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  // Subscribe to real-time changes
  useEffect(() => {
    if (!userId) return;

    const subscription = supabase
      .channel('public:conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `user_id=eq.${userId}`
        },
        () => {
          // Refresh conversations on any change
          getConversations(userId).then(({ data }) => {
            if (data) {
              setConversations(data);
            }
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  // Create a new conversation
  const newConversation = useCallback(async (title: string = 'New Conversation') => {
    if (!userId) return null;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await createConversation(userId, title);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setConversations(prev => [data, ...prev]);
        setCurrentConversation(data);
        return data;
      }
      
      return null;
    } catch (err) {
      setError((err as Error).message);
      console.error('Error creating conversation:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Update conversation title
  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('conversations')
        .update({ title })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setConversations(prev => 
        prev.map(conv => conv.id === id ? { ...conv, title } : conv)
      );
      
      if (currentConversation?.id === id) {
        setCurrentConversation(prev => prev ? { ...prev, title } : null);
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Error updating conversation title:', err);
    } finally {
      setLoading(false);
    }
  }, [currentConversation]);

  // Delete a conversation
  const deleteConversation = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setConversations(prev => prev.filter(conv => conv.id !== id));
      
      // If we deleted the current conversation, select a new one
      if (currentConversation?.id === id) {
        const newCurrent = conversations.find(conv => conv.id !== id);
        setCurrentConversation(newCurrent || null);
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Error deleting conversation:', err);
    } finally {
      setLoading(false);
    }
  }, [conversations, currentConversation]);

  return {
    conversations,
    currentConversation,
    loading,
    error,
    setCurrentConversation,
    newConversation,
    updateConversationTitle,
    deleteConversation
  };
}

export default useConversations;