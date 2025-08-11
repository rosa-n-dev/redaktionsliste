import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function SupabaseDemo() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [tableName, setTableName] = useState('VOL.AT_Redaktionsliste_2025');

  // Common test queries including RLS-specific ones
  const testQueries = [
    {
      name: 'Check RLS policies',
      query: `SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual FROM pg_policies WHERE tablename = '${tableName}';`
    },
    {
      name: 'List all tables',
      query: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
    },
    {
      name: 'Describe table structure',
      query: `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = '${tableName}' ORDER BY ordinal_position;`
    },
    {
      name: 'Count rows (with RLS)',
      query: `SELECT COUNT(*) as total_rows FROM "${tableName}";`
    },
    {
      name: 'First 5 rows (all columns)',
      query: `SELECT * FROM "${tableName}" LIMIT 5;`
    },
    {
      name: 'Test specific columns',
      query: `SELECT id, name, role FROM "${tableName}" LIMIT 3;`
    },
    {
      name: 'Test social media columns',
      query: `SELECT id, linkedin_url, instagram_url, twitter_url, website_url FROM "${tableName}" LIMIT 3;`
    }
  ];

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    if (!isSupabaseConfigured() || !supabase) {
      setConnectionStatus('disconnected');
      setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
      return;
    }

    try {
      const { data, error } = await supabase.from('information_schema.tables').select('table_name').limit(1);
      if (error) throw error;
      setConnectionStatus('connected');
      setError(null);
    } catch (err) {
      setConnectionStatus('disconnected');
      setError(err instanceof Error ? err.message : 'Failed to connect to Supabase');
    }
  };

  const executeQuery = async (query: string) => {
    if (!supabase) {
      setError('Supabase client not available');
      return;
    }

    setLoading(true);
    setError(null);
    setQueryResult(null);

    try {
      console.log('Executing query:', query);
      
      // Use rpc for raw SQL queries
      const { data, error } = await supabase.rpc('exec_sql', { query_text: query });
      
      if (error) {
        // If rpc doesn't work, try direct table queries for our specific table
        if (query.includes(`SELECT * FROM "${tableName}"`)) {
          const { data: tableData, error: tableError } = await supabase
            .from(tableName)
            .select('*')
            .limit(5);
          
          if (tableError) throw tableError;
          setQueryResult(tableData);
          return;
        }
        
        if (query.includes(`COUNT(*)`)) {
          const { count, error: countError } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });
          
          if (countError) throw countError;
          setQueryResult([{ total_rows: count }]);
          return;
        }
        
        throw error;
      }
      
      setQueryResult(data);
    } catch (err) {
      console.error('Query error:', err);
      setError(err instanceof Error ? err.message : 'Query failed');
    } finally {
      setLoading(false);
    }
  };

  const executeCustomQuery = () => {
    if (customQuery.trim()) {
      executeQuery(customQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Supabase Integration Demo</h1>
        
        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="font-medium">
              {connectionStatus === 'connected' ? 'Connected to Supabase' :
               connectionStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
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

        {/* Table Name Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Table Configuration</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Table Name:
              </label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your table name"
              />
            </div>
          </div>
        </div>

        {/* Test Queries */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Test Queries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testQueries.map((test, index) => (
              <button
                key={index}
                onClick={() => executeQuery(test.query)}
                disabled={loading || connectionStatus !== 'connected'}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="font-medium text-gray-900">{test.name}</div>
                <div className="text-sm text-gray-500 mt-1 font-mono">
                  {test.query.substring(0, 60)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Query */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Custom Query</h2>
          <div className="space-y-4">
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder={`SELECT * FROM "${tableName}" WHERE name IS NOT NULL;`}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={executeCustomQuery}
              disabled={loading || connectionStatus !== 'connected' || !customQuery.trim()}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Executing...' : 'Execute Query'}
            </button>
          </div>
        </div>

        {/* Query Results */}
        {(queryResult || loading) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Query Results</h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="ml-3">Executing query...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Found {Array.isArray(queryResult) ? queryResult.length : 0} result(s)
                </div>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                  {JSON.stringify(queryResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Environment Variables Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-gray-600">VITE_SUPABASE_URL:</span>{' '}
              <span className={import.meta.env.VITE_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
                {import.meta.env.VITE_SUPABASE_URL ? '✓ Set' : '✗ Not set'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">VITE_SUPABASE_ANON_KEY:</span>{' '}
              <span className={import.meta.env.VITE_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
