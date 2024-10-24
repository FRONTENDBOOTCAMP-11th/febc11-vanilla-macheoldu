import moment from 'moment';

function getTime(day = 0, second = 0) {
  return moment().add(day, 'days').add(second, 'seconds').format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'admin@fesp.shop',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '무지',
        type: 'admin',
        loginType: 'email',
        image: `/files/${clientId}/user-muzi.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          job: '관리자',
        }
      },
      {
        _id: await nextSeq('user'),
        email: 'w1@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: 'AB',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          job: '마케터',
          biography: '서른살, 새내기 취준생',
          keyword: ['취업', '노션', '포트폴리오'],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'w2@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '자기반성',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          job: '자기탐구인문학 크리에이터',
          biography: '공상가, AB형, ENFP 성향을 똑 닮은 딸을 키우고 있는 해외맘. 세상의 모든 할머니, 엄마와 딸을 응원합니다. 열심히 일하며 생명체를 키워나가고 있습니다. 자기 탐구 인문학자',
          keyword: ['인문학', '공상가', '엄마'],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'w3@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: 'AI러 이채문',
        type: 'seller',
        loginType: 'kakao',
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-20, -60 * 22),
        updatedAt: getTime(-10, -60 * 11),
        extra: {
          job: 'edifice 매니저',
          biography: '프롬프트 기획 전문가 & GPT전문강사, 강연자',
          keyword: ['AI', 'GPT', '프롬프트', '강사'],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'heart@naver.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '하트핑',
        type: 'user',
        loginType: 'kakao',
        image: `/files/${clientId}/user-heartping.webp`,
        createdAt: getTime(-20, -60 * 22),
        updatedAt: getTime(-10, -60 * 11)
      },
      {
        _id: await nextSeq('user'),
        email: 'joy@daum.net',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '조이핑',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-joyping.webp`,
        createdAt: getTime(-20, -60 * 20),
        updatedAt: getTime(-10, -60 * 10),
        post: 2,
        bookmark: {
          users: 9,
        },
        bookmarkedBy: {
          users: 11,
        }
      },
      {
        _id: await nextSeq('user'),
        email: 'sparkle@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '스파클핑',
        type: 'user',
        loginType: 'kakao',
        image: `/files/${clientId}/user-sparkleping.webp`,
        createdAt: getTime(-18, -60 * 19),
        updatedAt: getTime(-9, -60 * 9),
        post: 0,
        bookmark: {
          users: 4,
        },
        bookmarkedBy: {
          users: 6,
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'love@hotmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '러브핑',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-loveping.webp`,
        createdAt: getTime(-17, -60 * 18),
        updatedAt: getTime(-8, -60 * 8),
        post: 2,
        bookmark: {
          users: 10,
        },
        bookmarkedBy: {
          users: 12,
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'twinkle@hanmail.net',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '트윙클핑',
        type: 'user',
        loginType: 'kakao',
        image: `/files/${clientId}/user-twinklingping.webp`,
        createdAt: getTime(-16, -60 * 17),
        updatedAt: getTime(-8, -60 * 7),
        post: 0,
        bookmark: {
          users: 3,
        },
        bookmarkedBy: {
          users: 2,
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'flower@yahoo.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '플라워핑',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-flowerping.webp`,
        createdAt: getTime(-15, -60 * 16),
        updatedAt: getTime(-7, -60 * 6),
        post: 4,
        bookmark: {
          users: 7,
        },
        bookmarkedBy: {
          users: 12,
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'cook@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '쿡핑',
        type: 'user',
        loginType: 'kakao',
        image: `/files/${clientId}/user-cookping.webp`,
        createdAt: getTime(-14, -60 * 15),
        updatedAt: getTime(-6, -60 * 5),
        post: 3,
        bookmark: {
          users: 12,
        },
        bookmarkedBy: {
          users: 4,
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'dream@outlook.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '드림핑',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-dreamping.webp`,
        createdAt: getTime(-13, -60 * 14),
        updatedAt: getTime(-5, -60 * 4),
        post: 0,
        bookmark: {
          users: 9,
        },
        bookmarkedBy: {
          users: 8,
        },
      }

    ],
    // 상품
    product: [],
    // 주문
    order: [],
    // 후기
    review: [],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [],
    // QnA, 공지사항, 게시판
    post: [
      {
        _id: await nextSeq('post'),
        type: 'info',
        title: '[취업특강] 노션 포트폴리오 만들기',
        extra: {
          subTitle: 'with 노슈니, 슈크림 마을, 마포청년나루',
        },
        views: 5,
        user: {
          _id: 2,
          name: 'AB',
          image: `/files/${clientId}/user-neo.webp`,
        },
        content: `
<div class="wrap_body text_align_left finish_txt">
  <blockquote class="blockquote_type1 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;quote&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;Intro&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="1" data-shown="true">Intro<br><br></blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;취업 준비를 위해 반드시 필요한 것 세 가지.&quot;}]}"
    data-block-index="2" data-shown="true">취업 준비를 위해 반드시 필요한 것 세 가지.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;자기소개서, 이력서, 포트폴리오&quot;}],&quot;styleType&quot;:&quot;bold&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;.&quot;}]}"
    data-block-index="3" data-shown="true"><b>자기소개서, 이력서, 포트폴리오</b>.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그중에서도 최근에는 포트폴리오 만들기에 돌입했다. &quot;}]}"
    data-block-index="4" data-shown="true">그중에서도 최근에는 포트폴리오 만들기에 돌입했다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;5월에 시험 삼아 입사지원을 해보면서 &quot;}]}"
    data-block-index="5" data-shown="true">5월에 시험 삼아&nbsp;입사지원을 해보면서&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;가장 부족하다고 느꼈던 부분이 바로 &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;포트폴리오&quot;}],&quot;styleType&quot;:&quot;bold&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;였기 때문이다. &quot;}]}"
    data-block-index="6" data-shown="true">가장 부족하다고 느꼈던 부분이 바로 <b>포트폴리오</b>였기 때문이다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="7" data-shown="true"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;당장 하반기에 다시 취업에 도전하기 위해서는 포트폴리오를 만들어두는 게 무엇보다 시급했기에&quot;}]}"
    data-block-index="8" data-shown="true">당장 하반기에 다시 취업에 도전하기 위해서는 포트폴리오를 만들어두는 게 무엇보다 시급했기에</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;열심히 서울몽땅정보통, 청년지원, 취업지원 사이트를 뒤지다가 나에게 딱! 맞는 지원사업을 발견했다. &quot;}]}"
    data-block-index="9" data-shown="true">열심히 서울몽땅정보통, 청년지원, 취업지원 사이트를 뒤지다가 나에게 딱! 맞는 지원사업을 발견했다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;바로 \u0027마포청년나루\u0027에서 진행하는 &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;\u0027합격을 부르는 노션 포트폴리오 만들기\u0027.&quot;}],&quot;styleType&quot;:&quot;bold&quot;}]}"
    data-block-index="10" data-shown="true">바로 '마포청년나루'에서 진행하는 <b>'합격을 부르는 노션 포트폴리오 만들기'.</b></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="11" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;수업은 2주간 매주 화, 금 두 번씩 총 4회기로 진행됐는데,&quot;}]}"
    data-block-index="12" data-shown="false">수업은 2주간 매주 화, 금 두 번씩 총 4회기로 진행됐는데,</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;결론부터 말하자면 &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;올해 한 일 중 가장 잘한 일&quot;}],&quot;styleType&quot;:&quot;bold&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;로 꼽을 수 있을 정도로 &quot;}]}"
    data-block-index="13" data-shown="false">결론부터 말하자면 <b>올해 한 일 중 가장 잘한 일</b>로 꼽을 수 있을 정도로&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;정말 많은 도움이 됐다.  &quot;}]}"
    data-block-index="14" data-shown="false">정말 많은 도움이 됐다.&nbsp;&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="15" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;강사님은 노션 앰배서더이자 노션 커뮤니티 &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;\u0027슈크림 마을\u0027 &quot;}],&quot;styleType&quot;:&quot;bold&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;대표 노슈니&quot;}],&quot;styleType&quot;:&quot;bold&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot; 님이었다.&quot;}]}"
    data-block-index="16" data-shown="false">강사님은 노션 앰배서더이자&nbsp;노션 커뮤니티 <b>'슈크림 마을'&nbsp;</b><b>대표 노슈니</b>&nbsp;님이었다.
  </p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;나는 노션 포트폴리오의 존재를 지난 5월 회사에 입사 지원을 하며 처음 알게 됐는데,&quot;}]}"
    data-block-index="17" data-shown="false">나는 노션 포트폴리오의 존재를 지난 5월 회사에 입사 지원을 하며 처음 알게 됐는데,</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;지원했던 회사의 채용 공고에 포트폴리오를 노션으로 제출해도 된다는 문구가 있었다.&quot;}]}"
    data-block-index="18" data-shown="false">지원했던 회사의 채용 공고에 포트폴리오를 노션으로 제출해도 된다는 문구가 있었다.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;얼마나 취준에 문외한이었는지를 알 수 있는 대목이지 않을까 싶다. &quot;}]}"
    data-block-index="19" data-shown="false">얼마나 취준에 문외한이었는지를 알 수 있는 대목이지 않을까 싶다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이런 이야기를 하는 이유는 나처럼 노션 포트폴리오의 존재조차 몰랐던 사람도 &quot;}]}"
    data-block-index="20" data-shown="false">이런 이야기를 하는 이유는 나처럼 노션 포트폴리오의 존재조차 몰랐던 사람도&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;노슈니님의 강의를 잘 듣고 따라 한다면 누구나 만들 수 있다는 걸 강조하고 싶어서다!&quot;}]}"
    data-block-index="21" data-shown="false">노슈니님의 강의를 잘 듣고 따라 한다면 누구나 만들 수 있다는 걸 강조하고 싶어서다!</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;지금부터 노션 포폴 강의에서 &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;가장 인상적이었던 것 세 가지&quot;}],&quot;styleType&quot;:&quot;underline&quot;}],&quot;styleType&quot;:&quot;bold&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;를 말해보려 한다. &quot;}]}"
    data-block-index="22" data-shown="false">지금부터 노션 포폴 강의에서 <b><u>가장 인상적이었던 것 세 가지</u></b>를 말해보려 한다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="23" data-shown="false"><br></p>
  <div class="wrap_item item_type_img img_align_center"
    data-app="{&quot;type&quot;:&quot;img&quot;,&quot;align&quot;:&quot;inner-center&quot;,&quot;mobileAlign&quot;:&quot;content-full&quot;,&quot;url&quot;:&quot;http://t1.daumcdn.net/brunch/service/user/2JnD/image/5-1w9PRjO4k8KzPx9nfeDWor9i8&quot;,&quot;caption&quot;:&quot;노션 알려주는 슈니. \u0027노슈니\u0027와 노션 꿀팁을 적극적으로 공유할 수 있는 노션 커뮤니티 \u0027슈크림 마을\u0027. 커뮤니티를 하나의 세계관으로 만든 것이 인상적이었다.  @no_shooni&quot;,&quot;width&quot;:&quot;500&quot;,&quot;height&quot;:&quot;250&quot;,&quot;originalName&quot;:&quot;&quot;}"
    data-block-index="24" data-shown="false">
    <div class="wrap_content mobile_align_content_full">
      <div class="wrap_img_inner_float">
        <div class="wrap_img_float" style="width: 500px"><img
            src="/files/${clientId}/no_shooni.jpg"
            alt="노션 알려주는 슈니. '노슈니'와 노션 꿀팁을 적극적으로 공유할 수 있는 노션 커뮤니티 '슈크림 마을'. 커뮤니티를 하나의 세계관으로 만든 것이 인상적이었다.&nbsp;&nbsp;@no_shooni"
            data-phocus-index="0"><span class="text_caption">노션 알려주는 슈니. '노슈니'와 노션 꿀팁을 적극적으로 공유할 수 있는 노션 커뮤니티 '슈크림 마을'.
            커뮤니티를 하나의 세계관으로 만든 것이 인상적이었다.&nbsp;&nbsp;@no_shooni</span></div>
      </div>
    </div>
  </div>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="25" data-shown="false"><br></p>
  <h2 class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}],&quot;styleType&quot;:&quot;bold&quot;}],&quot;size&quot;:&quot;h2&quot;}"
    data-block-index="26" data-shown="false"><b><br></b></h2>
  <blockquote class="blockquote_type1 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;quote&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;첫 번째) 해야 하는 / 하지 말아야 하는 5가지&quot;}]}"
    data-block-index="27" data-shown="false">첫 번째)&nbsp;해야 하는 / 하지 말아야 하는 5가지</blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="28" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;포트폴리오를 만들 때 취준생이 쉽게 실수하는 부분이나 놓치는 부분에 대한 설명이었다. &quot;}]}"
    data-block-index="29" data-shown="false">포트폴리오를 만들 때 취준생이 쉽게 실수하는 부분이나 놓치는 부분에 대한 설명이었다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="30" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;먼저 하지 말아야 하는 것 다섯 가지.&quot;}],&quot;styleType&quot;:&quot;bold&quot;}]}"
    data-block-index="31" data-shown="false"><b>먼저 하지 말아야 하는 것 다섯 가지.</b></p>
  <blockquote class="blockquote_type3 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;box&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 실패를 감추기 위해 경력을 숨기는 것&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 요약없이 내 이야기를 주절주절 늘어뜨리는 것&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 단순히 성과만 쭈욱 나열하는 것&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 직접 하지 않은 일을 기재하는 것&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• JD(Job Description)를 보지 않고 포트폴리오를 쓰는 것&quot;}]}"
    data-block-index="32" data-shown="false">• 실패를 감추기 위해 경력을 숨기는 것<br>• 요약없이 내 이야기를 주절주절 늘어뜨리는 것<br>• 단순히 성과만 쭈욱 나열하는
    것<br>• 직접 하지 않은 일을 기재하는 것<br>•&nbsp;JD(Job Description)를 보지 않고 포트폴리오를 쓰는 것</blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이 중에서도 가장 와닿았던 건 \u0027요약없이 내 이야기 주절주절\u0027이었는데,&quot;}]}"
    data-block-index="33" data-shown="false">이 중에서도 가장 와닿았던 건 '요약없이 내 이야기 주절주절'이었는데,</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;내가 포폴을 만들면서 가장 고민했던 지점도 &quot;}]}"
    data-block-index="34" data-shown="false">내가 포폴을 만들면서 가장 고민했던 지점도&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;\u0027나만 알고 있는 내가 맡은 프로젝트의 이 방대한 업무와 내 역할과 임팩트를&quot;}],&quot;styleType&quot;:&quot;underline&quot;}]}"
    data-block-index="35" data-shown="false"><u>'나만 알고 있는 내가 맡은 프로젝트의 이 방대한 업무와 내 역할과 임팩트를</u></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;어떻게 일목요연하게 보여주고 설득할 것인가\u0027&quot;}],&quot;styleType&quot;:&quot;underline&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;였기 때문이다. &quot;}]}"
    data-block-index="36" data-shown="false"><u>어떻게 일목요연하게 보여주고 설득할 것인가'</u>였기 때문이다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그리고 이것을 일정 부분 해결해 줄 수 있는 묘책도 알려주셨는데, 그것은 두 번째 챕터에서.. 투비 컨티뉴&quot;}]}"
    data-block-index="37" data-shown="false">그리고 이것을 일정 부분 해결해 줄 수 있는 묘책도 알려주셨는데, 그것은 두 번째 챕터에서.. 투비 컨티뉴</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="38" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;다음은 해야 하는 것 다섯 가지.&quot;}],&quot;styleType&quot;:&quot;bold&quot;}]}"
    data-block-index="39" data-shown="false"><b>다음은 해야 하는 것 다섯 가지.</b></p>
  <blockquote class="blockquote_type3 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;box&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 내가 만났던 문제들을 말해주기 &quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 주목할 만한 업적을 강조하기&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 결과만 나열하기보다 과정을 보여주기&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 시간 단위가 아닌 프로젝트 단위로 표현하기&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;• 시각적 자료 활용해 직관적으로 표현하기&quot;}]}"
    data-block-index="40" data-shown="false">• 내가 만났던 문제들을 말해주기&nbsp;<br>• 주목할 만한 업적을 강조하기<br>• 결과만 나열하기보다 과정을 보여주기<br>•
    시간 단위가 아닌 프로젝트 단위로 표현하기<br>• 시각적 자료 활용해 직관적으로 표현하기</blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;여기서 가장 강조하셨던 부분은 내가 만났던 문제와 그것을 해결했던 과정을 잘 드러내야 한다는 것이었다. &quot;}]}"
    data-block-index="41" data-shown="false">여기서 가장 강조하셨던 부분은 내가 만났던 문제와 그것을 해결했던 과정을 잘 드러내야 한다는 것이었다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;회사는 문제의 연속인 곳이기 때문에 지원자가 얼마나 많은 \u0027아이디어\u0027를 가지고 있느냐보다 회사가 가진 문제를 해결할 수 있는 \u0027문제 해결 역량\u0027이 있는지를 더욱 중요하게 보기 때문!&quot;}],&quot;styleType&quot;:&quot;underline&quot;}]}"
    data-block-index="42" data-shown="false"><u>회사는 문제의 연속인 곳이기 때문에 지원자가 얼마나 많은 '아이디어'를 가지고 있느냐보다 회사가 가진 문제를 해결할 수 있는
      '문제 해결 역량'이 있는지를 더욱 중요하게 보기 때문!</u></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;간혹 지원할 때 회사에서 무엇을 하고 싶냐고 묻는 질문에 이것저것 하고 싶은 것을 늘어뜨리고, 여러 아이디어를 제시하는 경우가 있는데, 회사 입장에서 지원자의 \u0027아이디어\u0027는 또 다른 \u0027문제\u0027로 다가올 수 있다고. &quot;}]}"
    data-block-index="43" data-shown="false">간혹 지원할 때 회사에서 무엇을 하고 싶냐고 묻는 질문에 이것저것 하고 싶은 것을 늘어뜨리고, 여러 아이디어를 제시하는 경우가 있는데,
    회사 입장에서 지원자의 '아이디어'는 또 다른 '문제'로 다가올 수 있다고.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;생각해 보니 이미 과제가 산적한 회사 입장에서는 그것을 쳐낼 줄 동료가 더 필요하지 거기에 문제와 과업을 더 얹을 사람을 반가워하지 않을 것 같다는 생각이 들었다. &quot;}]}"
    data-block-index="44" data-shown="false">생각해 보니 이미 과제가 산적한 회사 입장에서는 그것을 쳐낼 줄 동료가 더 필요하지 거기에 문제와 과업을 더 얹을 사람을 반가워하지
    않을 것 같다는 생각이 들었다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="45" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="46" data-shown="false"><br></p>
  <blockquote class="blockquote_type1 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;quote&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;두 번째) 키워드를 뽑아라&quot;}]}"
    data-block-index="47" data-shown="false">두 번째) 키워드를 뽑아라</blockquote>
  <div class="wrap_item item_type_img img_align_center"
    data-app="{&quot;type&quot;:&quot;img&quot;,&quot;align&quot;:&quot;inner-center&quot;,&quot;mobileAlign&quot;:&quot;content-full&quot;,&quot;url&quot;:&quot;http://t1.daumcdn.net/brunch/service/user/2JnD/image/vxsL_DUQmRA3n8FpVc1yFNaVaUs.png&quot;,&quot;caption&quot;:&quot;&quot;,&quot;width&quot;:&quot;400&quot;,&quot;height&quot;:&quot;267&quot;,&quot;originalName&quot;:&quot;스크린샷 2024-06-18 오후 8.53.20.png&quot;}"
    data-block-index="48" data-shown="false">
    <div class="wrap_content mobile_align_content_full">
      <div class="wrap_img_inner_float">
        <div class="wrap_img_float" style="width: 400px"><img
            src="/files/${clientId}/keyword.png"
            data-filename="keyword.png" alt="브런치 글 이미지 2" data-phocus-index="1"><span
            class="text_caption"></span></div>
      </div>
    </div>
  </div>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;위에서 말한 \u0027주절주절\u0027과 연결되는 포트폴리오 꿀팁. \u0027키워드\u0027로 말하라는 것.&quot;}]}"
    data-block-index="49" data-shown="false">위에서 말한 '주절주절'과 연결되는 포트폴리오 꿀팁. '키워드'로 말하라는 것.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;사실 나는 이 부분이 가장 어려웠는데,&quot;}]}"
    data-block-index="50" data-shown="false">사실 나는 이 부분이 가장 어려웠는데,</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;내가 그동안 일한 비영리 영역에서 쓰는 언어와 영리 기업의 언어가 완전히 다르기 때문이다. &quot;}]}"
    data-block-index="51" data-shown="false">내가 그동안 일한 비영리 영역에서 쓰는 언어와 영리 기업의 언어가 완전히 다르기 때문이다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;나처럼 주절주절을 어떻게 해야 할지 모르겠고, &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;style&quot;:{},&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;내가 지원하고자 하는 직무에 맞는 키워드를 찾기 어려운 사람들을 위해 강사님이 주신 꿀팁을 소개한다.&quot;}]}]}"
    data-block-index="52" data-shown="false">나처럼 주절주절을 어떻게 해야 할지 모르겠고,&nbsp;<span>내가 지원하고자 하는 직무에 맞는 키워드를 찾기 어려운 사람들을 위해
      강사님이 주신 꿀팁을 소개한다.</span></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="53" data-shown="false"><br></p>
  <blockquote class="blockquote_type2 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;bar&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;1. 플랫폼 활용하기 &quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그로우앤베터, 오픈애즈 등과 같은 플랫폼을 통해 자신이 지원하고자 하는 직무 트렌드와 필요 역량을 &quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;파악할 수 있다.&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot; &quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;2. AI 활용하기&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;너무 막막하다면 일단 주절주절 써놓은 프로젝트에 대한 설명을 AI를 통해 요약해 보는 것도 좋다. 실제로 나는 강사님이 직접 만드신 포트폴리오를 위한 AI챗봇을 써봤는데 적재적소에 쓸 수 있는 키워드를 건질 수 있어 좋았다.     &quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot; &quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;3. JD 분석 꼼꼼히 하기&quot;},{&quot;type&quot;:&quot;br&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;강사님이 여러 번 강조하신 채용/직무 분석! 회사가 반복해서 사용하는 단어는 없는지, 어떤 역량을 중요하게 생각하는지를 잘 파악해서 내 포폴에도 녹여내는 것이 중요하다.  &quot;},{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="54" data-shown="false">1. 플랫폼 활용하기 <br>그로우앤베터, 오픈애즈 등과 같은 플랫폼을 통해 자신이 지원하고자 하는 직무 트렌드와 필요
    역량을&nbsp;<br>파악할 수 있다.<br>&nbsp;<br>2. AI 활용하기<br>너무 막막하다면 일단 주절주절 써놓은 프로젝트에 대한 설명을 AI를 통해 요약해 보는&nbsp;것도 좋다. 실제로 나는
    강사님이 직접 만드신 포트폴리오를 위한 AI챗봇을 써봤는데 적재적소에 쓸 수 있는 키워드를 건질 수 있어 좋았다.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;<br>3. JD 분석
    꼼꼼히 하기<br>강사님이 여러 번 강조하신 채용/직무 분석! 회사가 반복해서 사용하는 단어는 없는지, 어떤 역량을 중요하게 생각하는지를 잘 파악해서 내 포폴에도 녹여내는 것이
    중요하다.&nbsp;&nbsp;<br></blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="55" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="56" data-shown="false"><br></p>
  <blockquote class="blockquote_type1 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;quote&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;세 번째) 친절한 포폴을 만들어라&quot;}]}"
    data-block-index="57" data-shown="false">세 번째) 친절한 포폴을 만들어라</blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="58" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;마지막 회차였던 포트폴리오 피드백 시간에 여러 번 강조하신 말씀이다. &quot;}]}"
    data-block-index="59" data-shown="false">마지막 회차였던 포트폴리오 피드백 시간에 여러 번 강조하신 말씀이다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;보는 사람으로 하여금 이해하기 쉽게, 친절하게 문서를 작성해야 한다는 것.&quot;}]}"
    data-block-index="60" data-shown="false">보는 사람으로 하여금 이해하기 쉽게, 친절하게 문서를 작성해야 한다는 것.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;채용 담당자는 채용 기간에 많으면 수천 건의 지원 서류를 검토한다. &quot;}]}"
    data-block-index="61" data-shown="false">채용 담당자는 채용 기간에 많으면 수천 건의 지원 서류를 검토한다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;내 입장에서는 내 경력과 프로젝트가 설명이 더 필요하지 않은 명확하고 중요한 것일지 몰라도&quot;}]}"
    data-block-index="62" data-shown="false">내 입장에서는 내 경력과 프로젝트가 설명이 더 필요하지 않은 명확하고 중요한 것일지 몰라도</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그것을 처음 보는 사람에게는 더구나 비슷한 서류를 수천 건을 보는 사람에게는 잘 와닿지 않는다. &quot;}]}"
    data-block-index="63" data-shown="false">그것을 처음 보는 사람에게는&nbsp;더구나 비슷한 서류를 수천 건을 보는 사람에게는 잘 와닿지 않는다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;때문에 프로젝트를 하나 넣더라도&quot;}]}"
    data-block-index="64" data-shown="false">때문에 프로젝트를 하나 넣더라도</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 이 프로젝트의 목적/목표는 무엇이었는지&quot;}]}"
    data-block-index="65" data-shown="false">- 이 프로젝트의 목적/목표는 무엇이었는지</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 나의 역할은 무엇이었는지&quot;}]}"
    data-block-index="66" data-shown="false">- 나의 역할은 무엇이었는지</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 나는 왜 그 프로젝트를 하게 됐는지&quot;}]}"
    data-block-index="67" data-shown="false">- 나는 왜 그 프로젝트를 하게 됐는지</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 어려움은 없었는지&quot;}]}"
    data-block-index="68" data-shown="false">- 어려움은 없었는지</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 있었다면 어떻게 해결했는지&quot;}]}"
    data-block-index="69" data-shown="false">- 있었다면 어떻게 해결했는지</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 성과는 무엇인지&quot;}]}"
    data-block-index="70" data-shown="false">- 성과는 무엇인지</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;- 어떤 인사이트를 얻었는지 등등.. &quot;}]}"
    data-block-index="71" data-shown="false">- 어떤 인사이트를 얻었는지 등등..&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이 모든 스토리를 잘 녹여낼 수 있어야 한다. &quot;}]}"
    data-block-index="72" data-shown="false">이 모든 스토리를 잘 녹여낼 수 있어야 한다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="73" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="74" data-shown="false"><br></p>
  <blockquote class="blockquote_type1 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;quote&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;Outro&quot;}]}"
    data-block-index="75" data-shown="false">Outro</blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;마지막 시간에 1대1 피드백을 받기 위해 밤을 새우다시피 노션 포트폴리오를 만들고&quot;}]}"
    data-block-index="76" data-shown="false">마지막 시간에 1대1 피드백을 받기 위해 밤을 새우다시피 노션 포트폴리오를 만들고</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;한 번 고배를 마셨던 회사의 채용 분석을 처음부터 다시 해보면서 &quot;}]}"
    data-block-index="77" data-shown="false">한 번 고배를 마셨던 회사의 채용 분석을 처음부터 다시 해보면서&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이제 정말 취준을 하고 있구나 하는 생각이 들었다. &quot;}]}"
    data-block-index="78" data-shown="false">이제 정말 취준을 하고 있구나 하는 생각이&nbsp;들었다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="79" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그리고 노슈니 강사님의 노션 포트폴리오 수업은 단순히 노션을 사용하는 스킬적인 부분뿐만 아니라&quot;}]}"
    data-block-index="80" data-shown="false">그리고 노슈니 강사님의 노션 포트폴리오 수업은 단순히 노션을 사용하는 스킬적인 부분뿐만 아니라</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;취업을 준비할 때 꼭 필요한 마음가짐, 채용 담당자의 입장에서 보는 객관적인 시선, 동기부여&quot;}],&quot;styleType&quot;:&quot;underline&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;까지 받을 수 있었던 뜻깊은 시간이었다. &quot;}]}"
    data-block-index="81" data-shown="false"><u>취업을 준비할 때 꼭 필요한 마음가짐, 채용 담당자의 입장에서 보는 객관적인 시선, 동기부여</u>까지 받을 수 있었던 뜻깊은
    시간이었다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="82" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;결국 이번 노션 포트폴리오 강의를 듣고, 다시 포트폴리오를 제대로 만들어보면서 내가 느낀 건&quot;}]}"
    data-block-index="83" data-shown="false">결국 이번 노션 포트폴리오 강의를 듣고, 다시 포트폴리오를 제대로 만들어보면서 내가 느낀 건</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;포트폴리오는 내가 얼마나 같이 일하기 좋은 동료인지 어필하는 문서라는 것.&quot;}],&quot;styleType&quot;:&quot;underline&quot;}],&quot;styleType&quot;:&quot;bold&quot;}]}"
    data-block-index="84" data-shown="false"><b><u>포트폴리오는 내가 얼마나 같이 일하기 좋은 동료인지 어필하는 문서라는 것.</u></b></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;아직 갈 길이 멀지만 그래도 한 발 떼었으니 올 하반기에 부지런히 포트폴리오 업데이트하며&quot;}]}"
    data-block-index="85" data-shown="false">아직 갈 길이 멀지만 그래도 한 발 떼었으니 올 하반기에 부지런히 포트폴리오 업데이트하며</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;정말 에센스만 남을 때까지 열심히 다듬어 봐야겠다. &quot;}]}"
    data-block-index="86" data-shown="false">정말 에센스만 남을 때까지 열심히 다듬어 봐야겠다.&nbsp;</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="87" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="88" data-shown="false"><br></p></div>`,
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 3,
              name: '자기반성',
            },
            content: '1등',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 4,
              name: 'AI러 이채문',
              image: `/files/${clientId}/user-apeach.webp`,
            },
            content: '좋은글 잘 보고 갑니다.',
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'info',
        title: 'GPT로 일한다면, 결국 프롬프팅',
        extra: {
          subTitle: '토큰 소비 없이 사고 과정 프롬프팅 활용',
        },
        content: `
<div class="wrap_body text_align_left finish_txt">
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;Reddit의 PromptEngineering 커뮤니티에서 한 사용자가 추가 토큰을 사용하지 않고도 \u0027사고 과정(chain of thought)\u0027 프롬프팅의 이점을 누릴 수 있는 새로운 방법을 제안했습니다.&quot;}]}"
    data-block-index="1" data-shown="true">Reddit의 PromptEngineering 커뮤니티에서 한 사용자가 추가 토큰을 사용하지 않고도 '사고 과정(chain of
    thought)' 프롬프팅의 이점을 누릴 수 있는 새로운 방법을 제안했습니다.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="2" data-shown="true"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이 방법의 핵심은 프롬프트 구조를 조정하고 API 호출 시 특정 매개변수를 활용하는 것입니다. 사용자는 콘텐츠 검토 작업을 예로 들어 설명했습니다.&quot;}]}"
    data-block-index="3" data-shown="false">이 방법의 핵심은 프롬프트 구조를 조정하고 API 호출 시 특정 매개변수를 활용하는 것입니다. 사용자는 콘텐츠 검토 작업을 예로 들어
    설명했습니다.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="4" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;제안된 프롬프트 구조는 다음과 같습니다:   &quot;}]}"
    data-block-index="5" data-shown="false">제안된 프롬프트 구조는 다음과 같습니다: &nbsp;&nbsp;</p>
  <blockquote class="blockquote_type2 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;bar&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;AI 모델의 역할 및 작업 설명&quot;}]}"
    data-block-index="6" data-shown="false">AI 모델의 역할 및 작업 설명</blockquote>
  <blockquote class="blockquote_type2 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;bar&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;검토할 텍스트 입력&quot;}]}"
    data-block-index="7" data-shown="false">검토할 텍스트 입력</blockquote>
  <blockquote class="blockquote_type2 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;bar&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;준수해야 할 지침 목록&quot;}]}"
    data-block-index="8" data-shown="false">준수해야 할 지침 목록</blockquote>
  <blockquote class="blockquote_type2 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;bar&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;단계별 지시사항&quot;}]}"
    data-block-index="9" data-shown="false">단계별 지시사항</blockquote>
  <blockquote class="blockquote_type2 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;bar&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;결과물 형식 지정 (&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;style&quot;:{},&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot; 및 &quot;},{&quot;type&quot;:&quot;text&quot;,&quot;style&quot;:{},&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot; 태그 사용&quot;},{&quot;type&quot;:&quot;br&quot;}]}]}]}"
    data-block-index="10" data-shown="false">결과물 형식 지정 (<span>&nbsp;및 <span>&nbsp;태그 사용<br></span></span></blockquote>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="11" data-shown="false"><br></p>
  <div class="wrap_item item_type_img"
    data-app="{&quot;type&quot;:&quot;img&quot;,&quot;align&quot;:&quot;content-full&quot;,&quot;mobileAlign&quot;:&quot;full&quot;,&quot;url&quot;:&quot;http://t1.daumcdn.net/brunch/service/user/ffnS/image/QkKX2dJDMrqKPq85JtLqCWmYoag.png&quot;,&quot;caption&quot;:&quot;예시를&quot;,&quot;width&quot;:&quot;958&quot;,&quot;height&quot;:&quot;877&quot;,&quot;originalName&quot;:&quot;04.png&quot;}"
    data-block-index="12" data-shown="false">
    <div class="wrap_content mobile_align_full">
      <div class="wrap_img_float"><img
          src="/files/${clientId}/exam1.png"
          data-filename="exam1.png" alt="예시를" data-phocus-index="0"><span class="text_caption">예시를</span></div>
    </div>
  </div>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="13" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이 구조의 핵심은 모델의 추론 과정을 요청하되, 이를 결과물 뒤에 배치하는 것입니다.&quot;}],&quot;styleType&quot;:&quot;bold&quot;}]}"
    data-block-index="14" data-shown="false"><b>이 구조의 핵심은 모델의 추론 과정을 요청하되, 이를 결과물 뒤에 배치하는 것입니다.</b></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="15" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;API 호출 시, \u0027stop\u0027 매개변수를 \u0027\u003c/result\u003e\u0027 태그로 설정하여 추론 부분 전에 생성을 중단시킵니다. 이를 통해 모델은 사고 과정을 거치지만, 추가 토큰을 소비하지 않고 결과만 반환하게 됩니다.&quot;}]}"
    data-block-index="16" data-shown="false">API 호출 시, 'stop' 매개변수를 '&lt;/result&gt;' 태그로 설정하여 추론 부분 전에 생성을 중단시킵니다. 이를
    통해 모델은 사고 과정을 거치지만, 추가 토큰을 소비하지 않고 결과만 반환하게 됩니다.</p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="17" data-shown="false"><br></p>
  <div class="wrap_item item_type_img"
    data-app="{&quot;type&quot;:&quot;img&quot;,&quot;align&quot;:&quot;content-full&quot;,&quot;mobileAlign&quot;:&quot;full&quot;,&quot;url&quot;:&quot;http://t1.daumcdn.net/brunch/service/user/ffnS/image/DNtl9KsnmDEIpw6RyKkg9dQ22gs.png&quot;,&quot;caption&quot;:&quot;&quot;,&quot;width&quot;:&quot;968&quot;,&quot;height&quot;:&quot;356&quot;,&quot;originalName&quot;:&quot;05.png&quot;}"
    data-block-index="18" data-shown="false">
    <div class="wrap_content mobile_align_full">
      <div class="wrap_img_float"><img
          src="/files/${clientId}/exam2.png"
          data-filename="exam2.png" alt="브런치 글 이미지 2" data-phocus-index="1"><span class="text_caption"></span></div>
    </div>
  </div>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="19" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="20" data-shown="false"><br></p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;관련 내용 출처는 다음과 같&quot;},{&quot;type&quot;:&quot;text&quot;,&quot;style&quot;:{},&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;습니다.&quot;}]}]}"
    data-block-index="21" data-shown="false">관련 내용 출처는 다음과 같<span>습니다.</span></p>
  <div class="wrap_item item_type_opengraph"
    data-app="{&quot;type&quot;:&quot;opengraph&quot;,&quot;openGraphData&quot;:{&quot;title&quot;:&quot;From the PromptEngineering community on Reddit&quot;,&quot;url&quot;:&quot;https://www.reddit.com/r/PromptEngineering/comments/1g2igqf/i_thought_of_a_way_to_benefit_from_chain_of/&quot;,&quot;canonicalUrl&quot;:&quot;https://www.reddit.com/r/PromptEngineering/comments/1g2igqf/i_thought_of_a_way_to_benefit_from_chain_of/&quot;,&quot;image&quot;:&quot;https://img1.daumcdn.net/thumb/C400x400/?fname\u003dhttps://share.redd.it/preview/post/1g2igqf&quot;,&quot;description&quot;:&quot;Explore this post and more from the PromptEngineering community&quot;}}"
    data-block-index="22" data-shown="false"><a target="_blank" class="inner_wrap #opengraph"
      href="https://www.reddit.com/r/PromptEngineering/comments/1g2igqf/i_thought_of_a_way_to_benefit_from_chain_of/"
      data-ctr-expose="opengraph" data-ctr-click="opengraph_click">
      <div class="inner_wrap_text"><strong class="title">From the PromptEngineering community on Reddit</strong>
        <p class="desc">Explore this post and more from the PromptEngineering community</p>
        <p class="url">www.reddit.com</p>
      </div>
      <div class="inner_wrap_og_image"
        style="background-image:url(https://img1.daumcdn.net/thumb/C400x400/?fname=https://share.redd.it/preview/post/1g2igqf)">
        &nbsp;</div>
    </a></div>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;br&quot;}]}"
    data-block-index="23" data-shown="false"><br></p>
</div>`,
        views: 318,
        user: {
          _id: 4,
          name: 'AI러 이채문',
          image: `/files/${clientId}/user-apeach.webp`,
        },
        createdAt: getTime(-3, -60 * 60 * 20),
        updatedAt: getTime(-2, -60 * 60 * 10),
        replies: [
          {
            _id: await nextSeq('reply'),
            content: '프롬프팅이 중요하군요...',
            user: {
              _id: 2,
              name: 'AB',
              image: `/files/${clientId}/user-neo.webp`
            },
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2)
          },
          {
            _id: await nextSeq('reply'),
            content: 'IT에 무지한 저에게는 신기한 글이네요^^',
            user: {
              _id: 3,
              name: '자기반성',
              image: `/files/${clientId}/user-jayg.webp`
            },
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 20)
          },


        ]
      },
      {
        _id: await nextSeq('post'),
        type: 'info',
        title: '딸의 정부청사 출장에 부모님이 동행하는 이유',
        extra: {
          subTitle: '자식이 늦깍이 신입이라도 부모에겐 자랑이다',
        },
        views: 5,
        user: {
          _id: 6,
          name: '조이핑',
          image: `/files/${clientId}/user-joyping.webp`,
        },
        content: `입사 1달이 지나며
      
      이제 좀 한가해지려나 했더니... 무슨.
      
      2월이 되니 더 바빠졌다-_-^^
      
      약 200여 명 연말정산 자료 심사를
      
      내가 해야 했기 때문이다.
      
      신입사원이건 상관없이 내가 급여담당자이므로.
      
      신규가 혼자 하기엔 힘든 업무라는 걸 다들 아셨는지
      
      내 업무를 보조할 계약선생님 1명을 채용해 주셨다.
      
      그렇게 한 책상 앞, 나란히 앉은 우리 둘은
      
      아침부터 밤까지 끝도 없이
      
      직원들의 연말정산 서류를 심사했다.
      
      홈택스자료, 등본, 기부금 증명서 등
      
      모든 서류에 틀린 금액은 없는지 실수 없이 세금이 다 반영되었는지 확인하다 보면 눈이 빠질 것 같았다.
      `,
        createdAt: getTime(-3, -60 * 60 * 20),
        updatedAt: getTime(-2, -60 * 60 * 10),
        replies: [
          {
            _id: await nextSeq('reply'),
            content: '프롬프팅이 중요하군요...',
            user: {
              _id: 2,
              name: 'AB',
              image: `/files/${clientId}/user-neo.webp`
            },
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2)
          },
          {
            _id: await nextSeq('reply'),
            content: 'IT에 무지한 저에게는 신기한 글이네요^^',
            user: {
              _id: 3,
              name: '자기반성',
              image: `/files/${clientId}/user-jayg.webp`
            },
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 20)
          },
        ]
      },
      {
        _id: await nextSeq('post'),
        type: 'info',
        title: '덴마크의 \'꿀 하트\' 쿠키, Honninghjerter',
        extra: {
          subTitle: '달콤한 덴마크 디저트 이야기 (2)',
        },
        views: 5,
        user: {
          _id: 8,
          name: '러브핑',
          image: `/files/${clientId}/user-loveping.webp`,
        },
        content: `취업 준비를 위해 반드시 필요한 것 세 가지.
      
      자기소개서, 이력서, 포트폴리오.
      
      그중에서도 최근에는 포트폴리오 만들기에 돌입했다.
      
      5월에 시험 삼아 입사지원을 해보면서
      
      가장 부족하다고 느꼈던 부분이 바로 포트폴리오였기 때문이다.
      
      당장 하반기에 다시 취업에 도전하기 위해서는 포트폴리오를 만들어두는 게 무엇보다 시급했기에
      
      열심히 서울몽땅정보통, 청년지원, 취업지원 사이트를 뒤지다가 나에게 딱! 맞는 지원사업을 발견했다. 바로 '마포청년나루'에서 진행하는 '합격을 부르는 노션 포트폴리오 만들기'.
      
      수업은 2주간 매주 화, 금 두 번씩 총 4회기로 진행됐는데,
      
      결론부터 말하자면 올해 한 일 중 가장 잘한 일로 꼽을 수 있을 정도로
      
      정말 많은 도움이 됐다.
      
      강사님은 노션 앰배서더이자 노션 커뮤니티 '슈크림 마을' 대표 노슈니 님이었다. 나는 노션 포트폴리오의 존재를 지난 5월 회사에 입사 지원을 하며 처음 알게 됐는데, 지원했던 회사의 채용 공고에 포트폴리오를 노션으로 제출해도 된다는 문구가 있었다. 얼마나 취준에 문외한이었는지를 알 수 있는 대목이지 않을까 싶다.
      
      이런 이야기를 하는 이유는 나처럼 노션 포트폴리오의 존재조차 몰랐던 사람도
      
      노슈니님의 강의를 잘 듣고 따라 한다면 누구나 만들 수 있다는 걸 강조하고 싶어서다! 지금부터 노션 포폴 강의에서 가장 인상적이었던 것 세 가지를 말해보려 한다.
      `,
        createdAt: getTime(-3, -60 * 60 * 20),
        updatedAt: getTime(-2, -60 * 60 * 10),
        replies: []
      },
      {
        _id: await nextSeq('post'),
        type: 'info',
        title: 'D-70, 30주',
        extra: {
          subTitle: '딸과 만나기 까지 100일간의 기록 Feb 05/2024',
        },
        views: 5,
        user: {
          _id: 2,
          name: 'AB',
          image: `/files/${clientId}/user-neo.webp`,
        },
        content: `겨울철 하늘에서 펑펑 내리는 눈을 보면 ‘눈사람을 만들고 싶다’는 생각이 절로 든다. 하지만 커다란 눈사람을 만들만큼 눈덩이를 크게 만들기가 생각보다 쉽지 않다. 큰 눈덩이를 만들기 위해선 눈의 과학적인 성질을 잘 알아야 한다.

 

자, 지금부터 애니메이션 ‘겨울왕국’에 나오는 눈사람 캐릭터 ‘올라프’가 가상으로 알려주는 ‘눈사람 잘 만드는 법’을 자세히 살펴보자.

겨울철 하늘에서 펑펑 내리는 눈을 보면 ‘눈사람을 만들고 싶다’는 생각이 절로 든다. 하지만 커다란 눈사람을 만들만큼 눈덩이를 크게 만들기가 생각보다 쉽지 않다. 큰 눈덩이를 만들기 위해선 눈의 과학적인 성질을 잘 알아야 한다.

 

자, 지금부터 애니메이션 ‘겨울왕국’에 나오는 눈사람 캐릭터 ‘올라프’가 가상으로 알려주는 ‘눈사람 잘 만드는 법’을 자세히 살펴보자.

겨울철 하늘에서 펑펑 내리는 눈을 보면 ‘눈사람을 만들고 싶다’는 생각이 절로 든다. 하지만 커다란 눈사람을 만들만큼 눈덩이를 크게 만들기가 생각보다 쉽지 않다. 큰 눈덩이를 만들기 위해선 눈의 과학적인 성질을 잘 알아야 한다.

 

자, 지금부터 애니메이션 ‘겨울왕국’에 나오는 눈사람 캐릭터 ‘올라프’가 가상으로 알려주는 ‘눈사람 잘 만드는 법’을 자세히 살펴보자.

겨울철 하늘에서 펑펑 내리는 눈을 보면 ‘눈사람을 만들고 싶다’는 생각이 절로 든다. 하지만 커다란 눈사람을 만들만큼 눈덩이를 크게 만들기가 생각보다 쉽지 않다. 큰 눈덩이를 만들기 위해선 눈의 과학적인 성질을 잘 알아야 한다.

 

자, 지금부터 애니메이션 ‘겨울왕국’에 나오는 눈사람 캐릭터 ‘올라프’가 가상으로 알려주는 ‘눈사람 잘 만드는 법’을 자세히 살펴보자.`,
        createdAt: getTime(-3, -60 * 60 * 20),
        updatedAt: getTime(-2, -60 * 60 * 10),
        replies: []
      },
      {
        _id: await nextSeq('post'),
        type: 'info',
        title: '6 윤희 -2',
        extra: {
          subTitle: '낙원',
        },
        views: 5,
        user: {
          _id: 10,
          name: '플라워핑',
          image: `/files/${clientId}/user-flowerping.webp`,
        },
        content: `로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도사용된다.
국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.

국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.

로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도사용된다.
국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.

국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.

로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도사용된다.
국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.

국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.

로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도사용된다.
국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.

국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.`,
        createdAt: getTime(-3, -60 * 60 * 20),
        updatedAt: getTime(-2, -60 * 60 * 10),
        replies: []
      },
      {
        _id: await nextSeq("post"),
        type: "info",
        title: "보상은 없다",
        extra: {
          subTitle:
            "한남3구역 동갑내기 빌라에 사는 어느 셀프 인테리어 중독자의 고백",
        },
        views: 7,
        user: {
          _id: 9,
          name: "트윙클핑",
          image: `/files/${clientId}/user-twinklingping.webp`,
        },
        content: `
<div class="wrap_body text_align_left">
  <h4 class="wrap_item item_type_text">
    얼마 전까지 대체 언제 가을이 오냐고
  </h4>
  <div class="wrap_item item_type_img">
    <div class="wrap_content mobile_align_full">
      <div class="wrap_img_float">
        <span class="img_span">
          <img src="//img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=https://t1.daumcdn.net/brunch/service/user/gAK0/image/GAL865_nIEUxX17fTK9NCdOkFWg" alt="브런치 글 이미지 1" />
        </span>
      </div>
    </div>
  </div>
  <h4 class="wrap_item item_type_text">
    투정 아닌 투정을 부렸더랬는데
  </h4>
  <h4 class="wrap_item item_type_text">
    비와 어깨동무하고 온 찬 공기 덕에
  </h4>
  <h4 class="wrap_item item_type_text">
    기다리던 손님 가을이 식구가 되었다.
  </h4>
  <h4 class="wrap_item item_type_text">
    <br />
  </h4>
  <h4 class="wrap_item item_type_text">
    <span style="background-color: #000000"><span style="color: #ffffff">가을은 고양이에게 어떤 계절</span></span>
    <span style="background-color: #000000"><span style="color: #ffffff">일</span></span>
    <span style="background-color: #000000"><span style="color: #ffffff">까?</span></span>
  </h4>
  <h4 class="wrap_item item_type_text">
    사람 말과 마찬가지로 고양이에게도 식욕의 계절이다.
  </h4>
  <h4 class="wrap_item item_type_text">
    일조량이 줄어듦에 따라 고양이도 우울함을 느낀다.
  </h4>
  <h4 class="wrap_item item_type_text">
    더불어 봄에 가볍게 입었던 얇은 털코트를 벗고 두껍고 무거운 겨울 코트로 갈아입어야 하기에 털갈이의 계절이다.
  </h4>
</div>`,
        createdAt: getTime(90, 60 * 60 * 21),
        updatedAt: getTime(91, 60 * 60 * 13),
        replies: []
      },
      {
        _id: await nextSeq("post"),
        type: "info",
        title: "하늘은 높고 고양이도 살찐다",
        extra: {
          subTitle: "천고마비 아니 천고묘비",
        },
        views: 64,
        user: {
          _id: 11,
          name: "쿡핑",
          image: `/files/${clientId}/user-cookping.webp`,
        },
        content: `
<div class="wrap_body text_align_left">
  <h4 class="wrap_item item_type_text">
    얼마 전까지 대체 언제 가을이 오냐고
  </h4>
  <div class="wrap_item item_type_img">
    <div class="wrap_content mobile_align_full">
      <div class="wrap_img_float">
        <span class="img_span">
          <img src="//img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=https://t1.daumcdn.net/brunch/service/user/gAK0/image/GAL865_nIEUxX17fTK9NCdOkFWg" alt="브런치 글 이미지 1" />
        </span>
      </div>
    </div>
  </div>
  <h4 class="wrap_item item_type_text">
    투정 아닌 투정을 부렸더랬는데
  </h4>
  <h4 class="wrap_item item_type_text">
    비와 어깨동무하고 온 찬 공기 덕에
  </h4>
  <h4 class="wrap_item item_type_text">
    기다리던 손님 가을이 식구가 되었다.
  </h4>
  <h4 class="wrap_item item_type_text">
    <br />
  </h4>
  <h4 class="wrap_item item_type_text">
    <span style="background-color: #000000"><span style="color: #ffffff">가을은 고양이에게 어떤 계절</span></span>
    <span style="background-color: #000000"><span style="color: #ffffff">일</span></span>
    <span style="background-color: #000000"><span style="color: #ffffff">까?</span></span>
  </h4>
  <h4 class="wrap_item item_type_text">
    사람 말과 마찬가지로 고양이에게도 식욕의 계절이다.
  </h4>
  <h4 class="wrap_item item_type_text">
    일조량이 줄어듦에 따라 고양이도 우울함을 느낀다.
  </h4>
  <h4 class="wrap_item item_type_text">
    더불어 봄에 가볍게 입었던 얇은 털코트를 벗고 두껍고 무거운 겨울 코트로 갈아입어야 하기에 털갈이의 계절이다.
  </h4>
</div>`,
        createdAt: getTime(90, 60 * 60 * 21),
        updatedAt: getTime(91, 60 * 60 * 13),
        replies: []
      },
      {
        _id: await nextSeq("post"),
        type: "info",
        title: "알아두면 쓸모 있는 px, em, rem",
        extra: {
          subTitle: "절대평가와 상대평가의 차이",
        },
        views: 5,
        user: {
          _id: 6,
          name: "조이핑",
          image: `/files/${clientId}/user-joyping.webp`,
        },
        content: `<div class="wrap_body text_align_left finish_txt">
  <blockquote class="blockquote_type1 wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;quotation&quot;,&quot;kind&quot;:&quot;quote&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;안녕하세요. 티그리스 디자인팀입니다.&quot;}]}"
    data-block-index="1">
    안녕하세요. 티그리스 디자인팀입니다.
  </blockquote>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;오늘은 웹을 만들 때 아주 가깝게 계속 마주쳐야 할 '단위'에 대해 준비했습니다.&quot;}]}"
    data-block-index="2">
    오늘은 웹을 만들 때 아주 가깝게 계속 마주쳐야 할 '단위'에 대해 준비했습니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;px, em, rem을 들어본 적이 있거나 개념을 아는데도 프로젝트나 실무에 적용이 어렵다면 도움이 될 수 있을 것 같습니다.&quot;}]}"
    data-block-index="3">
    px, em, rem을 들어본 적이 있거나 개념을 아는데도 프로젝트나 실무에 적용이 어렵다면 도움이 될 수 있을 것 같습니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;20cm와 한 뼘의 차이를 아시나요? 300ml의 물과 한 잔의 물은 어떤가요?&quot;}]}"
    data-block-index="4">
    20cm와 한 뼘의 차이를 아시나요? 300ml의 물과 한 잔의 물은 어떤가요?
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;20cm는 어디에서 누가 재든 20cm이지만 한 뼘은 측정자의 손가락 길이에 따라 달라질 수 있습니다.&quot;}]}"
    data-block-index="5">
    20cm는 어디에서 누가 재든 20cm이지만 한 뼘은 측정자의 손가락 길이에 따라 달라질 수 있습니다.
  </p>
   <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;300ml의 물은 어디서든 300ml이지만 한 잔의 물은 컵의 용량과 물이 얼마나 차있는지에 따라 달라지겠죠.&quot;}]}"
    data-block-index="6">
    300ml의 물은 어디서든 300ml이지만 한 잔의 물은 컵의 용량과 물이 얼마나 차있는지에 따라 달라지겠죠.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;이처럼 20cm나 300ml처럼 변하지 않는 값을 '절대값'이라고 부르고,&quot;}]}"
    data-block-index="7">
    이처럼 20cm나 300ml처럼 변하지 않는 값을 '절대값'이라고 부르고,
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;'한 뼘', '한 잔'처럼 변할 수 있는 값을 '상대값'이라고 부릅니다.&quot;}]}"
    data-block-index="8">
    '한 뼘', '한 잔'처럼 변할 수 있는 값을 '상대값'이라고 부릅니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;px와 em, rem도 같습니다. px는 해상도나 부모 요소에 크기를 받지 않는 '절대값'이고,&quot;}]}"
    data-block-index="9">
    px와 em, rem도 같습니다. px는 해상도나 부모 요소에 크기를 받지 않는 '절대값'이고,
  </p>

  <h2 class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;px&quot;}],&quot;styleType&quot;:&quot;bold&quot;}],&quot;size&quot;:&quot;h2&quot;}"
    data-block-index="10">
    <b>px</b>
  </h2>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;px(픽셀)은 화면의 물리적 단위로서, 디스플레이에서 한 '점'의 색 정보를 표현하는 최소 단위입니다.&quot;}]}"
    data-block-index="11">
    px(픽셀)은 화면의 물리적 단위로서, 디스플레이에서 한 '점'의 색 정보를 표현하는 최소 단위입니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;고정된 단위이기 때문에 모니터의 해상도가 달라지더라도 변하지 않습니다.&quot;}]}"
    data-block-index="12">
    고정된 단위이기 때문에 모니터의 해상도가 달라지더라도 변하지 않습니다.
  </p>
  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;가로 세로가 10px씩인 요소는 어느 해상도에서나 10px의 값을 가집니다.&quot;}]}"
    data-block-index="13">
    가로 세로가 10px씩인 요소는 어느 해상도에서나 10px의 값을 가집니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그렇기 때문에 저시력 사용자가 브라우저의 기본 글꼴 크기를 변경하더라도 px만 사용한 웹은 항상 같은 크기로 출력하기 때문에 웹 접근성 측면에서 좋지 않습니다.&quot;}]}"
    data-block-index="14">
    그렇기 때문에 저시력 사용자가 브라우저의 기본 글꼴 크기를 변경하더라도 px만 사용한 웹은 항상 같은 크기로 출력하기 때문에 웹 접근성 측면에서 좋지 않습니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;px 단위는 테두리(border)의 두께나 미디어쿼리에서 브레이크 포인트를 정할 때 사용하면 좋습니다.&quot;}]}"
    data-block-index="15">
    px 단위는 테두리(border)의 두께나 미디어쿼리에서 브레이크 포인트를 정할 때 사용하면 좋습니다.
  </p>

  <h2 class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;em&quot;}],&quot;styleType&quot;:&quot;bold&quot;}],&quot;size&quot;:&quot;h2&quot;}"
    data-block-index="16">
    <b>em</b>
  </h2>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;em은 부모 요소(Element)의 글꼴 크기를 기준으로 하는 상대적 단위입니다.&quot;}]}"
    data-block-index="17">
    em은 부모 요소(Element)의 글꼴 크기를 기준으로 하는 상대적 단위입니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;위 그림과 같이 부모 요소가 60px일 때, 자식 요소를 0.8em으로 하면 자식요소의 실제 크기는 48px이 되고 부모 요소가 40px일 때, 자식 요소를 0.8em으로 하면 실제 크기는 32px이 됩니다.&quot;}]}"
    data-block-index="18">
    위 그림과 같이 부모 요소가 60px일 때, 자식 요소를 0.8em으로 하면 자식요소의 실제 크기는 48px이 되고 부모 요소가 40px일 때, 자식 요소를 0.8em으로 하면 실제 크기는 32px이 됩니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;한 페이지 내에서 같은 0.8em을 사용하더라도 부모 요소의 글꼴 크기가 얼마인지에 따라 크기가 달라집니다.&quot;}]}"
    data-block-index="19">
    한 페이지 내에서 같은 0.8em을 사용하더라도 부모 요소의 글꼴 크기가 얼마인지에 따라 크기가 달라집니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;일반적으로 em 단위는 글꼴 크기, 여백(padding, margin) 등을 정의할 때 사용합니다.&quot;}]}"
    data-block-index="20">
    일반적으로 em 단위는 글꼴 크기, 여백(padding, margin) 등을 정의할 때 사용합니다.
  </p>
  <h2 class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;rem&quot;}],&quot;styleType&quot;:&quot;bold&quot;}],&quot;size&quot;:&quot;h2&quot;}"
    data-block-index="21">
    <b>rem</b>
  </h2>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;rem은 루트 요소(Root Element: &lt;html&gt;)의 글꼴 크기를 기준으로 하는 상대적 단위입니다.&quot;}]}"
    data-block-index="22">
    rem은 루트 요소(Root Element: &lt;html&gt;)의 글꼴 크기를 기준으로 하는 상대적 단위입니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;페이지 전체에서 동일한 기준을 가지므로 디자인의 일관성을 유지하기도 쉽습니다.&quot;}]}"
    data-block-index="23">
    페이지 전체에서 동일한 기준을 가지므로 디자인의 일관성을 유지하기도 쉽습니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;전체 레이아웃의 일관성을 유지하면서 상대적인 크기를 정의할 때 주로 사용합니다.&quot;}]}"
    data-block-index="24">
    전체 레이아웃의 일관성을 유지하면서 상대적인 크기를 정의할 때 주로 사용합니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;rem의 단위는 보통 브라우저의 기본 글꼴 크기인 16px을 기준으로 합니다. 1rem은 16px, 2rem은 16의 2배인 32px, 3rem은 16의 3배인 48px… 과 같은 식입니다.&quot;}]}"
    data-block-index="25">
    rem의 단위는 보통 브라우저의 기본 글꼴 크기인 16px을 기준으로 합니다. 1rem은 16px, 2rem은 16의 2배인 32px, 3rem은 16의 3배인 48px… 과 같은 식입니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;px을 rem으로 변환할 때는 [(사용할 값)÷16] 으로 계산하면 됩니다.&quot;}]}"
    data-block-index="26">
    px을 rem으로 변환할 때는 [(사용할 값)÷16] 으로 계산하면 됩니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그러나 px로 그려진 디자인을 rem으로 일일히 계산해가며 만들기는 쉽지 않습니다.&quot;}]}"
    data-block-index="27">
    그러나 px로 그려진 디자인을 rem으로 일일히 계산해가며 만들기는 쉽지 않습니다.
  </p>
   <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;그럴 때 &lt;html&gt;의 font-size를 62.5%로 적용해주면 루트의 글꼴 크기를 10px로 만든 것과 같은 효과를 주어 변환이 쉽습니다.&quot;}]}"
    data-block-index="28">
    그럴 때 &lt;html&gt;의 font-size를 62.5%로 적용해주면 루트의 글꼴 크기를 10px로 만든 것과 같은 효과를 주어 변환이 쉽습니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;[기본 글꼴 크기는 왜 10px로 만들어야 하나요?]&quot;}],&quot;styleType&quot;:&quot;bold&quot;}]}"
    data-block-index="29">
    <b>[기본 글꼴 크기는 왜 10px로 만들어야 하나요?]</b>
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;기본 글꼴 크기가 16px이라면 [(사용할 값)÷16]와 같이 계산해서 써야 하지만, 이를 암산하거나 계산기를 꺼내 쓰는 것보다 나누는 값을 10으로 만들면 훨씬 계산이 쉬워지기 때문에 바꿔서 사용합니다.&quot;}]}"
    data-block-index="30">
    기본 글꼴 크기가 16px이라면 [(사용할 값)÷16]와 같이 계산해서 써야 하지만, 이를 암산하거나 계산기를 꺼내 쓰는 것보다 나누는 값을 10으로 만들면 훨씬 계산이 쉬워지기 때문에 바꿔서 사용합니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;피그마에서는 px를 rem으로 변환해주는 플러그인도 있다고 하니, 플러그인을 사용해도 좋을 것입니다.&quot;}]}"
    data-block-index="31">
    피그마에서는 px를 rem으로 변환해주는 플러그인도 있다고 하니, 플러그인을 사용해도 좋을 것입니다.
  </p>

  <h2 class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;마치며&quot;}],&quot;styleType&quot;:&quot;bold&quot;}],&quot;size&quot;:&quot;h2&quot;}"
    data-block-index="32">
    <b>마치며</b>
  </h2>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;웹에는 px, em, rem뿐만 아니라 %, vw, vh 등의 단위도 있습니다. px를 제외하고 모두 상대적 단위입니다.&quot;}]}"
    data-block-index="33">
    웹에는 px, em, rem뿐만 아니라 %, vw, vh 등의 단위도 있습니다. px를 제외하고 모두 상대적 단위입니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;디바이스가 다양화될수록 px보다 상대적 단위를 사용하는 것이 좋습니다.&quot;}]}"
    data-block-index="34">
    디바이스가 다양화될수록 px보다 상대적 단위를 사용하는 것이 좋습니다.
  </p>

  <p class="wrap_item item_type_text"
    data-app="{&quot;type&quot;:&quot;text&quot;,&quot;data&quot;:[{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;em은 폰트 크기에 따라 유동적으로 변경되는 특징이 있지만, 이러한 특징 때문에 오히려 유지보수가 어려울 수 있기 때문에 변환과 유지보수가 쉬운 rem의 사용을 권장합니다.&quot;}]}"
    data-block-index="35">
    em은 폰트 크기에 따라 유동적으로 변경되는 특징이 있지만, 이러한 특징 때문에 오히려 유지보수가 어려울 수 있기 때문에 변환과 유지보수가 쉬운 rem의 사용을 권장합니다.
  </p>
</div>`,
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "한봄",
            },
            content: "쉽게 잘 설명해주셔서 감사합니다~! 도움이 되었습니다.",
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      }, {
        _id: await nextSeq("post"),
        type: "info",
        title: "회색 공동체, 사라진 나의 색",
        extra: {
          subTitle: "밀크맨을 읽고",
        },
        views: 5,
        user: {
          _id: 10,
          name: "플라워핑",
          image: `/files/${clientId}/user-flowerping.webp`,
        },
        content: `회색 지역에 회색 사람들이 살고 있다. 그들은 이름도 없고, 하늘에 밝은 연파랑만이 인정되듯 그들은 이름조 차 검열받았다. 그들은 이름 대신 보통 명사의 껍데기만 쓰며, 회색 가면을 쓰고 살아간다. 자신의 색깔을 드 러내는 순간, 주변의 눈과 귀가 그들을 주시한다. 심지어 가정조차 안전지대가 되지 못했다. 과거의 살구색이 었던 엄마와 초록색이었던 아빠는 결국 회색으로 변했고, 그들은 온전한 자아를 숨긴 채 회색의 모습을 하고 만나 정상적인 가정을 꾸리며 살아간다.

그런 회색 사회에서 주인공은 태어났다. 16살 생일을 맞이하던 날, 엄마는 그녀에게 회색 가정을 이루고 안전 하게 살아가야 한다고 잔소리를 시작한다. 엄마에게 결혼은 행복을 위한 선택이 아닌 신의 명령이었고, 공동 체의 의무이자 책무였다. 그것은 나이에 걸맞은 행동이었고, 종교에 맞는 아이를 낳고 그와 함께 의무와 한계 를 받아들이는 숙명이었다.

주인공은 이제 18살 소녀에서 성인으로 넘어가는 경계에 선다. 그녀는 자신의 색깔을 버리고 회색이 되어야 했다. 그녀만의 색깔을 만들어주는 책을 읽으며 걷기, 조깅하기, 프랑스어 배우기, 남자친구 만나기는 모두 버 려야 했다. 그 색깔을 유지하려 한다면 눈에 띄게 될 것이고, 회색 공동체에서 낙인 찍히는 것은 시간문제였 다. 대부분의 사람들은 자아를 버리고 회색이 되었다. 그들은 집단의 일원으로서 공동체의 표준이 되었다. 하 지만 성인이 되는 이 시기를 지나며 자신의 색을 유지하는 사람들은 낙인 찍히고 말았다. 주인공의 부모조차 그녀를 비난하며, 회색이 되어야 정상적인 삶을 살 수 있다고 강요했다.

회색의 시작은 공동체의 정치적 이념에서 비롯되었다. 이 사회의 이념은 처음에는 해방과 저항을 목표로 했지 만, 시간이 지나며 권력과 통제를 위한 수단으로 변질되었다. 사람들은 더 이상 자율성을 갖지 못했고, 색깔을 지닌 개성은 사회적 위협으로 간주되었다. 이러한 이념의 변질은 사회적 억압을 강화시켰고, 밀크앤과 같은 권력자들은 사람들을 감시하고 통제했다. 밀크맨은 주인공을 통제하고 굴복시키기로 마음먹었다. "나는 남자 고, 너는 여자. 러닝할 필요 없어. 나는 너를 통제하고 고립시켜서 아무것도 아닌 존재로 만들거야." 밀크맨의 이러한 태도는 단순한 개인적 억압을 넘어, 사회적 통제 메커니즘의 상징이었다.

주인공은 프랑스 선생님을 통해 저녁노을의 다채로움을 본 후, 하늘이 항상 파란색이 아니어도 되듯 자신의 색깔도 버리길 원하지 않았다. 그녀는 이미 그 사회에 자신의 색을 지켜내다 낙인 찍힌 사람들을 알고 있었다. 어떤 사람들은 의도적으로 자신을 지켜내려 했고, 또 어떤 사람들은 의도치 않게 드러난 색깔 때문에 사회에 서 배제되었다. 사람은 계속 변하지만, 이 사회에서는 낙인이 흉터처럼 남았다. 주인공은 '중간', '가운데 연 니'로 살아가다가 낙인이 찍힌 후에야 비로소 '걸어다니는 소녀'라는 이름을 얻었다.

그들의 사회는 우리의 사회와 다르다. 그래서 그들을 이상하게 보는 것일 수 있다. 내가 보는 내 공동체는 이 상적이지는 않더라도 상식적이다. 어쩔수없는 부조리들은 어디나 있으니 이정도면 된게 아닌가 라는 생각이 든다. 그러나 우리와 다른 배경에 다른 역사를 가진 누군가 이 사회를 들여다본다면, 이 속에서도 부당한 배제 를 당하는 누군가가 있지는 않을까? 나는 이 사회에서 행복 비슷한 것을 느끼며 살아간다. 이런 사실 자체가 내가 어느 정도 내 색깔을 잃고 회색이 되었음을 반증하는 것은 아닐까? 우리 사회가 완벽히 이상적인 공동체 가 아님을 직감할 수 있기에, 나의 말과 행동에 들어 있는 무의식적인 배제를 더 세심히 살피며 살아가야 함을 느낀다.`,
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "한봄",
            },
            content: "쉽게 잘 설명해주셔서 감사합니다~! 도움이 되었습니다.",
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "info",
        title: "[취업특강] 노션 포트폴리오 만들기",
        extra: {
          subTitle: "with 노슈니, 슈크림 마을, 마포청년나루",
        },
        views: 5,
        user: {
          _id: 12,
          name: "드림핑",
          image: `/files/${clientId}/user-dreamping.webp`,
        },
        content: `
          <p>
            취업 준비를 위해 반드시 필요한 것 세 가지. 자기소개서, 이력서, 포트폴리오.
            그중에서도 최근에는 포트폴리오 만들기에 돌입했다. 5월에 시험 삼아 입사지원을
            해보면서 가장 부족하다고 느꼈던 부분이 바로 포트폴리오였기 때문이다. 당장
            하반기에 다시 취업에 도전하기 위해서는 포트폴리오를 만들어두는 게 무엇보다
            시급했기에 열심히 서울몽땅정보통, 청년지원, 취업지원 사이트를 뒤지다가 나에게
            딱! 맞는 지원사업을 발견했다. 바로 '마포청년나루'에서 진행하는 '합격을 부르는
            노션 포트폴리오 만들기'. 수업은 2주간 매주 화, 금 두 번씩 총 4회기로
            진행됐는데, 결론부터 말하자면 올해 한 일 중 가장 잘한 일로 꼽을 수 있을 정도로
            정말 많은 도움이 됐다. 강사님은 노션 앰배서더이자 노션 커뮤니티 '슈크림 마을'
            대표 노슈니 님이었다. 나는 노션 포트폴리오의 존재를 지난 5월 회사에 입사
            지원을 하며 처음 알게 됐는데, 지원했던 회사의 채용 공고에 포트폴리오를
            노션으로 제출해도 된다는 문구가 있었다. 얼마나 취준에 문외한이었는지를 알 수
            있는 대목이지 않을까 싶다.
          </p>`,
        createdAt: getTime(-9, -60 * 60 * 5),
        updatedAt: getTime(-9, -60 * 60 * 5),
      },
      {
        _id: await nextSeq("post"),
        type: "info",
        title: "보상은 없다",
        extra: {
          subTitle:
            "한남3구역 동갑내기 빌라에 사는 어느 셀프 인테리어 중독자의 고백",
        },
        views: 10,
        user: {
          _id: 12,
          name: "드림핑",
          image: `/files/${clientId}/user-dreamping.webp`,
        },
        content: `
          <p>처음 이 집을 보러 왔을 때, 나는 여러모로 절박한 상황이었다. 배우가 되겠다고 직장을 그만두고 서울로 올라온 지 2년째, 입시도 연기도 뜻대로 되지 않았고, 다이소 아르바이트와 투잡, 쓰리잡을 병행하던 나는 어디서든 잠들 수 있을 만큼 매사에 피곤했다. 무엇보다 서울살이에 드는 돈이 만만치 않았다. 친구와 둘이 살던 연남동 투룸은 여러모로 너무 좋은 집이었지만 매달 나가는 월세를 감당하는 게 점점 버거웠다. 고정비용을 줄일 방법이 필요했고, 주거비를 줄이는 게 무엇보다 시급했다. 어떻게든 전세로 바꿔보자는 마음에 당시 내가 받을 수 있던 전세대출 한도 6천만 원 이하 전셋집을 이 잡듯이 뒤졌다. 서른 개쯤 알아봤을까. 지역도 도봉, 성북, 노원, 은평 할 것 없이 조건에 맞는 매물이 있다고 하면 어디든지 달려갔다. 집 구하는 게 그토록 어려웠던 이유는 물론 대출금이 적어서도 있었지만 돈도 없는 주제에 방 한 칸짜리 원룸에는 살기 싫었기 때문이었다. 그즈음 나는 뜻대로 되지 않는 주변의 모든 일들에 지쳐갔고, 내 집만큼은 내가 바라는 대로 만들어내고 싶었다. 사계절 옷을 모두 보관할 수 있는 집이어야 했고, 서울에 신세 질 곳 하나 없는 비서울권 지역민들의 마음을 누구보다 잘 알기에 졸업한 친구들이 면접차 서울에 오더라도 하루정도 편히 쉴 수 있는 집이 되었으면 했다. 결국 나의 이런 이상한 고집과 절박함이 모여 나는 무리수를 두게 되는데, (내 인생이 항상 이런 식이다) 지금 살고 있는 이 한남동 언덕 끝에 있는 95년생(나와 동갑이다) 다 쓰러져가는 전세 4천만 원짜리 집을 계약한 것.</p>`,
        createdAt: getTime(-8, -60 * 60 * 5),
        updatedAt: getTime(-8, -60 * 60 * 5),
      },
      {
        _id: await nextSeq("post"),
        type: "info",
        title: "집을 구한다",
        extra: {
          subTitle:
            "한남3구역 동갑내기 빌라에 사는 어느 셀프 인테리어 중독자의 고백",
        },
        views: 65,
        user: {
          _id: 12,
          name: "드림핑",
          image: `/files/${clientId}/user-dreamping.webp`,
        },
        content: `
          <p>
            이주명령이 떨어지고 마음이 바빠진 나는 본격적으로 집을 알아보러 다니기
            시작했다. 기한은 내년 5월까지로 아직 여유가 있었지만 그때 가서 허겁지겁 집을
            구하다 보면 맘에 드는 집을 찾기가 어려울 테니까. 그리고 겨울이 오기 전에 이
            집에서 도망쳐야 해.
          </p>
          <p>
            조건은 전세대출이 가능한 집일 것, 베란다나 테라스가 있을 것, 반려동물이
            가능해야 하고, 창문으로 보이는 옆 건물이 너무 가깝지 않을 것, 뷰가 있으면 더
            좋고, 그리고 내가 가끔 집에서 노래를 부를 것이기 때문에 방음이 잘 되는
            곳이거나 되도록 꼭대기 층일 것, 동네는 번화가보다는 산책로가 가까운 한적한
            곳이면 좋겠다. 창문이 너무 작아도 안돼. 언덕이 너무 가팔라도 힘든데.
          </p>
          <p>
            새 집에 대한 나의 욕망은 주제도 모르고 부풀어 올랐다. 밥 먹고, 일하고, 자는
            시간을 제외하면 거의 대부분의 시간을 부동산 앱을 뒤지는 데 썼다. 아, 사실
            일하면서도 몰래몰래 부동산 앱을 뒤져보고, 화장실에서 일보는 잠깐의 시간도
            알뜰하게 사용했다. 집을 구하는 일은 번거롭지만 어느 정도 설레는 일이기도 하다.
            그래서 나는 매일 우는 소리를 하면서도 집 보러 다니는 일을 은근히 즐기고
            있었다.
          </p>`,
        createdAt: getTime(-7, -60 * 60 * 5),
        updatedAt: getTime(-7, -60 * 60 * 5),
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "자기반성",
            },
            content: "좋은 집 구하셨으면 좋겠습니다",
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "AI러 이채문",
              image: `/files/${clientId}/user-apeach.webp`,
            },
            content: "한 수 배웁니다.",
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },
      {

      }
    ],
    // 코드
    code: [
    ],
    // 설정
    config: [

    ],
  }
};