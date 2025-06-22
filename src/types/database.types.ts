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
      wo_bookings: {
        Row: {
          booking_id: number
          cabin_id: number
          cabin_price: number
          created_at: string
          end_date: string | null
          guest_id: number
          has_breakfast: boolean
          is_paid: boolean
          misc_price: number | null
          num_guests: number
          num_nights: number
          start_date: string
          total_price: number
          updated_at: string | null
        }
        Insert: {
          booking_id?: number
          cabin_id: number
          cabin_price: number
          created_at?: string
          end_date?: string | null
          guest_id: number
          has_breakfast: boolean
          is_paid: boolean
          misc_price?: number | null
          num_guests: number
          num_nights: number
          start_date: string
          total_price: number
          updated_at?: string | null
        }
        Update: {
          booking_id?: number
          cabin_id?: number
          cabin_price?: number
          created_at?: string
          end_date?: string | null
          guest_id?: number
          has_breakfast?: boolean
          is_paid?: boolean
          misc_price?: number | null
          num_guests?: number
          num_nights?: number
          start_date?: string
          total_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wo_bookings_cabin_id_fkey"
            columns: ["cabin_id"]
            isOneToOne: false
            referencedRelation: "wo_cabins"
            referencedColumns: ["cabin_id"]
          },
          {
            foreignKeyName: "wo_bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "wo_guests"
            referencedColumns: ["guest_id"]
          },
        ]
      }
      wo_cabins: {
        Row: {
          cabin_id: number
          cabin_name: string
          created_at: string
          description: string | null
          discount: number | null
          image: string | null
          max_capacity: number
          regular_price: number
          updated_at: string | null
        }
        Insert: {
          cabin_id?: number
          cabin_name: string
          created_at?: string
          description?: string | null
          discount?: number | null
          image?: string | null
          max_capacity: number
          regular_price: number
          updated_at?: string | null
        }
        Update: {
          cabin_id?: number
          cabin_name?: string
          created_at?: string
          description?: string | null
          discount?: number | null
          image?: string | null
          max_capacity?: number
          regular_price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      wo_guests: {
        Row: {
          countryFlag: string | null
          created_at: string
          email: string
          full_name: string
          guest_id: number
          national_id: string
          nationality: string | null
          updated_at: string | null
        }
        Insert: {
          countryFlag?: string | null
          created_at?: string
          email: string
          full_name: string
          guest_id?: number
          national_id: string
          nationality?: string | null
          updated_at?: string | null
        }
        Update: {
          countryFlag?: string | null
          created_at?: string
          email?: string
          full_name?: string
          guest_id?: number
          national_id?: string
          nationality?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      wo_settings: {
        Row: {
          breakfast_price: number | null
          created_at: string
          max_booking_length: number
          max_guest_per_booking: number
          min_booking_length: number
          setting_id: number
          updated_at: string | null
        }
        Insert: {
          breakfast_price?: number | null
          created_at?: string
          max_booking_length: number
          max_guest_per_booking: number
          min_booking_length: number
          setting_id?: number
          updated_at?: string | null
        }
        Update: {
          breakfast_price?: number | null
          created_at?: string
          max_booking_length?: number
          max_guest_per_booking?: number
          min_booking_length?: number
          setting_id?: number
          updated_at?: string | null
        }
        Relationships: []
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
