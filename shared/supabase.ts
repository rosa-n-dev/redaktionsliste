// Supabase database types
export interface Database {
  public: {
    Tables: {
      editors: {
        Row: {
          id: string;
          name: string;
          role: string;
          image_url: string;
          twitter_url: string | null;
          linkedin_url: string | null;
          instagram_url: string | null;
          website_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          image_url: string;
          twitter_url?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          website_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          image_url?: string;
          twitter_url?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          website_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Editor type for the frontend (matches the component interface)
export interface Editor {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

// Utility function to transform database row to Editor type
export function transformDbEditorToEditor(dbEditor: Database['public']['Tables']['editors']['Row']): Editor {
  return {
    id: dbEditor.id,
    name: dbEditor.name,
    role: dbEditor.role,
    imageUrl: dbEditor.image_url,
    socialLinks: {
      twitter: dbEditor.twitter_url || undefined,
      linkedin: dbEditor.linkedin_url || undefined,
      instagram: dbEditor.instagram_url || undefined,
      website: dbEditor.website_url || undefined,
    },
  };
}
