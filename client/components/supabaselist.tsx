import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../hooks/supabase"; // adjust path if needed

type Row = { id: string; title?: string; updated_at?: string };

export default function SupabaseList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setErr("Supabase is not configured (check env vars).");
      setLoading(false);
      return;
    }

    let ignore = false;
    (async () => {
      const { data, error } = await supabase!
        .from("volat_redaktionsliste_2025")
        .select("id, title, updated_at")
        .order("updated_at", { ascending: false })
        .limit(20);

      if (!ignore) {
        if (error) setErr(error.message);
        setRows(data || []);
        setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <ul>
      {rows.map((r) => (
        <li key={r.id}>
          {r.title ?? r.id} — {r.updated_at}
        </li>
      ))}
    </ul>
  );
}
