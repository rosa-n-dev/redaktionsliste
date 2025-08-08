import { useState, useEffect } from 'react';
import { Editor, transformDbEditorToEditor } from '@shared/supabase';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Sample data fallback when Supabase is not configured
const sampleEditors: Editor[] = [
  {
    id: "sample-1",
    name: "Marc Springer",
    role: "chefredakteur",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/cb7a3f7d228c2b24d4a8c45f66083a1da2a07ffe?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      website: "#"
    }
  },
  {
    id: "sample-2",
    name: "Valentina Dotlić",
    role: "Social Media managerin",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/7021d0c775fdb02063a284c3030f80e456a06ff4?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    id: "sample-3",
    name: "Pascal Pletsch",
    role: "Head of breaking news",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ead7e88a817cd0a2e35c7159c1a54190e4dde77d?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
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

      // Fetch from Supabase table: VOL.AT_Redaktionsliste_2025
      const { data, error } = await supabase
        .from('VOL.AT_Redaktionsliste_2025')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch editors: ${error.message}`);
      }

      if (!data) {
        setEditors([]);
        return;
      }

      const transformedEditors = data.map(transformDbEditorToEditor);
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
