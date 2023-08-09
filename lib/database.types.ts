export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      animations: {
        Row: {
          created_at: string | null
          file: string | null
          id: number
          name: string | null
          provider: string | null
        }
        Insert: {
          created_at?: string | null
          file?: string | null
          id?: number
          name?: string | null
          provider?: string | null
        }
        Update: {
          created_at?: string | null
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
          created_at: string | null
          description: string | null
          id: number
          is_profile: boolean | null
          name: string | null
          thumbnail: string | null
          user_id: string | null
          visible: boolean | null
          vrm: string | null
          updated_at: string | null
        }
        Insert: {
          animation?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_profile?: boolean | null
          name?: string | null
          thumbnail?: string | null
          user_id?: string | null
          visible?: boolean | null
          vrm?: string | null
        }
        Update: {
          animation?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_profile?: boolean | null
          name?: string | null
          thumbnail?: string | null
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
      profiles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
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
      reviews: {
        Row: {
          buyer_id: string | null
          comment: string | null
          created_at: string | null
          creator_id: string | null
          id: number
          image_name: string | null
          like: number | null
          rate: number | null
        }
        Insert: {
          buyer_id?: string | null
          comment?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: number
          image_name?: string | null
          like?: number | null
          rate?: number | null
        }
        Update: {
          buyer_id?: string | null
          comment?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: number
          image_name?: string | null
          like?: number | null
          rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_buyer_id_fkey"
            columns: ["buyer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      slots: {
        Row: {
          current: number | null
          id: number
          maximum: number | null
          user_id: string | null
        }
        Insert: {
          current?: number | null
          id?: number
          maximum?: number | null
          user_id?: string | null
        }
        Update: {
          current?: number | null
          id?: number
          maximum?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slots_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          avatar_id: number | null
          created_at: string | null
          id: number
          profile_id: number | null
          tag: string | null
        }
        Insert: {
          avatar_id?: number | null
          created_at?: string | null
          id?: number
          profile_id?: number | null
          tag?: string | null
        }
        Update: {
          avatar_id?: number | null
          created_at?: string | null
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
          created_at: string | null
          description: string | null
          id: number
          price_info: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          price_info?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

