import { ResumeJSON } from '../schemas/resume-schema';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      portfolios: {
        Row: {
          id: string;
          slug: string;
          resume_data: Json;
          user_preferences: Json | null;
          voice_agent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          resume_data: Json;
          user_preferences?: Json | null;
          voice_agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          resume_data?: Json;
          user_preferences?: Json | null;
          voice_agent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Type helper for portfolio data
export type Portfolio = Database['public']['Tables']['portfolios']['Row'] & {
  resume_data: ResumeJSON;
};
