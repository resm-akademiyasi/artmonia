export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          badge_text: string
          created_at: string
          description: string | null
          discount_percent: number | null
          end_date: string
          id: string
          is_active: boolean
          start_date: string
          title: string
        }
        Insert: {
          badge_text?: string
          created_at?: string
          description?: string | null
          discount_percent?: number | null
          end_date: string
          id?: string
          is_active?: boolean
          start_date?: string
          title: string
        }
        Update: {
          badge_text?: string
          created_at?: string
          description?: string | null
          discount_percent?: number | null
          end_date?: string
          id?: string
          is_active?: boolean
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          cta: string | null
          event_type: string
          id: string
          page_path: string | null
          src: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          cta?: string | null
          event_type: string
          id?: string
          page_path?: string | null
          src?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          cta?: string | null
          event_type?: string
          id?: string
          page_path?: string | null
          src?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          goal: string | null
          id: string
          interest: string | null
          level: string | null
          page_path: string | null
          phone: string
          referrer: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          goal?: string | null
          id?: string
          interest?: string | null
          level?: string | null
          page_path?: string | null
          phone: string
          referrer?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          goal?: string | null
          id?: string
          interest?: string | null
          level?: string | null
          page_path?: string | null
          phone?: string
          referrer?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_published: boolean
          link: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          link?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          link?: string | null
          title?: string
        }
        Relationships: []
      }
      student_results: {
        Row: {
          achievement: string | null
          after_image_url: string | null
          before_image_url: string | null
          created_at: string
          display_order: number
          duration_months: number | null
          id: string
          is_published: boolean
          student_name: string
        }
        Insert: {
          achievement?: string | null
          after_image_url?: string | null
          before_image_url?: string | null
          created_at?: string
          display_order?: number
          duration_months?: number | null
          id?: string
          is_published?: boolean
          student_name: string
        }
        Update: {
          achievement?: string | null
          after_image_url?: string | null
          before_image_url?: string | null
          created_at?: string
          display_order?: number
          duration_months?: number | null
          id?: string
          is_published?: boolean
          student_name?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_published: boolean
          student_name: string
          testimonial: string
          thumbnail_url: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          student_name: string
          testimonial: string
          thumbnail_url?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          student_name?: string
          testimonial?: string
          thumbnail_url?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          bio: string | null
          created_at: string
          display_order: number
          full_name: string
          id: string
          is_published: boolean
          photo_url: string | null
          specialties: string[] | null
          title: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_order?: number
          full_name: string
          id?: string
          is_published?: boolean
          photo_url?: string | null
          specialties?: string[] | null
          title?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_order?: number
          full_name?: string
          id?: string
          is_published?: boolean
          photo_url?: string | null
          specialties?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
