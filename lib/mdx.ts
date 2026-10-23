import path from 'path';
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

const articles = articlesCache as Article[];
const articlesList: Omit<Article, 'content'>[] = articles.map(({ content: _, ...rest }) => rest);

export async function getArticleSlugs(): Promise<string[]> {
  return articles.map((art) => `${art.slug}.mdx`);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const realSlug = path.basename(slug).replace(/\.mdx$/, '');
  return articles.find((art) => art.slug === realSlug) || null;
}

export async function getAllArticles(): Promise<Omit<Article, 'content'>[]> {
  return articlesList;
}
