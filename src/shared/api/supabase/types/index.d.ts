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
          user_id: string;
        };
        Insert: {
          expires_at?: string;
          id?: number;
          key?: string;
          name?: string;
          user_id: string;
        };
        Update: {
          expires_at?: string;
          id?: number;
          key?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      developer_file_operations: {
        Row: {
          filename: string;
          operation: Database['public']['Enums']['file_operation'];
          timestamp: string;
          user_id: string;
        };
        Insert: {
          filename?: string;
          operation: Database['public']['Enums']['file_operation'];
          timestamp: string;
          user_id: string;
        };
        Update: {
          filename?: string;
          operation?: Database['public']['Enums']['file_operation'];
          timestamp?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      developer_loc_per_day: {
        Row: {
          datetime: string;
          loc_added: number;
          loc_removed: number;
          user_id: string;
        };
        Insert: {
          datetime?: string;
          loc_added?: number;
          loc_removed?: number;
          user_id: string;
        };
        Update: {
          datetime?: string;
          loc_added?: number;
          loc_removed?: number;
          user_id?: string;
        };
        Relationships: [];
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
          time_spent: number;
          user_id: string;
        };
        Insert: {
          date: string;
          time_spent: number;
          user_id: string;
        };
        Update: {
          date?: string;
          time_spent?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      developer_total_loc: {
        Row: {
          filename: string;
          loc_added: number;
          loc_removed: number;
          user_id: string;
        };
        Insert: {
          filename?: string;
          loc_added?: number;
          loc_removed?: number;
          user_id: string;
        };
        Update: {
          filename?: string;
          loc_added?: number;
          loc_removed?: number;
          user_id?: string;
        };
        Relationships: [];
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
      teams: {
        Row: {
          icon: string;
          id: string;
          name: string | null;
        };
        Insert: {
          icon: string;
          id?: string;
          name?: string | null;
        };
        Update: {
          icon?: string;
          id?: string;
          name?: string | null;
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

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
