import { useEffect, useState } from 'react';
import { Download, Copy } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function LogsPanel() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/logs`);
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (e) {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const toCSV = () => {
    if (!logs.length) return '';
    const headers = Object.keys(logs[0]);
    const rows = logs.map(l => headers.map(h => JSON.stringify(l[h] ?? '')).join(','));
    return [headers.join(','), ...rows].join('\n');
  };

  const downloadCSV = () => {
    const csv = toCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJSON = async () => {
    try { await navigator.clipboard.writeText(JSON.stringify(logs, null, 2)); } catch {}
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900">Logs</h3>
        <div className="flex items-center gap-2">
          <button onClick={fetchLogs} className="text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50">Refresh</button>
          <button onClick={downloadCSV} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"><Download className="w-3.5 h-3.5"/>CSV</button>
          <button onClick={copyJSON} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"><Copy className="w-3.5 h-3.5"/>Copy JSON</button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading…</div>
      ) : logs.length ? (
        <div className="max-h-64 overflow-auto text-xs bg-slate-50 border rounded-md p-3">
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
      ) : (
        <div className="text-sm text-slate-500">No logs yet. Run a classification.</div>
      )}
    </section>
  );
}
