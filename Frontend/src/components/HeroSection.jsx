import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// --- Sample Data for Charts ---
// Data for Calls per Number (Bar Chart)
const barData = [
  { name: 'Number A', calls: 4000 },
  { name: 'Number B', calls: 3000 },
  { name: 'Number C', calls: 2000 },
  { name: 'Number D', calls: 2780 },
  { name: 'Number E', calls: 1890 },
];

// Data for Daily Trend (Line Chart)
const lineData = [
  { name: 'Day 1', totalCalls: 400 },
  { name: 'Day 2', totalCalls: 450 },
  { name: 'Day 3', totalCalls: 350 },
  { name: 'Day 4', totalCalls: 500 },
  { name: 'Day 5', totalCalls: 480 },
  { name: 'Day 6', totalCalls: 600 },
  { name: 'Day 7', totalCalls: 550 },
];

// Data for Conversion Rates (Pie Chart)
const conversionData = [
  { name: 'Leads (Unconverted)', value: 750 },
  { name: 'Converted', value: 250 },
];

const COLORS = ['#f59e0b', '#34d399']; // Orange for Leads, Green for Converted
// ------------------------------

const HeroSection = () => {
  return (
    <div className="px-6 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-600 mt-1">
        Welcome back, User 6833d552a865db8f71856c6e
      </p>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

        {/* 1. Calls per Number – Bar Chart */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Calls per Number
          </h2>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="calls" fill="#f97316" name="Total Calls" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Daily Calls Trend – Line Chart */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Daily Calls Trend
          </h2>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalCalls" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  name="Calls"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Conversion Rates – Pie Chart (New Implementation) */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Conversion Rates
          </h2>

          <div className="w-full h-[220px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                    <Pie
                        data={conversionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" // Center X
                        cy="50%" // Center Y
                        outerRadius={80}
                        fill="#8884d8"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {conversionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;