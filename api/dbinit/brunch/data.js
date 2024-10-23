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
    data-block-index="88" data-shown="false"><br></p>
</div>`,
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
          image: '/files/00-next-level/user-apeach.webp',
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