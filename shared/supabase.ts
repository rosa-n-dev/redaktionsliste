// Supabase database types for VOL.AT_Redaktionsliste_2025
export interface Database {
  public: {
    Tables: {
      "VOL.AT_Redaktionsliste_2025": {
        Row: {
          id: string;
          name: string;
          Title: string;  // Using actual column name from database
          image_url: string;
          email: string | null;
          "Artikel zu Person": string | null;  // URL to articles page
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
          Title: string;  // Using actual column name from database
          image_url: string;
          email?: string | null;
          "Artikel zu Person"?: string | null;  // Using actual column name with quotes for special characters
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
          Title?: string;  // Using actual column name from database
          image_url?: string;
          email?: string | null;
          "Artikel zu Person"?: string | null;  // Using actual column name with quotes for special characters
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

// Supabase storage configuration for images
const SUPABASE_STORAGE_BASE_URL = 'https://dayiaqaufaorxqsuzgxn.supabase.co/storage/v1/object/public/volat.redaktionsliste.profilbilder';

// Mapping of editor names to their image file names
const IMAGE_MAPPING: { [key: string]: string } = {
  'Marc Springer': 'PP_Marc_Springer.JPG',
  'Pascal Pletsch': 'PP_Pascal_Pletsch.JPG',
  'Martin Suppersberger': 'PP_Martin_Suppersberger.JPG',
  'Larissa Hermann': 'PP_Larissa_Hermann.JPG',
  'Valentina Dotlić': 'PP_Valentina_Dotlic.JPG', // Note: no special characters in filename
  'Paloma Mock': 'PP_Paloma_Mock.JPG',
  'Mirjam Mayer': 'PP_Mirjam_Mayer.JPG',
};

// Function to get Supabase storage URL for an editor
function getEditorImageUrl(editorName: string): string {
  const fileName = IMAGE_MAPPING[editorName];

  if (!fileName) {
    console.log(`No image mapping found for: ${editorName}`);
    return '';
  }

  const fullUrl = `${SUPABASE_STORAGE_BASE_URL}/${fileName}`;
  console.log(`Generated image URL for ${editorName}: ${fullUrl}`);
  return fullUrl;
}

// Utility function to transform database row to Editor type
export function transformDbEditorToEditor(dbEditor: any): Editor {
  console.log('Transforming editor:', dbEditor);

  const editorName = dbEditor.name || dbEditor.Name || dbEditor.vorname || dbEditor.Vorname || dbEditor.fullname || 'Name not available';

  // Use Supabase storage URL mapping instead of database image_url
  const mappedImageUrl = getEditorImageUrl(editorName);

  // Fallback to database URL if no mapping exists
  let imageUrl = mappedImageUrl;
  if (!imageUrl) {
    imageUrl = dbEditor.image_url || dbEditor.imageUrl || dbEditor.photo_url || dbEditor.avatar_url;
    if (imageUrl) {
      imageUrl = imageUrl.trim();
    }
  }

  console.log(`Image URL for ${editorName}: ${imageUrl}`);

  return {
    id: dbEditor.id || `editor-${Math.random()}`,
    name: editorName,
    role: dbEditor.Title || dbEditor.title || dbEditor.role || dbEditor.Role || dbEditor.position || dbEditor.Position || 'Role not available',
    imageUrl: imageUrl || '', // Don't use placeholder as fallback, let component handle it
    email: dbEditor.email || undefined,
    articles: dbEditor["Artikel zu Person"] || dbEditor.articles || undefined,
    socialLinks: {
      twitter: dbEditor.twitter_url || dbEditor.twitter || undefined,
      linkedin: dbEditor.linkedin_url || dbEditor.linkedin || undefined,
      instagram: dbEditor.instagram_url || dbEditor.instagram || undefined,
      website: dbEditor.website_url || dbEditor.website || undefined,
    },
  };
}
