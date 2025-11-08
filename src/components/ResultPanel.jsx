import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

function Badge({ verdict }) {
  const map = {
    malicious: { color: 'bg-rose-100 text-rose-700 border-rose-200', Icon: XCircle },
    safe: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', Icon: CheckCircle2 },
    borderline: { color: 'bg-amber-100 text-amber-700 border-amber-200', Icon: AlertTriangle },
  };
  const { color, Icon } = map[verdict] || map.borderline;
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs border ${color}`}>
      <Icon className="w-4 h-4" />
      {verdict || 'unknown'}
    </span>
  );
}

export default function ResultPanel({ result }) {
  if (!result) return null;
  if (result.error) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="text-rose-600">{String(result.error)}</div>
      </section>
    );
  }

  const prob = typeof result.probability_malicious === 'number' ? result.probability_malicious : 0;
  const pct = Math.round(prob * 100);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-900">Result</h3>
        <Badge verdict={result.verdict} />
      </div>

      <div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${pct > 66 ? 'bg-rose-500' : pct > 33 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 text-xs text-slate-600">Probability malicious: {pct}%</div>
      </div>

      {Array.isArray(result.reasons) && result.reasons.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-1">Reasons</div>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(result.top_tokens) && result.top_tokens.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-1">Top tokens</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {result.top_tokens.slice(0, 5).map((t, i) => (
              <div key={i} className="border bg-slate-50 rounded-md px-3 py-2 text-xs flex items-center justify-between">
                <span className="truncate max-w-[70%]">{t.token}</span>
                <span className="font-mono">{t.score?.toFixed ? t.score.toFixed(3) : t.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.explain && (
        <details className="rounded-lg border bg-slate-50 p-3 text-sm">
          <summary className="cursor-pointer font-medium">Explainability view</summary>
          <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-700">{JSON.stringify(result.explain, null, 2)}</pre>
        </details>
      )}
    </section>
  );
}
