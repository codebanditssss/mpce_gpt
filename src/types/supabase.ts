export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          sender: 'user' | 'bot'
          timestamp: string
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          sender: 'user' | 'bot'
          timestamp?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          content?: string
          sender?: 'user' | 'bot'
          timestamp?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Useful derived types
export type Conversation = Database['public']['Tables']['conversations']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

// Insert types
export type ConversationInsert = Database['public']['Tables']['conversations']['Insert']
export type MessageInsert = Database['public']['Tables']['messages']['Insert']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

// Update types
export type ConversationUpdate = Database['public']['Tables']['conversations']['Update']
export type MessageUpdate = Database['public']['Tables']['messages']['Update']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']