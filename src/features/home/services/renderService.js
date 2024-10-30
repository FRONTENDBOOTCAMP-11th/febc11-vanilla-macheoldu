import { utils } from '../utils.js';

/**
 * 화면 렌더링 서비스
 * HTML 요소들을 생성하고 화면에 표시하는 기능을 담당
 */
export const renderService = {
  /**
   * 게시글의 순위 변동을 체크하는 함수
   * @param {Object} post - 게시글 정보
   * @param {number} currentRank - 현재 순위 (1부터 시작)
   * @returns {Object} - isNew: 새로운 글인지 여부, hasRankUp: 순위 상승 여부
   */
  checkRankStatus: (post, currentRank) => {
    try {
      const prevRankData = JSON.parse(
        localStorage.getItem('prevTodaysPick') || '[]',
      );

      // 이전 순위 찾기
      const prevRank = prevRankData.findIndex(item => item._id === post._id);

      // 새 글 판단 (3일 이내 작성된 글)
      const isNew = utils.isNewPost(post.createdAt);

      // 이전 데이터에 없거나 순위가 상승한 경우
      const hasRankUp = prevRank !== -1 && currentRank < prevRank + 1;

      return { isNew, hasRankUp };
    } catch (error) {
      console.error('순위 체크 중 오류 발생:', error);
      return { isNew: false, hasRankUp: false };
    }
  },

  /**
   * 순위 변동 표시 HTML을 생성하는 함수
   */
  renderRankIndicator: (isNew, hasRankUp) => {
    if (isNew) {
      return '<span class="rank-indicator rank-indicator--new">NEW</span>';
    }
    if (hasRankUp) {
      return `<span class="rank-indicator rank-indicator--up">
        <img src="/assets/icons/etc/todaysTop.svg" alt="순위 상승" class="rank-up-icon" />
      </span>`;
    }
    return '';
  },

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
    const currentPosts = posts.slice(0, 10);

    // 현재 데이터 저장 전에 이전 데이터 백업
    const prevData = localStorage.getItem('prevTodaysPick');
    if (prevData && !localStorage.getItem('tempPrevTodaysPick')) {
      localStorage.setItem('tempPrevTodaysPick', prevData);
    }

    const postsHTML = currentPosts
      .map((post, index) => {
        const { isNew, hasRankUp } = renderService.checkRankStatus(
          post,
          index + 1,
        );
        const rankIndicator = renderService.renderRankIndicator(
          isNew,
          hasRankUp,
        );

        return `
          <li class="main__todays-pick__item">
            <a href="/src/features/detail/detail.html?postId=${post._id}" target="_blank">
              <div class="main__todays-pick__info">
                <div class="main__todays-pick__text">
                  <h3 class="main__todays-pick__item-title">
                    ${rankIndicator}
                    ${post.title}
                  </h3>
                  <p class="main__todays-pick__author">
                    <em style="font-family: Georgia">by</em> ${post.user.name}
                  </p>
                  <p class="main__todays-pick__description">${utils.truncateText(
                    post.content,
                    100,
                  )}</p>
                </div>
                <img
                  src="${
                    post.image?.[0]
                      ? utils.getImgUrl(post.image[0])
                      : utils.getPlaceholderImage(
                          'pick',
                          Math.floor(Math.random() * 10) + 1,
                        )
                  }"
                  alt="${post.title}"
                  class="main__todays-pick__image"
                  onerror="this.src='${utils.getAssetUrl('image', 'pick1.png')}'"
                />
              </div>
            </a>
          </li>
        `;
      })
      .join('');

    const $container = document.querySelector('.main__todays-pick__list');
    if ($container) {
      $container.innerHTML = postsHTML;
    }

    // 현재 데이터를 저장하기 전에 이전 데이터 삭제
    localStorage.removeItem('tempPrevTodaysPick');
    // 현재 데이터 저장
    localStorage.setItem('prevTodaysPick', JSON.stringify(currentPosts));
  },
};
