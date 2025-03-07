
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TrendsChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('technology');
  const[input, setInput] = useState('');

  const fetchTrends = async (searchKeyword) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/trends', {
        params: {keyword: searchKeyword}
      });
      const data = response.data;
      let labels = [];
      let values = [];
      if (data && data.default && data.default.timelineData) {
        const timeline = data.default.timelineData;
        labels = timeline.map(item => item.formattedTime); 
        values = timeline.map(item => item.value[0]);
      } else {
        console.error("No timeline data available", data);
      }

      setChartData({
        labels: labels,
        datasets: [{
          label: 'Interest over Time for "${searchKeyword}"',
          data: values,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        }]
      });
    } catch (error) {
      console.error('Errror fetching trends:', error);  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends(keyword);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setKeyword(input.trim());
      setInput('')
    }
  };
  return (
    <div>
      <h2>US Trends Dashboard</h2>
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a keyword..."
        />
        <button type="submit">Search</button>
      </form>
      
      {loading ? (
        <div>Loading trends data...</div>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default TrendsChart;
