import React, { useState } from 'react';
import { ProcessSummary } from '../utils/parser.ts';

interface ThreadTableProps {
  data: ProcessSummary[];
  selectedTimeRange?: [Date, Date];
  darkMode?: boolean;
}

type SortField = 'timestamp' | 'id' | 'name' | 'state' | 'cpuUsage' | 'allocRate';
type SortDirection = 'asc' | 'desc';

const ROWS_PER_PAGE = 30;

export const ThreadTable: React.FC<ThreadTableProps> = ({ data, selectedTimeRange, darkMode }) => {
  const [sortField, setSortField] = useState<SortField>('cpuUsage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);

  // Aggregate all threads from all snapshots in the selected time range
  let threadsWithTimestamp: Array<any> = [];
  let rangeLabel = '';
  if (selectedTimeRange && data.length > 0) {
    const [start, end] = selectedTimeRange;
    const filtered = data.filter(s => s.timestamp >= start.getTime() && s.timestamp <= end.getTime());
    threadsWithTimestamp = filtered.flatMap(snapshot =>
      snapshot.threads.map(thread => ({ ...thread, timestamp: snapshot.timestamp }))
    );
    if (filtered.length > 0) {
      rangeLabel = `${new Date(filtered[0].timestamp).toLocaleString()} — ${new Date(filtered[filtered.length-1].timestamp).toLocaleString()}`;
    }
  } else if (data.length > 0) {
    const snapshot = data[data.length - 1];
    threadsWithTimestamp = snapshot.threads.map(thread => ({ ...thread, timestamp: snapshot.timestamp }));
    rangeLabel = new Date(snapshot.timestamp).toLocaleString();
  }

  // Sorting
  const sortedThreads = [...threadsWithTimestamp].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    if (sortField === 'timestamp') {
      aValue = a.timestamp;
      bValue = b.timestamp;
    } else if (sortField === 'cpuUsage' || sortField === 'allocRate') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedThreads.length / ROWS_PER_PAGE);
  const paginatedThreads = sortedThreads.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setPage(1); // Reset to first page on sort
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Thread Details</h2>
      <div className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Showing threads for: {rangeLabel}
      </div>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('timestamp')}>
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>
                Thread ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('state')}>
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('cpuUsage')}>
                CPU Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('allocRate')}>
                Allocation Rate
              </th>
            </tr>
          </thead>
          <tbody className={darkMode ? 'bg-gray-900 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-200'}>
            {paginatedThreads.map((thread) => (
              <tr key={thread.id + thread.timestamp} className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(thread.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {thread.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {thread.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {thread.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {thread.cpuUsage.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {(thread.allocRate / (1024 * 1024)).toFixed(2)} MB/s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Prev
          </button>
          <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}; 