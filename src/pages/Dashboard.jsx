import React from 'react';
import AnalyticsCard from '../components/AnalyticsCard';
import UserGrowthChart from '../components/UserGrowthChart';

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <AnalyticsCard title="Total Courses" value="20" />
        <AnalyticsCard title="Active Enrollments" value="150" />
        <AnalyticsCard title="Revenue Stats" value="$3000" />
      </div>
      <div className="mt-8">
        <UserGrowthChart />
      </div>
    </div>
  );
};

export default Dashboard;
