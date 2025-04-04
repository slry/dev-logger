export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      api_tokens: {
        Row: {
          expires_at: string;
          id: number;
          key: string;
          name: string;
          team_id: string;
          user_id: string;
        };
        Insert: {
          expires_at?: string;
          id?: number;
          key?: string;
          name?: string;
          team_id: string;
          user_id: string;
        };
        Update: {
          expires_at?: string;
          id?: number;
          key?: string;
          name?: string;
          team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'api_tokens_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      developer_file_operations: {
        Row: {
          filename: string;
          operation: Database['public']['Enums']['file_operation'];
          team_id: string;
          timestamp: string;
          user_id: string;
        };
        Insert: {
          filename?: string;
          operation: Database['public']['Enums']['file_operation'];
          team_id: string;
          timestamp: string;
          user_id: string;
        };
        Update: {
          filename?: string;
          operation?: Database['public']['Enums']['file_operation'];
          team_id?: string;
          timestamp?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'developer_file_operations_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      developer_loc_per_day: {
        Row: {
          datetime: string;
          loc_added: number;
          loc_removed: number;
          team_id: string;
          user_id: string;
        };
        Insert: {
          datetime?: string;
          loc_added?: number;
          loc_removed?: number;
          team_id: string;
          user_id: string;
        };
        Update: {
          datetime?: string;
          loc_added?: number;
          loc_removed?: number;
          team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'developer_loc_per_day_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      developer_loc_per_file: {
        Row: {
          filename: string;
          loc_added: number;
          loc_removed: number;
          team_id: string;
          user_id: string;
        };
        Insert: {
          filename?: string;
          loc_added?: number;
          loc_removed?: number;
          team_id: string;
          user_id: string;
        };
        Update: {
          filename?: string;
          loc_added?: number;
          loc_removed?: number;
          team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'developer_total_loc_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      developer_team: {
        Row: {
          role: Database['public']['Enums']['team_role'];
          team_id: string;
          user_id: string;
        };
        Insert: {
          role?: Database['public']['Enums']['team_role'];
          team_id: string;
          user_id: string;
        };
        Update: {
          role?: Database['public']['Enums']['team_role'];
          team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'developer_team_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      developer_time_spent_per_day: {
        Row: {
          date: string;
          team_id: string;
          time_spent: number;
          user_id: string;
        };
        Insert: {
          date: string;
          team_id: string;
          time_spent: number;
          user_id: string;
        };
        Update: {
          date?: string;
          team_id?: string;
          time_spent?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'developer_time_spent_per_day_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      integration_tokens: {
        Row: {
          provider: Database['public']['Enums']['integration_provider'];
          token: string | null;
          user_id: string;
        };
        Insert: {
          provider: Database['public']['Enums']['integration_provider'];
          token?: string | null;
          user_id: string;
        };
        Update: {
          provider?: Database['public']['Enums']['integration_provider'];
          token?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      personal_teams: {
        Row: {
          personal_team_id: string;
          user_id: string;
        };
        Insert: {
          personal_team_id: string;
          user_id: string;
        };
        Update: {
          personal_team_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'personal_teams_personal_team_id_fkey';
            columns: ['personal_team_id'];
            isOneToOne: true;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
        ];
      };
      teams: {
        Row: {
          icon: string;
          id: string;
          name: string;
        };
        Insert: {
          icon: string;
          id?: string;
          name: string;
        };
        Update: {
          icon?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      file_operation: 'DELETE' | 'CREATE' | 'EDIT';
      integration_provider: 'TAIGA' | 'GITLAB';
      team_role: 'OWNER' | 'DEVELOPER';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      file_operation: ['DELETE', 'CREATE', 'EDIT'],
      integration_provider: ['TAIGA', 'GITLAB'],
      team_role: ['OWNER', 'DEVELOPER'],
    },
  },
} as const;
