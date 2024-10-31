import CONFIG from '../config.js';
import { utils } from '../utils.js';

// 추천 도서 서비스 객체
export const featuredBookService = {
  getRandomBook: posts => {
    if (!posts || posts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * posts.length);
    const post = posts[randomIndex];
    const quote = featuredBookService.extractRandomQuote(post.content);

    return {
      title: post.title,
      author: post.user.name,
      quote: quote,
    };
  },

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

  renderFeaturedBook: bookData => {
    if (!bookData) return '';

    return `
        <div class="main__featured-book-content">
          <div class="main__featured-book-info">
            <h3 class="main__featured-book-title">${bookData.title}</h3>
            <p class="main__featured-book-author"><em>by</em> ${bookData.author}</p>
          </div>
  
          <div class="main__featured-book-image-container">
            <a href="/src/features/detail/detail.html?postId=${bookData._id}" target="_blank">
              <img
                src="${bookData.image?.[0] ? `${CONFIG.API.BASE_URL}${bookData.image[0]}` : utils.getAssetUrl('image', 'featuredBook.png')}"
                alt="${bookData.title} 책 표지 이미지"
                class="main__featured-book-image"
                onerror="this.src='${utils.getAssetUrl('image', 'featuredBook.png')}'"
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
