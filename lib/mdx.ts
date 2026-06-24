import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_PATH)) {
    return [];
  }
  return fs.readdirSync(ARTICLES_PATH).filter((file) => file.endsWith('.mdx'));
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(ARTICLES_PATH, `${realSlug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
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
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): Omit<Article, 'content'>[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => {
      const article = getArticleBySlug(slug);
      if (!article) return null;
      const { content, ...rest } = article;
      return rest;
    })
    .filter((article): article is Omit<Article, 'content'> => article !== null);
    
  return articles.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}
