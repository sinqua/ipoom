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
      animations: {
        Row: {
          created_at: string
          file: string | null
          id: number
          name: string | null
          provider: string | null
        }
        Insert: {
          created_at?: string
          file?: string | null
          id?: number
          name?: string | null
          provider?: string | null
        }
        Update: {
          created_at?: string
          file?: string | null
          id?: number
          name?: string | null
          provider?: string | null
        }
        Relationships: []
      }
      avatars: {
        Row: {
          animation: number | null
          created_at: string
          description: string | null
          id: number
          name: string | null
          optimized: boolean | null
          thumbnail: string | null
          updated_at: string | null
          user_id: string | null
          visible: boolean | null
          vrm: string | null
        }
        Insert: {
          animation?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          optimized?: boolean | null
          thumbnail?: string | null
          updated_at?: string | null
          user_id?: string | null
          visible?: boolean | null
          vrm?: string | null
        }
        Update: {
          animation?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          optimized?: boolean | null
          thumbnail?: string | null
          updated_at?: string | null
          user_id?: string | null
          visible?: boolean | null
          vrm?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "avatars_animation_fkey"
            columns: ["animation"]
            referencedRelation: "animations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avatars_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      links: {
        Row: {
          created_at: string
          id: number
          kakao: string | null
          toss: string | null
          twitter: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          kakao?: string | null
          toss?: string | null
          twitter?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          kakao?: string | null
          toss?: string | null
          twitter?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          background: string | null
          description: string | null
          id: number
          image: string | null
          nickname: string | null
          user_id: string | null
        }
        Insert: {
          background?: string | null
          description?: string | null
          id?: number
          image?: string | null
          nickname?: string | null
          user_id?: string | null
        }
        Update: {
          background?: string | null
          description?: string | null
          id?: number
          image?: string | null
          nickname?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          avatar_id: number | null
          created_at: string
          id: number
          profile_id: number | null
          tag: string | null
        }
        Insert: {
          avatar_id?: number | null
          created_at?: string
          id?: number
          profile_id?: number | null
          tag?: string | null
        }
        Update: {
          avatar_id?: number | null
          created_at?: string
          id?: number
          profile_id?: number | null
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_avatar_id_fkey"
            columns: ["avatar_id"]
            referencedRelation: "avatars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_details: {
        Row: {
          created_at: string
          description: string | null
          id: number
          price_info: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          price_info?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          price_info?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_details_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
