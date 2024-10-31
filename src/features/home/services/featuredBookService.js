import { utils } from '../utils.js';

/**
 * 추천 도서 서비스 객체
 * 도서 선택, 인용구 추출, 화면 렌더링 등의 기능을 제공
 */
export const featuredBookService = {
  /**
   * 게시글 목록에서 랜덤으로 하나의 도서를 선택
   * @param {Array} posts - 게시글 목록
   * @returns {Object|null} 선택된 도서 정보
   */
  getRandomBook: posts => {
    if (!posts || posts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * posts.length);
    const post = posts[randomIndex];
    const quote = featuredBookService.extractRandomQuote(post.content);

    return {
      title: post.title,
      author: post.user.name,
      quote: quote,
      postId: post._id, // postId를 추가
    };
  },

  /**
   * 게시글 내용에서 랜덤으로 인용구를 추출
   * @param {string} content - 게시글 내용
   * @returns {string|null} 추출된 인용구
   */
  extractRandomQuote: content => {
    const plainText = content.replace(/<[^>]*>/g, '');
    const sentences = plainText
      .split(/[.!?]/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 10 && sentence.length < 100);

    if (sentences.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  },

  /**
   * 추천 도서 정보를 HTML로 렌더링
   * @param {Object} bookData - 도서 정보
   * @returns {string} 렌더링된 HTML
   */
  renderFeaturedBook: bookData => {
    if (!bookData) return '';

    return `
        <div class="main__featured-book-content">
          <div class="main__featured-book-info">
            <h3 class="main__featured-book-title">${bookData.title}</h3>
            <p class="main__featured-book-author"><em>by</em> ${bookData.author}</p>
          </div>
  
          <div class="main__featured-book-image-container">
            <a href="/src/features/detail/detail.html?postId=${bookData.postId}" class="main__logo-link">
              <img
                src="${utils.getAssetUrl('image', 'featuredBook.png')}"
                alt="${bookData.title} 책 표지 이미지"
                class="main__featured-book-image"
              />
            </a>
          </div>
        </div>
  
        <div class="main__featured-book-quote">
          <div class="main__featured-book-quote-label-container">
            <p class="main__featured-book-quote-label">책 속 한 구절 ——</p>
            
              <img
                src="${utils.getAssetUrl('logo', 'logo_symbol.svg')}"
                alt="브런치스토리 로고 심볼"
                class="main__logo-symbol"
                width="18px"
                height="18px"
              />
            
          </div>
          <div class="main__featured-book-quote-text">
            ${bookData.quote || '여행의 끝에서 일상으로 돌아오는 것은 몸의 기억을 되살리는 일이다.'}
          </div>
        </div>
      `;
  },
};
