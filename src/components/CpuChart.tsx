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

interface CpuChartProps {
  data: ProcessSummary[];
  darkMode?: boolean;
  selectedTimeRange?: [Date, Date];
  onTimeRangeChange?: (startIndex: number, endIndex: number) => void;
}

export const CpuChart: React.FC<CpuChartProps> = ({ data, darkMode, selectedTimeRange, onTimeRangeChange }) => {
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
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>CPU Usage Over Time</h2>
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
            label={{ value: 'CPU Usage (%)', angle: -90, position: 'insideLeft', fill: darkMode ? '#ccc' : '#333' }}
            stroke={darkMode ? '#ccc' : '#333'}
          />
          <Tooltip
            contentStyle={{ background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222' }}
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'CPU Usage']}
          />
          <Legend wrapperStyle={{ color: darkMode ? '#ccc' : '#333' }} />
          <Line
            type="monotone"
            dataKey="cpuUsage"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Brush
            dataKey="timestamp"
            height={30}
            stroke="#8884d8"
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