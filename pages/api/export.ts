import type { NextApiRequest, NextApiResponse } from 'next';
import type { AITechnology } from './technologies';

// Mock data for export - in a real app, this would come from the database
const mockTechnologies: AITechnology[] = [
  // This would be fetched from the actual data source
  {
    id: '1',
    title: 'Cursor IDE',
    description: '基于 AI 的代码编辑器，提供智能代码补全和生成功能',
    category: 'application',
    tags: ['IDE', 'Code Generation', 'AI Assistant'],
    url: 'https://cursor.sh',
    lastUpdated: '2024-01-15',
    source: 'Cursor',
    author: 'Anysphere'
  }
  // ... more technologies would be here
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { format = 'json', category, search } = req.query;
    
    let filteredTechnologies = mockTechnologies;
    
    // Apply filters
    if (category && category !== 'all') {
      filteredTechnologies = filteredTechnologies.filter(
        tech => tech.category === category
      );
    }
    
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredTechnologies = filteredTechnologies.filter(tech =>
        tech.title.toLowerCase().includes(searchTerm) ||
        tech.description.toLowerCase().includes(searchTerm) ||
        tech.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'json':
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="ai-technologies-${timestamp}.json"`);
        res.status(200).json({
          exportDate: new Date().toISOString(),
          totalCount: filteredTechnologies.length,
          technologies: filteredTechnologies
        });
        break;
        
      case 'csv':
        const csvHeader = 'ID,Title,Description,Category,Tags,URL,Stars,Last Updated,Source,Author,Language,License\n';
        const csvRows = filteredTechnologies.map(tech => {
          const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;
          return [
            tech.id,
            escapeCsv(tech.title),
            escapeCsv(tech.description),
            tech.category,
            escapeCsv(tech.tags.join('; ')),
            tech.url,
            tech.stars || '',
            tech.lastUpdated,
            tech.source,
            tech.author || '',
            tech.language || '',
            tech.license || ''
          ].join(',');
        }).join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="ai-technologies-${timestamp}.csv"`);
        res.status(200).send(csvHeader + csvRows);
        break;
        
      case 'markdown':
        let markdown = `# AI 技术收集报告\n\n`;
        markdown += `**导出时间**: ${new Date().toLocaleString('zh-CN')}\n`;
        markdown += `**技术数量**: ${filteredTechnologies.length}\n\n`;
        
        const categoryGroups = filteredTechnologies.reduce((groups, tech) => {
          if (!groups[tech.category]) {
            groups[tech.category] = [];
          }
          groups[tech.category].push(tech);
          return groups;
        }, {} as Record<string, AITechnology[]>);
        
        const categoryNames: Record<string, string> = {
          'open-source': '开源项目',
          'closed-source': '闭源产品',
          'paper': '学术论文',
          'application': '应用案例',
          'frontier': '前沿技术'
        };
        
        Object.entries(categoryGroups).forEach(([category, techs]) => {
          markdown += `## ${categoryNames[category] || category}\n\n`;
          techs.forEach(tech => {
            markdown += `### [${tech.title}](${tech.url})\n\n`;
            markdown += `${tech.description}\n\n`;
            markdown += `**标签**: ${tech.tags.join(', ')}\n`;
            markdown += `**来源**: ${tech.source}\n`;
            if (tech.author) markdown += `**作者**: ${tech.author}\n`;
            if (tech.stars) markdown += `**Stars**: ${tech.stars}\n`;
            markdown += `**更新时间**: ${tech.lastUpdated}\n\n`;
            markdown += '---\n\n';
          });
        });
        
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename="ai-technologies-${timestamp}.md"`);
        res.status(200).send(markdown);
        break;
        
      default:
        res.status(400).json({ error: 'Unsupported format. Use json, csv, or markdown.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}