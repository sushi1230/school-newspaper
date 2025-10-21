/**
 * Google Drive and Sheets Service
 * Handles all interactions with Google APIs to fetch articles and metadata
 */

import axios from 'axios';

// Cache configuration
const CACHE = new Map();
const CACHE_DURATION = parseInt(import.meta.env.VITE_CACHE_DURATION_MS) || 3600000; // 1 hour default
const CACHE_ENABLED = import.meta.env.VITE_CACHE_ENABLED !== 'false';

// Google API configuration
const SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DOCS_API_URL = 'https://docs.googleapis.com/v1/documents';

const SHEETS_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;
const DRIVE_FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Utility: Check if cached data is still valid
function isCacheValid(timestamp) {
  return CACHE_ENABLED && (Date.now() - timestamp) < CACHE_DURATION;
}

// Utility: Get from cache
function getFromCache(key) {
  const cached = CACHE.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    console.log(`Cache hit for: ${key}`);
    return cached.data;
  }
  CACHE.delete(key);
  return null;
}

// Utility: Save to cache
function saveToCache(key, data) {
  if (CACHE_ENABLED) {
    CACHE.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}

/**
 * Fetch all articles from the master Google Sheet
 * Expected sheet structure:
 * - Column A: Title
 * - Column B: Author
 * - Column C: Category
 * - Column D: Date (YYYY-MM-DD)
 * - Column E: Google Doc ID
 * - Column F: Featured (TRUE/FALSE)
 * - Column G: Excerpt
 * - Column H: Image URL (optional)
 */
export async function getAllArticles() {
  const cacheKey = 'all_articles';
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    if (!SHEETS_ID || !API_KEY) {
      throw new Error('Google Sheets ID or API Key not configured. Check .env.local file.');
    }

    const response = await axios.get(
      `${SHEETS_API_URL}/${SHEETS_ID}/values/Articles!A2:H1000`,
      {
        params: {
          key: API_KEY
        }
      }
    );

    const rows = response.data.values || [];
    const articles = rows.map((row, index) => ({
      id: `article_${index}`,
      title: row[0] || '',
      author: row[1] || '',
      category: row[2] || 'Uncategorized',
      date: row[3] || new Date().toISOString().split('T')[0],
      googleDocId: row[4] || '',
      featured: row[5]?.toLowerCase() === 'true',
      excerpt: row[6] || '',
      imageUrl: row[7] || '',
      contentUrl: `https://docs.google.com/document/d/${row[4]}/edit?usp=sharing`
    })).filter(article => article.googleDocId); // Only include articles with valid doc IDs

    console.log(`Fetched ${articles.length} articles from Google Sheets`);
    saveToCache(cacheKey, articles);
    return articles;
  } catch (error) {
    console.error('Error fetching articles from Google Sheets:', error.message);
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }
}

/**
 * Fetch a specific Google Doc's content
 * Returns the text content of the document
 */
export async function getGoogleDocContent(docId) {
  const cacheKey = `doc_content_${docId}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    if (!API_KEY) {
      throw new Error('Google API Key not configured');
    }

    const response = await axios.get(
      `${DOCS_API_URL}/${docId}`,
      {
        params: {
          key: API_KEY
        }
      }
    );

    const doc = response.data;
    const content = extractTextFromDocument(doc);

    saveToCache(cacheKey, content);
    return content;
  } catch (error) {
    console.error(`Error fetching Google Doc ${docId}:`, error.message);
    throw new Error(`Failed to fetch document: ${error.message}`);
  }
}

/**
 * Extract text content from Google Docs API response
 */
function extractTextFromDocument(doc) {
  let text = '';

  if (doc.body && doc.body.content) {
    doc.body.content.forEach(element => {
      if (element.paragraph) {
        element.paragraph.elements?.forEach(el => {
          if (el.textRun) {
            text += el.textRun.content;
          }
        });
        text += '\n';
      }
    });
  }

  return text.trim();
}

/**
 * Get featured article(s)
 * Returns articles where featured = TRUE
 */
export async function getFeaturedArticles() {
  const articles = await getAllArticles();
  return articles.filter(article => article.featured).slice(0, 1); // Return first featured
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category) {
  const articles = await getAllArticles();
  return articles.filter(article => article.category === category);
}

/**
 * Get all unique categories
 */
export async function getCategories() {
  const cacheKey = 'categories';
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const articles = await getAllArticles();
  const categories = [...new Set(articles.map(a => a.category))].sort();

  saveToCache(cacheKey, categories);
  return categories;
}

/**
 * Search articles by title or excerpt
 */
export async function searchArticles(query) {
  const articles = await getAllArticles();
  const lowerQuery = query.toLowerCase();

  return articles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.author.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Clear all caches (useful for manual refresh)
 */
export function clearCache() {
  CACHE.clear();
  console.log('Cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: CACHE.size,
    enabled: CACHE_ENABLED,
    duration: CACHE_DURATION
  };
}

export default {
  getAllArticles,
  getGoogleDocContent,
  getFeaturedArticles,
  getArticlesByCategory,
  getCategories,
  searchArticles,
  clearCache,
  getCacheStats
};
