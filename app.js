import { API_KEY } from './config.js';

const newsList = document.getElementById('news-list');

const ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

async function fetchNews() {
  try {
    const response = await fetch(ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP Error :  ${response.status}`);
    }

    const data = await response.json();

    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching news: ', error);

    newsList.innerHTML = `<li>Error loading news. Please try again later.</li>`;
  }
}

async function getCountries() {
  const { data } = await supabase.from('countries').select();
  setCountries(data);
}

function displayNews(articles) {
  newsList.innerHTML = '';

  articles.forEach((article) => {
    const newsItem = document.createElement('li');
    newsItem.innerHTML = `<h2>${article.title}</h2><p>${
      article.description || 'No description available.'
    }</p><a href="${article.url}" target="_blank">Read more</a>`;
    newsList.appendChild(newsItem);
  });
}

fetchNews();
