import { useState } from 'react';
import Hero from './components/Hero.jsx';
import EmailForm from './components/EmailForm.jsx';
import ResultPanel from './components/ResultPanel.jsx';
import DeveloperPanel from './components/DeveloperPanel.jsx';
import LogsPanel from './components/LogsPanel.jsx';

function App() {
  const [result, setResult] = useState(null);
  const [lastCurl, setLastCurl] = useState('');
  const [lastUrl, setLastUrl] = useState('');
  const [lastPayload, setLastPayload] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6">
        <Hero />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <EmailForm
              onResult={setResult}
              onCurlSnippet={(curl, url, payload) => { setLastCurl(curl); setLastUrl(url); setLastPayload(payload); }}
            />
            <ResultPanel result={result} />
          </div>
          <div className="space-y-6">
            <DeveloperPanel lastCurl={lastCurl} lastUrl={lastUrl} lastPayload={lastPayload} />
            <LogsPanel />
          </div>
        </div>

        <footer className="text-center text-xs text-slate-500 py-6">
          Update the backend URL in your environment variable named VITE_BACKEND_URL.
        </footer>
      </div>
    </div>
  );
}

export default App;
