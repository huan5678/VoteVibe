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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Comment: {
        Row: {
          id: string
          pollId: string
          text: string
          userId: string
        }
        Insert: {
          id: string
          pollId: string
          text: string
          userId: string
        }
        Update: {
          id?: string
          pollId?: string
          text?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Comment_pollId_fkey"
            columns: ["pollId"]
            referencedRelation: "Poll"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Comment_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Notification: {
        Row: {
          id: string
          message: string
          read: boolean
          userId: string
        }
        Insert: {
          id: string
          message: string
          read?: boolean
          userId: string
        }
        Update: {
          id?: string
          message?: string
          read?: boolean
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Notification_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Poll: {
        Row: {
          createdById: string
          description: string
          id: string
          options: Json
          title: string
        }
        Insert: {
          createdById: string
          description: string
          id?: string
          options: Json
          title: string
        }
        Update: {
          createdById?: string
          description?: string
          id?: string
          options?: Json
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Poll_createdById_fkey"
            columns: ["createdById"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          loginedAt: string | null
          name: string
          password: string
          role: Database["public"]["Enums"]["Role"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: string
          loginedAt?: string | null
          name: string
          password: string
          role?: Database["public"]["Enums"]["Role"]
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          loginedAt?: string | null
          name?: string
          password?: string
          role?: Database["public"]["Enums"]["Role"]
          updatedAt?: string
        }
        Relationships: []
      }
      User_Detail: {
        Row: {
          address: Json | null
          avatar_url: string | null
          birthday: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          userId: string
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          birthday?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          userId: string
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          birthday?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_Detail_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Vote: {
        Row: {
          id: string
          option: number
          pollId: string
          userId: string
        }
        Insert: {
          id: string
          option: number
          pollId: string
          userId: string
        }
        Update: {
          id?: string
          option?: number
          pollId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Vote_pollId_fkey"
            columns: ["pollId"]
            referencedRelation: "Poll"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Vote_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
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
      Role: "USER" | "ADMIN"
      TimeUnit: "Y" | "M" | "D" | "W" | "H" | "m" | "s"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
