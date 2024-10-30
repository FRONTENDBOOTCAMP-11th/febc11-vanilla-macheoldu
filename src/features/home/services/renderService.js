import { utils } from '../utils.js';

/**
 * 화면 렌더링 서비스
 * HTML 요소들을 생성하고 화면에 표시하는 기능을 담당
 */
export const renderService = {
  /**
   * 작가 정보를 HTML로 변환하는 함수
   * 작가의 이름, 직업, 이미지, 소개 등을 포함한 카드를 생성
   */
  renderAuthorInfo: author => {
    return `
        <article class="main__featured-author__content">
          <div class="main__featured-author__info-wrapper">
            <div class="main__featured-author__info">
              <h3 class="main__featured-author__name">${author.name}</h3>
              ${author.extra?.job ? `<p class="main__featured-author__role">${author.extra.job}</p>` : ''}
            </div>
            <a href="/src/features/author/author.html?userId=${author._id}" target="_blank">
              <img
                src="${utils.getImgUrl(author.image)}"
                alt="${author.name}"
                class="main__featured-author__image"
              />
            </a>
          </div>
          ${
            author.extra?.biography
              ? `<p class="main__featured-author__description">${author.extra.biography.slice(0, 50)}...</p>`
              : ''
          }
        </article>
      `;
  },

  renderAuthorPosts: posts => {
    if (!posts.length) return '';

    const postsHTML = posts
      .map(
        (post, index) => `
        <li class="main__featured-author__books-item">
          <div class="main__featured-author__books-image-wrapper">
            <a href="/src/features/detail/detail.html?postId=${post._id}" target="_blank">
              <img
                src="${utils.getPlaceholderImage('authorBook', index + 1)}"
                alt="${post.title}"
                class="main__featured-author__books-image"
                onerror="this.src='${utils.getAssetUrl('image', 'book1.png')}'"
              />
            </a>
          </div>
          <div class="main__featured-author__books-info">
            <h3 class="main__featured-author__books-title">${post.title}</h3>
            <p class="main__featured-author__books-description">${utils.truncateText(post.content, 50)}</p>
          </div>
        </li>
      `,
      )
      .join('');

    return `<ul class="main__featured-author__books">${postsHTML}</ul>`;
  },

  renderWeeklyPost: (post, index) => {
    return `
        <li class="weekly-serial__item">
          <article class="weekly-serial__info">
            <h3 class="weekly-serial__title">${post.extra?.subTitle || ''}</h3>
            <p class="weekly-serial__details">${post.title}
              ${
                utils.isNewPost(post.createdAt)
                  ? `<img src="${utils.getAssetUrl('icon', 'status/new.svg')}" alt="새 글" class="weekly-serial__new" />`
                  : ''
              }
            </p>
            <p class="weekly-serial__author">
              <em>by</em> ${post.user.name}
            </p>
          </article>
          <img 
            src="${utils.getPlaceholderImage('pick', (index % 10) + 1)}"
            alt="${post.title}"
            class="weekly-serial__image"
            onerror="this.src='${utils.getAssetUrl('image', 'serial1.png')}'"
          />
        </li>
      `;
  },

  renderTodaysPick: posts => {
    const postsHTML = posts
      .slice(0, 10)
      .map(
        (post, index) => `
            <li class="main__todays-pick__item">
              <a href="/src/features/detail/detail.html?postId=${post._id}" target="_blank">
                <div class="main__todays-pick__info">
                  <div class="main__todays-pick__text">
                    <h3 class="main__todays-pick__item-title">${post.title}</h3>
                    <p class="main__todays-pick__author">
                      <em style="font-family: Georgia">by</em> ${post.user.name}
                    </p>
                    <p class="main__todays-pick__description">${utils.truncateText(post.content, 100)}</p>
                  </div>
                  <img
                    src="${post.image?.[0] ? utils.getImgUrl(post.image[0]) : utils.getPlaceholderImage('pick', Math.floor(Math.random() * 10) + 1)}"
                    alt="${post.title}"
                    class="main__todays-pick__image"
                    onerror="this.src='${utils.getAssetUrl('image', 'pick1.png')}'"
                  />
                </div>
              </a>
            </li>
          `,
      )
      .join('');

    const $container = document.querySelector('.main__todays-pick__list');
    if ($container) {
      $container.innerHTML = postsHTML;
    }
  },
};
