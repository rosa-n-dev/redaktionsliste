import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function SupabaseDemo() {
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "connected" | "disconnected"
  >("checking");
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const TABLE_NAME = "volat_redaktionsliste_2025";

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
  setConnectionStatus("checking");
  if (!isSupabaseConfigured() || !supabase) {
    setConnectionStatus("disconnected");
    setError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    return;
  }

  try {
    const { error } = await supabase
      .from(volat_redaktionsliste_2025)              // <-- use your real table
      .select("id")
      .limit(1);

    if (error) throw error;

    setConnectionStatus("connected");
    setError(null);
  } catch (err) {
    setConnectionStatus("disconnected");
    setError(err instanceof Error ? err.message : "Failed to connect to Supabase");
  }
};

  const loadSampleRows = async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    setRows([]);

    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select(
          "id, name, Title, image_url, email, linkedin_url, instagram_url, twitter_url, website_url, bluesky_url"
        )
        .limit(5);

      if (error) throw error;
      setRows(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Supabase Integration Demo
        </h1>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${connectionStatus === "connected"
                  ? "bg-green-500"
                  : connectionStatus === "disconnected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
            ></div>
            <span className="font-medium">
              {connectionStatus === "connected"
                ? "Connected to Supabase"
                : connectionStatus === "disconnected"
                  ? "Disconnected"
                  : "Checking..."}
            </span>
            <button
              onClick={checkConnection}
              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Load Rows */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Query</h2>
          <button
            onClick={loadSampleRows}
            disabled={loading || connectionStatus !== "connected"}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load first 5 rows"}
          </button>
        </div>

        {/* Query Results */}
        {rows.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Query Results</h2>
            <div className="text-sm text-gray-600 mb-4">
              Found {rows.length} result(s)
            </div>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(rows, null, 2)}
            </pre>
          </div>
        )}

        {/* Environment Variables Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-gray-600">VITE_SUPABASE_URL:</span>{" "}
              <span
                className={
                  import.meta.env.VITE_SUPABASE_URL
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {import.meta.env.VITE_SUPABASE_URL ? "✓ Set" : "✗ Not set"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">VITE_SUPABASE_ANON_KEY:</span>{" "}
              <span
                className={
                  import.meta.env.VITE_SUPABASE_ANON_KEY
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Not set"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
