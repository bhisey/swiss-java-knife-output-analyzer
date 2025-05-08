import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload.tsx';
import { CpuChart } from './components/CpuChart.tsx';
import { HeapAllocChart } from './components/HeapAllocChart.tsx';
import { ThreadTable } from './components/ThreadTable.tsx';
import { ProcessSummary } from './utils/parser.ts';

const DATASTAX_LOGO = process.env.PUBLIC_URL + '/datastax-support-logo.png';

const APP_TITLE = 'Swiss Java Knife Output Analyzer';

const App: React.FC = () => {
  const [data, setData] = useState<ProcessSummary[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[Date, Date] | undefined>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  const handleDataParsed = (parsedData: ProcessSummary[]) => {
    setData(parsedData);
    setSelectedTimeRange(undefined);
  };

  // Handler for zoom/brush events from charts
  const handleTimeRangeChange = (startIndex: number, endIndex: number) => {
    if (!data.length) return;
    const start = new Date(data[startIndex].timestamp);
    const end = new Date(data[endIndex].timestamp);
    setSelectedTimeRange([start, end]);
  };

  return (
    <div className={darkMode ? 'min-h-screen bg-gray-900 text-gray-100' : 'min-h-screen bg-gray-50 text-gray-900'}>
      <header className={`flex items-center justify-between px-6 py-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-4">
          <img src={DATASTAX_LOGO} alt="DataStax Support Logo" className="h-10 w-auto bg-white rounded" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{APP_TITLE}</h1>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {data.length === 0 ? (
            <FileUpload onDataParsed={handleDataParsed} />
          ) : (
            <div className="space-y-8">
              <div className={`shadow rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CpuChart data={data} darkMode={darkMode} selectedTimeRange={selectedTimeRange} onTimeRangeChange={handleTimeRangeChange} />
              </div>
              <div className={`shadow rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <HeapAllocChart data={data} darkMode={darkMode} selectedTimeRange={selectedTimeRange} onTimeRangeChange={handleTimeRangeChange} />
              </div>
              <div className={`shadow rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <ThreadTable data={data} selectedTimeRange={selectedTimeRange} darkMode={darkMode} />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setData([])}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload New File
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App; 