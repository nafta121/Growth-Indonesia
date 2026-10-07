import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import articlesCache from './articles-cache.json';

export interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  author: string;
  readTime: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

const ARTICLES_PATH = path.join(process.cwd(), 'content/artikel');

export async function getArticleSlugs(): Promise<string[]> {
  try {
    if (existsSync(ARTICLES_PATH)) {
      const files = await fs.readdir(ARTICLES_PATH);
      return files.filter((file: string) => file.endsWith('.mdx'));
    }
  } catch (error) {
    console.error('Error reading article slugs:', error);
  }
  return articlesCache.map((art) => `${art.slug}.mdx`);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Security Fix: Sanitize user input to strictly prevent path traversal vulnerabilities.
  // Using path.basename ensures only the filename is extracted, mitigating directory escapes.
  const sanitizedSlug = path.basename(slug);
  const realSlug = sanitizedSlug.replace(/\.mdx$/, '');
  
  const filePath = path.join(ARTICLES_PATH, `${realSlug}.mdx`);
  if (existsSync(filePath)) {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const frontmatter: ArticleFrontmatter = {
        title: data.title || 'Untitled',
        date: data.date || '2026-06-24',
        description: data.description || '',
        image: data.image || 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || 'Admin',
        readTime: data.readTime || '5 min baca',
      };
      
      return {
        slug: realSlug,
        frontmatter,
        content,
      };
    } catch (error) {
      console.error(`Error reading article dynamically ${slug}:`, error);
    }
  }
  
  // Fallback to cache
  const cached = articlesCache.find((art) => art.slug === realSlug);
  if (cached) {
    return cached as Article;
  }
  
  return null;
}

let allArticlesCache: Omit<Article, 'content'>[] | null = null;

export async function getAllArticles(): Promise<Omit<Article, 'content'>[]> {
  if (allArticlesCache) {
    return allArticlesCache;
  }

  try {
    if (existsSync(ARTICLES_PATH)) {
      const slugs = await getArticleSlugs();
      const rawArticles = await Promise.all(slugs.map((slug) => getArticleBySlug(slug)));
      const articles = rawArticles
        .filter((article): article is Article => article !== null)
        .map(({ content, ...rest }) => rest);
        
      // Performance Optimization: Schwartzian transform (decorate-sort-undecorate)
      // Precomputes timestamps once per item (O(n)) to avoid redundant Date parsing inside the comparator (O(n log n)).
      allArticlesCache = articles
        .map((article) => ({
          article,
          timestamp: new Date(article.frontmatter.date).getTime(),
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(({ article }) => article);

      return allArticlesCache;
    }
  } catch (error) {
    console.error('Error fetching all articles:', error);
  }

  allArticlesCache = articlesCache.map(({ content, ...rest }) => rest);
  return allArticlesCache;
}
