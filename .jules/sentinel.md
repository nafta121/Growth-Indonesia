## 2025-02-28 - Path Traversal Vulnerability in MDX Utility
**Vulnerability:** A critical path traversal vulnerability was identified in `lib/mdx.ts` where the `getArticleBySlug` function read files dynamically using `fs.readFileSync(path.join(..., `${realSlug}.mdx`))` without sanitizing the `slug` parameter.
**Learning:** Functions used for dynamically reading local files are inherently vulnerable to path traversal (e.g. `../../etc/passwd`) if user-controlled input flows into the path resolution process, even if Next.js handles route parameters implicitly.
**Prevention:** Always enforce strict input sanitization on parameters used in file system operations. A regex such as `replace(/[^a-zA-Z0-9-_]/g, '')` ensures only valid, safe characters form the file path.
