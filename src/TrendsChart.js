// src/TrendsChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const TrendsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await axios.get('http://localhost:5001/api/trends', {
          params: { keyword: 'Trump' }
        });
        const data = response.data;
        const timeline = data.default.timelineData;
        const labels = timeline.map((item) => new Date(item.time * 1000).toLocaleDateString());
        const values = timeline.map((item) => item.value[0]);
        
        setChartData({
          labels: labels,
          datasets: [{
            label: 'Interest Over Time',
            data: values,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          }]
        });
      } catch (error) {
        console.error('Error fetching trends:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, []);

  if (loading) return <div>Loading trends data...</div>;

  return (
    <div>
      <h2>US Trends for Technology (Past 30 Days)</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TrendsChart;
