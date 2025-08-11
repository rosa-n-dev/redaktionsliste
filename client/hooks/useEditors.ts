import { useState, useEffect } from 'react';
import { Editor, transformDbEditorToEditor } from '@shared/supabase';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Sample data with real social media links for testing
const sampleEditors: Editor[] = [
  {
    id: "sample-1",
    name: "Marc Springer",
    role: "chefredakteur",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/cb7a3f7d228c2b24d4a8c45f66083a1da2a07ffe?width=328",
    email: "marc.springer@vol.at",
    articles: "Politik, Wirtschaft, Chefredaktion",
    socialLinks: {
      twitter: "https://twitter.com/marcspringer",
      linkedin: "https://linkedin.com/in/marcspringer",
      instagram: "https://instagram.com/marcspringer",
      website: "https://marcspringer.com"
    }
  },
  {
    id: "sample-2",
    name: "Valentina Dotli��",
    role: "Social Media managerin",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/7021d0c775fdb02063a284c3030f80e456a06ff4?width=328",
    email: "valentina.dotlic@vol.at",
    articles: "Social Media, Online Marketing, Community Management",
    socialLinks: {
      twitter: "https://twitter.com/valentinadotlic",
      linkedin: "https://linkedin.com/in/valentinadotlic",
      instagram: "https://instagram.com/valentinadotlic"
    }
  },
  {
    id: "sample-3",
    name: "Pascal Pletsch",
    role: "Head of breaking news",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ead7e88a817cd0a2e35c7159c1a54190e4dde77d?width=328",
    email: "pascal.pletsch@vol.at",
    articles: "Breaking News, Eilmeldungen, Live-Ticker",
    socialLinks: {
      twitter: "https://twitter.com/pascalpletsch",
      linkedin: "https://linkedin.com/in/pascalpletsch",
      instagram: "https://instagram.com/pascalpletsch"
    }
  },
  {
    id: "sample-4",
    name: "Anna Schmidt",
    role: "Investigativ-Journalistin",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/16659db56de7a68a5b111f3a193e8f4450bd3bae?width=328",
    socialLinks: {
      twitter: "https://twitter.com/annaschm",
      linkedin: "https://linkedin.com/in/annaschm",
      instagram: "https://instagram.com/annaschm"
    }
  },
  {
    id: "sample-5",
    name: "Thomas Mueller",
    role: "Sport-Redakteur",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/2dac341957f2f36f75d0f1fa351def59f7c6a588?width=328",
    socialLinks: {
      twitter: "https://twitter.com/thomasmueller",
      linkedin: "https://linkedin.com/in/thomasmueller",
      website: "https://thomasmueller.com"
    }
  }
];

interface UseEditorsReturn {
  editors: Editor[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isUsingSupabase: boolean;
}

export function useEditors(): UseEditorsReturn {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isUsingSupabase = isSupabaseConfigured();

  const fetchEditors = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!isUsingSupabase || !supabase) {
        // Use sample data if Supabase is not configured
        console.log('Supabase not configured, using sample data. Please connect Supabase to see real editors.');
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        setEditors(sampleEditors);
        return;
      }

      // Try different approaches to fetch data from RLS-enabled table
      let data, error;

      // First attempt: Try to fetch all columns
      console.log('Attempting to fetch all columns...');
      const result1 = await supabase
        .from('VOL.AT_Redaktionsliste_2025')
        .select('*')
        .order('created_at', { ascending: true });

      if (result1.error) {
        console.log('Error with SELECT *:', result1.error);

        // Second attempt: Try specific columns with correct column names including email and articles
        console.log('Attempting to fetch specific columns...');
        const result2 = await supabase
          .from('VOL.AT_Redaktionsliste_2025')
          .select('id, name, Title, image_url, email, "Artikel zu Person", twitter_url, linkedin_url, instagram_url, website_url, created_at')
          .order('created_at', { ascending: true });

        if (result2.error) {
          console.log('Error with specific columns:', result2.error);

          // Third attempt: Try minimal columns
          console.log('Attempting to fetch minimal columns...');
          const result3 = await supabase
            .from('VOL.AT_Redaktionsliste_2025')
            .select('id, name, Title, image_url, email, "Artikel zu Person"')
            .limit(10);

          data = result3.data;
          error = result3.error;
        } else {
          data = result2.data;
          error = result2.error;
        }
      } else {
        data = result1.data;
        error = result1.error;
      }

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch editors: ${error.message}`);
      }

      if (!data) {
        setEditors([]);
        return;
      }

      console.log('Raw Supabase data:', data);
      console.log('Data length:', data?.length);

      if (data && data.length > 0) {
        console.log('First row sample:', data[0]);
        console.log('Available columns:', Object.keys(data[0]));
      }

      const transformedEditors = data.map(transformDbEditorToEditor);
      console.log('Transformed editors:', transformedEditors);
      setEditors(transformedEditors);
      console.log(`Fetched ${transformedEditors.length} editors from Supabase`);

    } catch (err) {
      console.error('Error fetching editors:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch editors');
      // Fallback to sample data on error
      setEditors(sampleEditors);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    if (!isUsingSupabase || !supabase) {
      return () => {}; // No cleanup needed for sample data
    }

    // Setup Supabase real-time subscription for VOL.AT_Redaktionsliste_2025
    const subscription = supabase
      .channel('vol_redaktionsliste_changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'VOL.AT_Redaktionsliste_2025'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchEditors(); // Refetch data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  useEffect(() => {
    fetchEditors();
    const cleanup = setupRealtimeSubscription();

    return cleanup;
  }, []);

  return {
    editors,
    loading,
    error,
    refetch: fetchEditors,
    isUsingSupabase,
  };
}
