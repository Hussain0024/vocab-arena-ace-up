export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string
          icon: string | null
          id: string
          name: string
          requirement_type: string
          requirement_value: number
          reward_xp: number | null
        }
        Insert: {
          description: string
          icon?: string | null
          id?: string
          name: string
          requirement_type: string
          requirement_value: number
          reward_xp?: number | null
        }
        Update: {
          description?: string
          icon?: string | null
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
          reward_xp?: number | null
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          challenge_data: Json | null
          created_at: string | null
          date: string | null
          id: string
          word_id: string | null
        }
        Insert: {
          challenge_data?: Json | null
          created_at?: string | null
          date?: string | null
          id?: string
          word_id?: string | null
        }
        Update: {
          challenge_data?: Json | null
          created_at?: string | null
          date?: string | null
          id?: string
          word_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_progress: {
        Row: {
          challenge_id: string | null
          completed: boolean | null
          completed_at: string | null
          id: string
          score: number | null
          user_id: string | null
        }
        Insert: {
          challenge_id?: string | null
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          score?: number | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: string | null
          completed?: boolean | null
          completed_at?: string | null
          id?: string
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          id: string
          last_studied: string | null
          learned_words: number | null
          total_xp: number | null
          user_id: string | null
          word_pack_id: string | null
        }
        Insert: {
          id?: string
          last_studied?: string | null
          learned_words?: number | null
          total_xp?: number | null
          user_id?: string | null
          word_pack_id?: string | null
        }
        Update: {
          id?: string
          last_studied?: string | null
          learned_words?: number | null
          total_xp?: number | null
          user_id?: string | null
          word_pack_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_word_pack_id_fkey"
            columns: ["word_pack_id"]
            isOneToOne: false
            referencedRelation: "word_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          id: string
          last_activity: string | null
          level: number | null
          streak_days: number | null
          total_xp: number | null
          user_id: string | null
          words_learned: number | null
        }
        Insert: {
          id?: string
          last_activity?: string | null
          level?: number | null
          streak_days?: number | null
          total_xp?: number | null
          user_id?: string | null
          words_learned?: number | null
        }
        Update: {
          id?: string
          last_activity?: string | null
          level?: number | null
          streak_days?: number | null
          total_xp?: number | null
          user_id?: string | null
          words_learned?: number | null
        }
        Relationships: []
      }
      word_packs: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          is_premium: boolean | null
          title: string
          total_words: number | null
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_premium?: boolean | null
          title: string
          total_words?: number | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_premium?: boolean | null
          title?: string
          total_words?: number | null
        }
        Relationships: []
      }
      words: {
        Row: {
          created_at: string | null
          definition: string
          example: string | null
          id: string
          part_of_speech: string | null
          pronunciation: string | null
          synonyms: string[] | null
          word: string
          word_pack_id: string | null
        }
        Insert: {
          created_at?: string | null
          definition: string
          example?: string | null
          id?: string
          part_of_speech?: string | null
          pronunciation?: string | null
          synonyms?: string[] | null
          word: string
          word_pack_id?: string | null
        }
        Update: {
          created_at?: string | null
          definition?: string
          example?: string | null
          id?: string
          part_of_speech?: string | null
          pronunciation?: string | null
          synonyms?: string[] | null
          word?: string
          word_pack_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "words_word_pack_id_fkey"
            columns: ["word_pack_id"]
            isOneToOne: false
            referencedRelation: "word_packs"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
