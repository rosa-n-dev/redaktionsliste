// Supabase database types for VOL.AT_Redaktionsliste_2025
export interface Database {
  public: {
    Tables: {
      "VOL.AT_Redaktionsliste_2025": {
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
export function transformDbEditorToEditor(dbEditor: any): Editor {
  console.log('Transforming editor:', dbEditor);

  return {
    id: dbEditor.id || `editor-${Math.random()}`,
    name: dbEditor.name || dbEditor.Name || dbEditor.vorname || dbEditor.Vorname || dbEditor.fullname || 'Name not available',
    role: dbEditor.role || dbEditor.Role || dbEditor.position || dbEditor.Position || dbEditor.title || 'Role not available',
    imageUrl: dbEditor.image_url || dbEditor.imageUrl || dbEditor.photo_url || dbEditor.avatar_url || '/placeholder.svg',
    socialLinks: {
      twitter: dbEditor.twitter_url || dbEditor.twitter || undefined,
      linkedin: dbEditor.linkedin_url || dbEditor.linkedin || undefined,
      instagram: dbEditor.instagram_url || dbEditor.instagram || undefined,
      website: dbEditor.website_url || dbEditor.website || undefined,
    },
  };
}
