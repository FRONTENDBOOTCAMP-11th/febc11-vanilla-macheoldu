import CONFIG from './config.js';

/**
 * 유틸리티 함수들을 모아둔 객체
 * 자주 사용되는 편리한 기능들을 모아놓은 도구 상자와 같음.
 */
export const utils = {
  /**
   * 날짜를 계산하는 함수
   * @param {string} type - 계산할 단위 (year/month/day)
   * @param {number} value - 더하거나 뺄 값
   * @param {number} year - 특정 연도 (선택사항)
   * @param {number} month - 특정 월 (선택사항)
   * @param {number} day - 특정 일 (선택사항)
   * @returns {string} 계산된 날짜를 형식화한 문자열
   *
   * 예시:
   * calculateDate('day', -3) // 3일 전 날짜
   * calculateDate('month', 1) // 1달 후 날짜
   */
  calculateDate: (type, value, year, month, day) => {
    const baseDate = new Date();

    if (year !== undefined) baseDate.setFullYear(year);
    if (month !== undefined) baseDate.setMonth(month - 1);
    if (day !== undefined) baseDate.setDate(day);

    if (type) {
      switch (type.toLowerCase()) {
        case 'year':
          baseDate.setFullYear(baseDate.getFullYear() + value);
          break;
        case 'month':
          baseDate.setMonth(baseDate.getMonth() + value);
          break;
        case 'day':
          baseDate.setDate(baseDate.getDate() + value);
          break;
        default:
          throw new Error(
            '유효하지 않은 타입입니다. year, month, day 중 하나를 사용하세요.',
          );
      }
    }

    return utils.formatDate(baseDate);
  },

  /**
   * 날짜를 형식화하는 함수
   * 날짜 객체를 'YYYY.MM.DD HH:mm:ss' 형식의 문자열로 반환
   */
  formatDate: date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  },

  /**
   * 이미지 URL을 생성하는 함수
   * sever 이미지 경로를 전체 URL로 반환
   */
  getImgUrl: imgPath => `${CONFIG.API.BASE_URL}${imgPath}`,

  /**
   * 요일을 가져오는 함수들
   * - getWeekDay : 주어진 날짜의 요일을 반환
   * - getCurrentDay : 오늘의 요일을 반환
   */
  getWeekday: dateString => CONFIG.DAYS[new Date(dateString).getDay()],
  getCurrentDay: () => CONFIG.DAYS[new Date().getDay()],

  /**
   * 새 글인지 확인하는 함수
   * 게시글이 48시간(2일) 이내에 작성되었는지 확인
   */
  isNewPost: createdAt => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffHours = (now - postDate) / (1000 * 60 * 60);
    return diffHours <= 48;
  },

  /**
   * 긴 텍스트를 지정된 길이로 자르는 함수
   * HTML 태그를 제거하고 텍스트만 추출해서 자름
   */
  truncateText: (text, length) => {
    return (
      text
        .replace(/<[^>]*>/g, '') // HTML 태그 제거
        .trim() // 앞뒤 공백 제거
        .slice(0, length) + '...' // 지정된 길이만큼 자르고 ... 추가
    );
  },

  /**
   * 정적 자산(이미지/아이콘 등)의 URL을 생성하는 함수
   * @param {string} type - 자산 유형 (image/icon/logo)
   * @param {string} filename - 파일 이름
   */
  getAssetUrl: (type, filename) => {
    let basePath;
    switch (type) {
      case 'image':
        basePath = CONFIG.ASSETS.IMAGES_PATH;
        break;
      case 'icon':
        basePath = CONFIG.ASSETS.ICONS_PATH;
        break;
      case 'logo':
        basePath = CONFIG.ASSETS.LOGOS_PATH;
        break;
      default:
        throw new Error('Invalid asset type');
    }
    return new URL(`${basePath}/${filename}`, import.meta.url).href;
  },

  /**
   * 플레이스 홀더 이미지 URL을 생성하는 함수
   * 이미지가 없을 때 사용할 대체 이미지 주소를 반환
   */
  getPlaceholderImage: (type, index) => {
    const filename = `${type}${index}.png`;
    return utils.getAssetUrl('image', filename);
  },
};
