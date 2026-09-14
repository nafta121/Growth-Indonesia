const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ARTICLES_PATH = path.join(process.cwd(), 'content/artikel');
const CACHE_DIR = path.join(process.cwd(), 'lib');
const CACHE_PATH = path.join(CACHE_DIR, 'articles-cache.json');

async function getArticleSlugs() {
  if (!fs.existsSync(ARTICLES_PATH)) {
    return [];
  }
  const files = await fs.promises.readdir(ARTICLES_PATH);
  return files.filter((file) => file.endsWith('.mdx'));
}

async function getArticleBySlug(slug) {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(ARTICLES_PATH, `${realSlug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const frontmatter = {
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

async function getAllArticles() {
  const slugs = await getArticleSlugs();
  const articlesPromises = slugs.map(async (slug) => await getArticleBySlug(slug));
  const articlesArray = await Promise.all(articlesPromises);
  const articles = articlesArray.filter((article) => article !== null);
    
  return articles.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

(async () => {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      await fs.promises.mkdir(CACHE_DIR, { recursive: true });
    }

    const articles = await getAllArticles();
    await fs.promises.writeFile(CACHE_PATH, JSON.stringify(articles, null, 2), 'utf8');
    console.log(`Prebuild: Saved ${articles.length} articles to ${CACHE_PATH}`);
  } catch (error) {
    console.error('Error generating articles cache during prebuild:', error);
    process.exit(1);
  }
})();
