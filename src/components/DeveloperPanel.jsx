import { useMemo } from 'react';
import { Copy } from 'lucide-react';

export default function DeveloperPanel({ lastCurl, lastUrl, lastPayload }) {
  const fetchSnippet = useMemo(() => {
    if (!lastUrl || !lastPayload) return '';
    return `fetch('${lastUrl}', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(${JSON.stringify(lastPayload, null, 2)})\n}).then(r => r.json()).then(console.log)`;
  }, [lastUrl, lastPayload]);

  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900">Developer panel</h3>
        <span className="text-xs text-slate-500">Update BASE_URL in your env if needed</span>
      </div>
      <div className="text-xs text-slate-600">Curl</div>
      <pre className="bg-slate-50 border rounded-md p-3 text-xs overflow-auto">{lastCurl || 'Run a classification to see snippets'}</pre>
      {lastCurl && (
        <button onClick={() => copy(lastCurl)} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"><Copy className="w-3.5 h-3.5"/>Copy curl</button>
      )}
      <div className="text-xs text-slate-600">fetch()</div>
      <pre className="bg-slate-50 border rounded-md p-3 text-xs overflow-auto">{fetchSnippet || 'Run a classification to see snippets'}</pre>
      {fetchSnippet && (
        <button onClick={() => copy(fetchSnippet)} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"><Copy className="w-3.5 h-3.5"/>Copy fetch()</button>
      )}
    </section>
  );
}
