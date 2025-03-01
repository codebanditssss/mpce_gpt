import { supabase } from '../lib/supabase';
import openai from '../lib/openai';

/**
 * Message type definition
 */
export interface Message {
  id?: string;
  conversation_id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

/**
 * Conversation type definition
 */
export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

/**
 * Get all conversations for a user
 */
export const getConversations = async (userId: string) => {
  return supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
};

/**
 * Get a specific conversation by ID
 */
export const getConversation = async (conversationId: string) => {
  return supabase
    .from('conversations')
    .select('*')
    .eq('id', conversationId)
    .single();
};

/**
 * Create a new conversation
 */
export const createConversation = async (userId: string, title: string) => {
  return supabase
    .from('conversations')
    .insert({
      user_id: userId,
      title,
      created_at: new Date().toISOString()
    })
    .select()
    .single();
};

/**
 * Update a conversation's title
 */
export const updateConversationTitle = async (conversationId: string, title: string) => {
  return supabase
    .from('conversations')
    .update({ title })
    .eq('id', conversationId);
};

/**
 * Delete a conversation
 */
export const deleteConversation = async (conversationId: string) => {
  return supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId);
};

/**
 * Get messages for a conversation
 */
export const getMessages = async (conversationId: string) => {
  return supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('timestamp', { ascending: true });
};

/**
 * Save a message to the database
 */
export const saveMessage = async (message: Omit<Message, 'id'>) => {
  return supabase
    .from('messages')
    .insert(message);
};

/**
 * Get AI response from OpenAI
 */
export const getAIResponse = async (messages: Array<{content: string, sender: 'user' | 'bot'}>) => {
  try {
    // Format messages for OpenAI API
    const formattedMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add a system message at the beginning
    formattedMessages.unshift({
      role: 'system',
      content: 'You are a helpful financial assistant. Provide concise, accurate, and helpful responses to the user.'
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
};

/**
 * Process a new message (save user message, get and save AI response)
 */
export const processMessage = async (conversationId: string, content: string, userId: string) => {
  try {
    // First, ensure we have a conversation
    let currentConversationId = conversationId;
    
    if (!currentConversationId) {
      // Create a new conversation if none exists
      const title = content.length > 30 ? content.substring(0, 30) + '...' : content;
      const { data, error } = await createConversation(userId, title);
      
      if (error) throw error;
      if (!data) throw new Error('Failed to create conversation');
      
      currentConversationId = data.id;
    }
    
    // Save user message
    const userMessage: Omit<Message, 'id'> = {
      conversation_id: currentConversationId,
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    const { error: userMsgError } = await saveMessage(userMessage);
    if (userMsgError) throw userMsgError;
    
    // Get existing messages for context
    const { data: existingMessages, error: msgError } = await getMessages(currentConversationId);
    if (msgError) throw msgError;
    
    // Format messages for AI
    const messageHistory = (existingMessages || []).map(msg => ({
      content: msg.content,
      sender: msg.sender
    }));
    
    // Get AI response
    const aiResponse = await getAIResponse(messageHistory);
    
    // Save AI response
    const botMessage: Omit<Message, 'id'> = {
      conversation_id: currentConversationId,
      content: aiResponse,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    
    const { error: botMsgError } = await saveMessage(botMessage);
    if (botMsgError) throw botMsgError;
    
    return {
      conversationId: currentConversationId,
      userMessage,
      botMessage: {
        ...botMessage,
        id: Date.now().toString() // Temporary ID for UI
      }
    };
  } catch (error) {
    console.error('Error processing message:', error);
    throw error;
  }
};

export default {
  getConversations,
  getConversation,
  createConversation,
  updateConversationTitle,
  deleteConversation,
  getMessages,
  saveMessage,
  getAIResponse,
  processMessage
};