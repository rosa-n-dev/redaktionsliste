import { useState, useEffect } from 'react';
import { Editor, transformDbEditorToEditor } from '@shared/supabase';

// Sample data that matches the Figma design - will be replaced with real Supabase data
const sampleEditors: Editor[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
    name: "Pascal Pletsch",
    role: "Head of breaking news",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ead7e88a817cd0a2e35c7159c1a54190e4dde77d?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    id: "4",
    name: "Valentina Dotlić",
    role: "Social Media managerin",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/16659db56de7a68a5b111f3a193e8f4450bd3bae?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    id: "5",
    name: "Marc Springer",
    role: "chefredakteur",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/2dac341957f2f36f75d0f1fa351def59f7c6a588?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      website: "#"
    }
  }
];

interface UseEditorsReturn {
  editors: Editor[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEditors(): UseEditorsReturn {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEditors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace this with actual Supabase query when connected
      // For now, we use sample data to show the design
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      setEditors(sampleEditors);
      
      // Future Supabase implementation:
      // const { data, error } = await supabase
      //   .from('editors')
      //   .select('*')
      //   .order('created_at', { ascending: true });
      // 
      // if (error) throw error;
      // setEditors(data.map(transformDbEditorToEditor));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch editors');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    // TODO: Setup Supabase real-time subscription when connected
    // const subscription = supabase
    //   .channel('editors_changes')
    //   .on('postgres_changes', 
    //     { event: '*', schema: 'public', table: 'editors' },
    //     () => {
    //       fetchEditors();
    //     }
    //   )
    //   .subscribe();
    
    // return () => {
    //   supabase.removeChannel(subscription);
    // };
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
  };
}
