import { supabase } from './supabase';

// Helper function to get the full Supabase storage URL
export function getSupabaseImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath || !supabase) {
    return '';
  }

  // If it's already a full URL (starts with http), return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // If it's a storage path, construct the full URL
  const { data } = supabase.storage.from('').getPublicUrl(imagePath);
  return data.publicUrl;
}

// Helper function to validate if an image URL is accessible
export async function validateImageUrl(url: string): Promise<boolean> {
  if (!url) return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
