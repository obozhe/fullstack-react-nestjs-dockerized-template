import axios from 'axios';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import reactLogo from './assets/react.svg';
import { locales } from './core/i18n';

import viteLogo from '/vite.svg';

function App() {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isServerHealthy, setIsServerHealthy] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/ping')
      .then(() => setIsServerHealthy(true))
      .catch(() => setIsServerHealthy(false))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="flex gap-8 justify-center">
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="mb-4 mx-auto w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
          API Server Status:{' '}
          {isLoading ? (
            'Loading...'
          ) : isServerHealthy ? (
            <span className="text-green-600">OK</span>
          ) : (
            <span className="text-red-600">Error</span>
          )}
        </div>
        <form className="flex items-center justify-center mb-4">
          <select
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
          >
            {locales.map((locale) => (
              <option key={locale.code} value={locale.code}>
                {locale.name}
              </option>
            ))}
          </select>
        </form>
        <p>
          <Trans i18nKey="hotReloadHint">
            Edit <code>src/App.tsx</code> and save to test HMR
          </Trans>
        </p>
      </div>
      <p className="read-the-docs">{t('linksHint')}</p>
    </>
  );
}

export default App;
