import { useState } from 'react';
import { Send } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function EmailForm({ onResult, onCurlSnippet }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState('');
  const [loading, setLoading] = useState(false);

  const samples = {
    safe: {
      subject: 'Team Lunch Next Friday',
      body: 'Hi all,\n\nLet\'s meet at 12:30 next Friday for lunch at the cafe downstairs.\nMenu attached.\n\nThanks!',
      headers: 'From: alice@company.com\nTo: team@company.com\nX-Mailer: Outlook',
    },
    phishing: {
      subject: 'URGENT: Verify your bank password immediately',
      body: 'Your account will be suspended. Click http://not-your-bank.example.com/login to reset now.',
      headers: 'From: security@yourbànk.com\nReply-To: attacker@gmail.com',
    },
    borderline: {
      subject: 'Password reset requested',
      body: 'We received a request to reset your password. If this was you, ignore this email. Otherwise contact support.',
      headers: 'From: support@service.com\nDKIM: pass',
    },
  };

  const applySample = (key) => {
    const s = samples[key];
    setSubject(s.subject);
    setBody(s.body);
    setHeaders(s.headers);
  };

  const classify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { subject, body, headers };
    const url = `${BASE_URL}/api/v1/classify`;

    const curl = `curl -s -X POST '${url}' -H 'Content-Type: application/json' -d '${JSON.stringify(payload).replace(/'/g, "'\\''")}'`;
    onCurlSnippet?.(curl, url, payload);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      onResult?.(data);
    } catch (err) {
      onResult?.({ error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
      <div className="flex flex-wrap gap-2 text-xs">
        <button className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200" onClick={() => applySample('safe')}>Quick sample: Safe</button>
        <button className="px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200" onClick={() => applySample('borderline')}>Quick sample: Borderline</button>
        <button className="px-3 py-1 rounded-full bg-rose-100 hover:bg-rose-200" onClick={() => applySample('phishing')}>Quick sample: Phishing</button>
      </div>

      <form onSubmit={classify} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500" placeholder="e.g., Verify your account" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} className="mt-1 w-full h-40 rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500" placeholder="Paste the email body" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Headers (optional)</label>
          <textarea value={headers} onChange={(e) => setHeaders(e.target.value)} className="mt-1 w-full h-28 rounded-md border-slate-300 focus:border-slate-500 focus:ring-slate-500" placeholder="Raw email headers" />
        </div>

        <div className="flex items-center gap-3">
          <button disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60">
            <Send className="w-4 h-4" /> {loading ? 'Classifying…' : 'Classify'}
          </button>
          <span className="text-xs text-slate-500">BASE_URL: {BASE_URL}</span>
        </div>
      </form>
    </section>
  );
}
