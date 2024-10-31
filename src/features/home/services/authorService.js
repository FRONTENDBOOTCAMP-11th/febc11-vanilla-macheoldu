/**
 * 작가 관리 서비스
 * 작가 데이터를 처리하고 관리하는 기능을 담당
 */
export const authorService = {
  /**
   * 오늘의 작가를 랜덤하게 선택하는 함수
   * - 게시글이 있는 작가들 중에서만 선택
   * - type이 user인 작가만 선택 대상이 됨
   */
  getRandomTodaysAuthor: (authors, posts) => {
    // 게시글이 있는 type이 user인 작가만 필터링
    const userAuthors = authors.filter(
      author =>
        typeof author.posts !== 'undefined' &&
        author.posts > 0 &&
        author.type === 'user',
    );

    // 실제로 게시글이 있는 작가만 선택
    const authorsWithPosts = userAuthors.filter(author =>
      posts.some(post => post.user._id === author._id),
    );

    if (authorsWithPosts.length === 0) {
      console.error('작가가 작성한 글이 없습니다');
      return null;
    }

    // 랜덤하게 한 명의 작가 선택
    return authorsWithPosts[
      Math.floor(Math.random() * authorsWithPosts.length)
    ];
  },

  /**
   * 특정 작가의 게시글을 가져오는 함수
   * 최대 2개의 게시글만 반환
   */
  getAuthorsPosts: (posts, authorId) => {
    return posts.filter(post => post.user._id === authorId).slice(0, 2);
  },
};
