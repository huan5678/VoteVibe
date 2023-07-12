export type Json = string | number | boolean | null | {[key: string]: Json} | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
      };
      user: {
        Row: {
          account: string;
          createdAt: string;
          id: string;
          name: string;
          passhash: string | null;
        };
        Insert: {
          account: string;
          createdAt?: string;
          id?: string;
          name: string;
          passhash?: string | null;
        };
        Update: {
          account?: string;
          createdAt?: string;
          id?: string;
          name?: string;
          passhash?: string | null;
        };
      };
      user_detail: {
        Row: {
          avatar_url: string | null;
          address: Json | null;
          full_name: string | null;
          id: string;
          phone: string | null;
          birthday: string | null;
          gender: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          address?: Json | null;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          birthday?: string | null;
          gender?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          address?: Json | null;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          birthday?: string | null;
          gender?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
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
  CompositeTypes: {
    [_ in never]: never;
  };
}
