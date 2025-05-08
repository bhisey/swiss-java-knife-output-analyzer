import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { ProcessSummary } from '../utils/parser.ts';

interface HeapAllocChartProps {
  data: ProcessSummary[];
  darkMode?: boolean;
  selectedTimeRange?: [Date, Date];
  onTimeRangeChange?: (startIndex: number, endIndex: number) => void;
}

export const HeapAllocChart: React.FC<HeapAllocChartProps> = ({ data, darkMode, selectedTimeRange, onTimeRangeChange }) => {
  // Calculate brush indices from selectedTimeRange
  let brushStart = 0;
  let brushEnd = data.length - 1;
  if (selectedTimeRange && data.length > 0) {
    brushStart = data.findIndex(d => d.timestamp >= selectedTimeRange[0].getTime());
    brushEnd = data.findIndex(d => d.timestamp >= selectedTimeRange[1].getTime());
    if (brushStart === -1) brushStart = 0;
    if (brushEnd === -1) brushEnd = data.length - 1;
  }

  return (
    <div className="h-96">
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Heap Allocation Rate Over Time</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            stroke={darkMode ? '#ccc' : '#333'}
          />
          <YAxis
            label={{ value: 'Allocation Rate (MB/s)', angle: -90, position: 'insideLeft', fill: darkMode ? '#ccc' : '#333', dx: -20 }}
            tickFormatter={(value) => (value / (1024 * 1024)).toFixed(2)}
            stroke={darkMode ? '#ccc' : '#333'}
            domain={[0, Math.max(...data.map(d => d.heapAllocRate / (1024 * 1024))) * 1.1]}
          />
          <Tooltip
            contentStyle={{ background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222' }}
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value: number) => [`${(value / (1024 * 1024)).toFixed(2)} MB/s`, 'Allocation Rate']}
          />
          <Legend wrapperStyle={{ color: darkMode ? '#ccc' : '#333' }} />
          <Line
            type="monotone"
            dataKey="heapAllocRate"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            dot={{ r: 2 }}
          />
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="#82ca9d"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            startIndex={brushStart}
            endIndex={brushEnd}
            onChange={(range) => {
              if (onTimeRangeChange && range && typeof range.startIndex === 'number' && typeof range.endIndex === 'number') {
                onTimeRangeChange(range.startIndex, range.endIndex);
              }
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 