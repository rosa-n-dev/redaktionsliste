import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Author = {
  id: string;
  name: string;
  Title: string | null;
  image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  bluesky_url: string | null;
};

export default function Index() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const TABLE_NAME = "volat_redaktionsliste_2025";

  useEffect(() => {
    const loadAuthors = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        setError("Supabase is not configured. Please check your env vars.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select(
            "id, name, Title, image_url, email, linkedin_url, instagram_url, twitter_url, website_url, bluesky_url"
          )
          .order("name", { ascending: true });

        if (error) throw error;
        setAuthors(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load authors");
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  if (loading) return <div className="p-8">Loading authors…</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {authors.map((author) => (
        <div
          key={author.id}
          className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center"
        >
          {author.image_url && (
            <img
              src={author.image_url}
              alt={author.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}
          <h2 className="text-lg font-semibold">{author.name}</h2>
          {author.Title && (
            <p className="text-gray-600 text-sm">{author.Title}</p>
          )}
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-blue-600">
            {author.email && <a href={`mailto:${author.email}`}>Email</a>}
            {author.linkedin_url && <a href={author.linkedin_url}>LinkedIn</a>}
            {author.instagram_url && (
              <a href={author.instagram_url}>Instagram</a>
            )}
            {author.twitter_url && <a href={author.twitter_url}>Twitter</a>}
            {author.website_url && <a href={author.website_url}>Website</a>}
            {author.bluesky_url && <a href={author.bluesky_url}>Bluesky</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
