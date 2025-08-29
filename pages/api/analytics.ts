import type { NextApiRequest, NextApiResponse } from 'next';

interface AnalyticsData {
  totalTechnologies: number;
  categoryCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  languageCounts: Record<string, number>;
  recentTrends: {
    date: string;
    count: number;
  }[];
  topTags: {
    tag: string;
    count: number;
  }[];
  growthMetrics: {
    thisWeek: number;
    lastWeek: number;
    growthRate: number;
  };
}

// Mock analytics data - in a real application, this would be calculated from the database
const mockAnalyticsData: AnalyticsData = {
  totalTechnologies: 15,
  categoryCounts: {
    'open-source': 6,
    'closed-source': 4,
    'paper': 3,
    'application': 3,
    'frontier': 2
  },
  sourceCounts: {
    'GitHub': 6,
    'arXiv': 4,
    'OpenAI': 2,
    'HuggingFace': 2,
    'Anthropic': 1,
    'Cursor': 1,
    'Google': 1,
    'Meta': 1,
    'Mistral AI': 1,
    'Stability AI': 1
  },
  languageCounts: {
    'Python': 8,
    'TypeScript': 4,
    'JavaScript': 2,
    'Other': 1
  },
  recentTrends: [
    { date: '2024-01-15', count: 3 },
    { date: '2024-01-14', count: 2 },
    { date: '2024-01-13', count: 4 },
    { date: '2024-01-12', count: 1 },
    { date: '2024-01-11', count: 2 },
    { date: '2024-01-10', count: 3 },
    { date: '2024-01-09', count: 1 },
    { date: '2024-01-08', count: 2 }
  ],
  topTags: [
    { tag: 'AI', count: 15 },
    { tag: 'Machine Learning', count: 12 },
    { tag: 'LLM', count: 8 },
    { tag: 'Python', count: 8 },
    { tag: 'OpenAI', count: 6 },
    { tag: 'TypeScript', count: 5 },
    { tag: 'Code Generation', count: 4 },
    { tag: 'RAG', count: 3 },
    { tag: 'Transformer', count: 3 },
    { tag: 'Deep Learning', count: 3 },
    { tag: 'NLP', count: 3 },
    { tag: 'API', count: 2 },
    { tag: 'Framework', count: 2 },
    { tag: 'Chatbot', count: 2 }
  ],
  growthMetrics: {
    thisWeek: 8,
    lastWeek: 5,
    growthRate: 60
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { period = 'all' } = req.query;
    
    // In a real implementation, you would filter data based on the period
    // For now, we'll return the mock data
    
    // Add some real-time calculations
    const currentDate = new Date();
    const updatedTrends = mockAnalyticsData.recentTrends.map(trend => ({
      ...trend,
      // Add some randomness to simulate real data changes
      count: trend.count + Math.floor(Math.random() * 2)
    }));
    
    const responseData: AnalyticsData = {
      ...mockAnalyticsData,
      recentTrends: updatedTrends,
      // Update growth metrics with current timestamp
      growthMetrics: {
        ...mockAnalyticsData.growthMetrics,
        // Add some variation
        thisWeek: mockAnalyticsData.growthMetrics.thisWeek + Math.floor(Math.random() * 3),
        lastWeek: mockAnalyticsData.growthMetrics.lastWeek + Math.floor(Math.random() * 2)
      }
    };
    
    // Recalculate growth rate
    responseData.growthMetrics.growthRate = Math.round(
      ((responseData.growthMetrics.thisWeek - responseData.growthMetrics.lastWeek) / 
       responseData.growthMetrics.lastWeek) * 100
    );
    
    res.status(200).json(responseData);
  } else if (req.method === 'POST') {
    // Update analytics data (for future implementation)
    // This could trigger a recalculation of analytics
    res.status(200).json({ 
      success: true, 
      message: 'Analytics updated successfully',
      timestamp: new Date().toISOString()
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}