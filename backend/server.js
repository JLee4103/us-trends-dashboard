const express = require('express');
const cors = require('cors');
const googleTrends = require('google-trends-api');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/trends', async (req, res) => {
  try {
    const keyword = req.query.keyword || 'Trump';
    const results = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      geo: 'US',
    });
    
    res.json(JSON.parse(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching trends data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
