const fs = require('fs');

let content = fs.readFileSync('lib/mdx.ts', 'utf8');

content = content.replace(/<<<<<<< HEAD\nexport async function getAllArticles\(\): Promise<Omit<Article, 'content'>\[\]> \{\n=======\nlet allArticlesCache: Omit<Article, 'content'>\[\] \| null = null;\n\nexport function getAllArticles\(\): Omit<Article, 'content'>\[\] \{\n  if \(allArticlesCache\) \{\n    return allArticlesCache;\n  \}\n\n>>>>>>> origin\/main/g, `let allArticlesCache: Omit<Article, 'content'>[] | null = null;

export async function getAllArticles(): Promise<Omit<Article, 'content'>[]> {
  if (allArticlesCache) {
    return allArticlesCache;
  }`);

fs.writeFileSync('lib/mdx.ts', content);
