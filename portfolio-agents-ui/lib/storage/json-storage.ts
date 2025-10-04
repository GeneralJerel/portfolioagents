import fs from 'fs/promises';
import path from 'path';
import { ResumeJSON } from '@/lib/schemas/resume-schema';

const DATA_DIR = path.join(process.cwd(), 'data', 'portfolios');

export async function savePortfolio(
  id: string,
  data: ResumeJSON
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, `${id}.json`),
    JSON.stringify(data, null, 2)
  );
}

export async function getPortfolio(id: string): Promise<ResumeJSON | null> {
  try {
    const content = await fs.readFile(
      path.join(DATA_DIR, `${id}.json`),
      'utf-8'
    );
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function getPortfolioBySlug(slug: string): Promise<ResumeJSON | null> {
  try {
    const files = await fs.readdir(DATA_DIR);
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
      const data = JSON.parse(content);
      
      if (data.page?.slug === slug) {
        return data;
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function getAllPortfolios(): Promise<ResumeJSON[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const files = await fs.readdir(DATA_DIR);
    
    const portfolios = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
          return JSON.parse(content);
        })
    );
    
    return portfolios;
  } catch {
    return [];
  }
}
