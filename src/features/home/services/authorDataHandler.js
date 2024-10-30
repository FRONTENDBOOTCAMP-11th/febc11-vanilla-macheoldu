import axios from 'axios';
import CONFIG from '../config.js';
import { utils } from '../utils.js';
import { renderService } from './renderService.js';
import { storageService } from './storageService.js';
import { authorService } from './authorService.js';
import { featuredBookService } from './featuredBookService.js';
import { initializeTopAuthors } from '../components/topAuthors.js';

// 게시글 API 주소 상수
const POSTS_API_ADDRESS = '/posts?type=info';

/**
 * axios 인스턴스 생성
 * - baseURL: 모든 요청의 기본이 되는 서버 주소
 * - headers: 서버와 통신할 때 필요한 인증 정보
 */
const api = axios.create({
  baseURL: CONFIG.API.BASE_URL,
  headers: CONFIG.API.HEADERS,
});

/**
 * 저장된 작가 데이터를 처리하는 함수
 * 로컬 스토리지에 저장된 작가 정보를 화면에 표시하고,
 * 추가로 필요한 데이터를 서버에서 가져옴
 *
 * @param {Object} storedData - 저장된 작가 데이터
 * @param {Object} featuredBook - 추천 도서 정보
 * @param {Element} $featuredBookSection - 추천 도서를 표시할 DOM 요소
 */
export const handleStoredAuthorData = async (
  storedData,
  featuredBook,
  $featuredBookSection,
) => {
  // 1. 저장된 작가 정보를 화면에 표시
  const $featuredAuthor = document.querySelector('.main__featured-author');
  $featuredAuthor.innerHTML = `
      <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
      ${renderService.renderAuthorInfo(storedData.author)}
      ${renderService.renderAuthorPosts(storedData.posts)}
    `;

  // 2. 최근 2주간의 인기 게시글 데이터 요청
  const apiUrl = `${POSTS_API_ADDRESS}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -14)}","$lt":"${utils.calculateDate()}"}}`;
  console.log('API URL:', apiUrl);

  const response = await api.get(apiUrl);
  console.log('API Response:', response.data);

  // 3. 추천 도서가 없는 경우 새로 선택
  if (!featuredBook) {
    featuredBook = featuredBookService.getRandomBook(response.data.item);
    if (featuredBook && $featuredBookSection) {
      storageService.storeFeaturedBook(featuredBook);
      $featuredBookSection.innerHTML =
        featuredBookService.renderFeaturedBook(featuredBook);
    }
  }

  // 4. 인기 게시글과 구독 작가 목록 표시
  renderService.renderTodaysPick(response.data.item);
  await initializeTopAuthors();
};

/**
 * 새로운 데이터를 처리하는 함수
 * 서버에서 새로운 데이터를 가져와 화면을 구성
 *
 * @param {Element} $featuredBookSection - 추천 도서 섹션 요소
 * @param {Object} featuredBook - 추천 도서 정보
 */
export const handleNewData = async ($featuredBookSection, featuredBook) => {
  // 1. 작가와 게시글 데이터를 동시에 요청
  const [usersResponse, postsResponse] = await Promise.all([
    api.get('/users'),
    api.get(POSTS_API_ADDRESS),
  ]);

  const posts = postsResponse.data.item;

  // 2. 추천 도서 처리
  if (!featuredBook) {
    featuredBook = featuredBookService.getRandomBook(posts);
    if (featuredBook && $featuredBookSection) {
      storageService.storeFeaturedBook(featuredBook);
      $featuredBookSection.innerHTML =
        featuredBookService.renderFeaturedBook(featuredBook);
    }
  }

  // 3. 랜덤 작가 선택 및 처리
  const randomAuthor = authorService.getRandomTodaysAuthor(
    usersResponse.data.item,
    posts,
  );

  if (randomAuthor) {
    const authorPosts = authorService.getAuthorsPosts(posts, randomAuthor._id);
    if (authorPosts.length > 0) {
      handleNewAuthorData(randomAuthor, authorPosts);
    }
  }

  // 4. 인기 게시글 데이터 요청 및 표시
  const todaysPickResponse = await api.get(
    `${POSTS_API_ADDRESS}&sort={"views":-1}&custom={"createdAt":{"$gte":"${utils.calculateDate('day', -14)}","$lt":"${utils.calculateDate()}"}}`,
  );

  renderService.renderTodaysPick(todaysPickResponse.data.item);
  await initializeTopAuthors();
};

/**
 * 새로운 작가 데이터를 처리하는 함수
 * 작가 정보를 저장하고 화면에 표시
 *
 * @param {Object} author - 작가 정보
 * @param {Array} posts - 작가의 게시글 목록
 */
export const handleNewAuthorData = (author, posts) => {
  // 1. 작가 데이터를 로컬 스토리지에 저장
  storageService.storeAuthorData(author, posts);

  // 2. 화면에 작가 정보 표시
  const $featuredAuthor = document.querySelector('.main__featured-author');
  $featuredAuthor.innerHTML = `
      <h2 class="main__featured-author__title" aria-labelledby="featuredAuthorTitle">오늘의 작가</h2>
      ${renderService.renderAuthorInfo(author)}
      ${renderService.renderAuthorPosts(posts)}
    `;
};
