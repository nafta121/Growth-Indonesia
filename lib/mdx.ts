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

const isNode = typeof window === 'undefined' && typeof process !== 'undefined' && process.release?.name === 'node';

function getFs() {
  if (isNode) {
    try {
      return require('fs');
    } catch {
      return null;
    }
  }
  return null;
}

function getPath() {
  if (isNode) {
    try {
      return require('path');
    } catch {
      return null;
    }
  }
  return null;
}

const ARTICLES_PATH = isNode ? getPath()?.join(process.cwd(), 'content/artikel') : '';

export function getArticleSlugs(): string[] {
  const fs = getFs();
  if (fs && ARTICLES_PATH && fs.existsSync(ARTICLES_PATH)) {
    return fs.readdirSync(ARTICLES_PATH).filter((file: string) => file.endsWith('.mdx'));
  }
  return articlesCache.map((art) => `${art.slug}.mdx`);
}

export function getArticleBySlug(slug: string): Article | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  
  const fs = getFs();
  if (fs && ARTICLES_PATH) {
    const pathModule = getPath();
    const filePath = pathModule ? pathModule.join(ARTICLES_PATH, `${realSlug}.mdx`) : '';
    if (filePath && fs.existsSync(filePath)) {
      try {
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
        console.error(`Error reading article dynamically ${slug}:`, error);
      }
    }
  }
  
  // Fallback to cache
  const cached = articlesCache.find((art) => art.slug === realSlug);
  if (cached) {
    return cached as Article;
  }
  
  return null;
}

export function getAllArticles(): Omit<Article, 'content'>[] {
  const fs = getFs();
  if (fs && ARTICLES_PATH && fs.existsSync(ARTICLES_PATH)) {
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

  return articlesCache.map(({ content, ...rest }) => rest);
}
