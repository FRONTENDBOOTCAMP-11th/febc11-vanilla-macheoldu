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
        email: 'admin@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '무지',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        loginType: 'email',
        image: `/files/${clientId}/user-muzi.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '03-23',
          membershipClass: 'MC03',
          addressBook: [
            {
              id: 1,
              name: '집',
              value: '서울시 강남구 역삼동 123',
            },
            {
              id: 2,
              name: '회사',
              value: '서울시 강남구 신사동 234',
            },
          ],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '네오',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
          membershipClass: 'MC01',
          addressBook: [
            {
              id: 1,
              name: '회사',
              value: '서울시 강남구 삼성동 567',
            },
            {
              id: 2,
              name: '학교',
              value: '서울시 강남구 역삼동 234',
            },
          ],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's2@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '어피치',
        phone: '01033334444',
        address: '서울시 강남구 도곡동 789',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          confirm: false, // 관리자 승인이 안됨
          birthday: '11-24',
          membershipClass: 'MC02',
          addressBook: [
            {
              id: 1,
              name: '회사',
              value: '서울시 마포구 연희동 123',
            },
            {
              id: 2,
              name: '가게',
              value: '서울시 강남구 학동 234',
            },
          ],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'u1@market.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '제이지',
        phone: '01044445555',
        address: '서울시 강남구 논현동 222',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: '11-30',
          membershipClass: 'MC02',
          address: [
            {
              id: 1,
              name: '회사',
              value: '서울시 강동구 천호동 123',
            },
            {
              id: 2,
              name: '집',
              value: '서울시 강동구 성내동 234',
            },
          ],
        },
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 22800,
        shippingFees: 0,
        show: true,
        active: true,
        name: '캥거루 스턴트 독 로봇완구',
        quantity: 320,
        buyQuantity: 310,
        mainImages: [
          {
            path: `/files/${clientId}/sample-dog.jpg`,
            name: 'sample-dog.jpg',
            originalname: '스턴트 독.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>캥거루 스턴트 독 로봇완구 상세 설명</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          isNew: true,
          isBest: true,
          category: ['PC03', 'PC0301'],
          sort: 5,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 17260,
        shippingFees: 2500,
        show: true,
        active: true,
        name: '헬로카봇 스톰다이버',
        quantity: 200,
        buyQuantity: 198,
        mainImages: [
          {
            path: `/files/${clientId}/sample-diver.jpg`,
            name: 'sample-diver.jpg',
            originalname: '헬로카봇.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>헬로카봇 스톰다이버 상세 설명</p>
          </div>`,
        createdAt: getTime(-38, -60 * 60 * 6),
        updatedAt: getTime(-33, -60 * 55),
        extra: {
          isNew: false,
          isBest: true,
          category: ['PC01', 'PC0103'],
          sort: 4,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 48870,
        shippingFees: 0,
        show: true,
        active: true,
        name: '레고 클래식 라지 조립 박스 10698',
        quantity: 100,
        buyQuantity: 99,
        mainImages: [
          {
            path: `/files/${clientId}/sample-classic.jpg`,
            name: 'sample-classic.jpg',
            originalname: '레고 클래식.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>레고 클래식 라지 조립 박스 10698 상세 설명</p>
          </div>`,
        createdAt: getTime(-35, -60 * 60 * 6),
        updatedAt: getTime(-10, -60 * 19),
        extra: {
          isNew: true,
          isBest: true,
          category: ['PC01', 'PC0103'],
          sort: 3,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 45000,
        shippingFees: 3500,
        show: true,
        active: true,
        name: '레고 테크닉 42151 부가티 볼리드',
        quantity: 100,
        buyQuantity: 89,
        mainImages: [
          {
            path: `/files/${clientId}/sample-bugatti.png`,
            name: 'sample-bugatti.png',
            originalname: '부가티.png',
          },
        ],
        content: `
          <div class="product-detail">
            <p>레고 테크닉 42151 부가티 볼리드 상세 설명</p>
          </div>`,
        createdAt: getTime(-33, -60 * 60 * 7),
        updatedAt: getTime(-22, -60 * 60 * 3),
        extra: {
          isNew: false,
          isBest: true,
          category: ['PC03', 'PC0303'],
          sort: 1,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 45000,
        shippingFees: 3500,
        show: true,
        active: true,
        name: '레고 마인크래프트 21246 깊고 어두운 전장',
        quantity: 100,
        buyQuantity: 98,
        mainImages: [
          {
            path: `/files/${clientId}/sample-minecraft.png`,
            name: 'sample-minecraft.png',
            originalname: '마인크래프트.png',
          },
        ],
        content: `
          <div class="product-detail">
            <p>레고 마인크래프트 21246 깊고 어두운 전장 상세 설명</p>
          </div>`,
        createdAt: getTime(-30, -60 * 60 * 10),
        updatedAt: getTime(-10, -60 * 56),
        extra: {
          isNew: true,
          isBest: false,
          today: true,
          category: ['PC03', 'PC0303'],
          sort: 2,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 54790,
        shippingFees: 4000,
        show: false,
        active: true,
        name: '레고 마블 76247 헐크버스터: 와칸다의 전투',
        quantity: 100,
        buyQuantity: 99,
        mainImages: [
          {
            path: `/files/${clientId}/sample-hulk.png`,
            name: 'sample-hulk.png',
            originalname: '헐크.png',
          },
        ],
        content: `
          <div class="product-detail">
            <p>레고 마블 76247 헐크버스터: 와칸다의 전투 상세 설명</p>
          </div>`,
        createdAt: getTime(-30, -60 * 60 * 21),
        updatedAt: getTime(-20, -60 * 10),
        extra: {
          isNew: false,
          isBest: false,
          category: ['PC03', 'PC0303'],
          sort: 1,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 13000,
        shippingFees: 3500,
        show: true,
        active: true,
        name: '할리갈리 보드게임',
        quantity: 100,
        buyQuantity: 98,
        mainImages: [
          {
            path: `/files/${clientId}/sample-halligalli.jpg`,
            name: 'sample-halligalli.jpg',
            originalname: '할리갈리.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>할리갈리 보드게임 상세 설명</p>
          </div>`,
        createdAt: getTime(-25, -60 * 60 * 12),
        updatedAt: getTime(-24, -60 * 23),
        extra: {
          isNew: false,
          isBest: true,
          category: ['PC01', 'PC0102', 'PC010201'],
          sort: 3,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 26000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '루미큐브 클래식',
        quantity: 100,
        buyQuantity: 97,
        mainImages: [
          {
            path: `/files/${clientId}/sample-rummikub.png`,
            name: 'sample-rummikub.png',
            originalname: '루미큐브.png',
          },
        ],
        content: `
          <div class="product-detail">
            <p>루미큐브 클래식 상세 설명</p>
          </div>`,
        createdAt: getTime(-22, -60 * 60 * 22),
        updatedAt: getTime(-20, -60 * 33),
        extra: {
          isNew: true,
          isBest: true,
          category: ['PC01', 'PC0102', 'PC010202'],
          sort: 8,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 12000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '짱구는 못말려 숲속 산책 직소퍼즐',
        quantity: 100,
        buyQuantity: 96,
        mainImages: [
          {
            path: `/files/${clientId}/sample-jjangu.jpg`,
            name: 'sample-jjangu.jpg',
            originalname: '짱구.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>짱구는 못말려 숲속 산책 직소퍼즐 상세 설명</p>
          </div>`,
        createdAt: getTime(-21, -60 * 60 * 4),
        updatedAt: getTime(-16, -60 * 15),
        extra: {
          isNew: true,
          isBest: false,
          today: true,
          category: ['PC03', 'PC0302'],
          sort: 2,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 24000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '라푼젤 그녀의 꿈 직소퍼즐 KD-1000-001 + 그림 엽서(랜덤) + 품질보증서',
        quantity: 100,
        buyQuantity: 95,
        mainImages: [
          {
            path: `/files/${clientId}/sample-rapunzel.jpg`,
            name: 'sample-rapunzel.jpg',
            originalname: '라푼젤.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>라푼젤 그녀의 꿈 직소퍼즐 KD-1000-001 + 그림 엽서(랜덤) + 품질보증서 상세 설명</p>
          </div>`,
        createdAt: getTime(-18, -60 * 60 * 7),
        updatedAt: getTime(-12, -60 * 33),
        extra: {
          isNew: false,
          isBest: true,
          category: ['PC01', 'PC0101'],
          sort: 4,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 14400,
        shippingFees: 3000,
        show: true,
        active: true,
        name: 'KC인증 스키비디 토일렛 피규어 블럭 8종 중국 호환 레고 블록 장난감 어린이 선물',
        quantity: 100,
        buyQuantity: 94,
        mainImages: [
          {
            path: `/files/${clientId}/sample-skibidi01.jpg`,
            name: 'sample-skibidi01.jpg',
            originalname: '피규어1.jpg',
          },
          {
            path: `/files/${clientId}/sample-skibidi02.jpg`,
            name: 'sample-skibidi02.jpg',
            originalname: '피규어2.jpg',
          },
        ],
        content: `
          <div align="center"><p>*크리스마스 배송 안내</p></div>
          <div align="center"><p>택배사 물량 증가로 평소보다 2~3일 더 걸립니다.</p></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi03.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi04.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><p>*반품 안내</p></div>`,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        extra: {
          isNew: false,
          isBest: false,
          today: true,
          category: ['PC01', 'PC0103'], // 어린이 > 레고
          sort: 6,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 9000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '스키비디 토일렛 봉제 인형 (25cm-30cm) 시리즈 크리스마스 선물',
        quantity: 999,
        buyQuantity: 800,
        mainImages: [
          {
            path: `/files/${clientId}/sample-skibidi11.jpg`,
            name: 'sample-skibidi11.jpg',
            originalname: '토일렛.jpg',
          },
        ],
        content: `
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi12.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi13.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi14.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi15.jpg"></div>`,
        createdAt: getTime(-11, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: true,
          category: ['PC01', 'PC0103'], // 어린이 > 레고
          sort: 7,
        },
      },
      // 13번 상품
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 21600,
        shippingFees: 5500,
        show: true,
        active: true,
        name: 'KC인증 스키비디 토일렛 피규어 블럭 4종 중국 호환 레고 블록 장난감 어린이 선물',
        quantity: 99,
        buyQuantity: 94,
        mainImages: [
          {
            path: `/files/${clientId}/sample-skibidi21.jpg`,
            name: 'sample-skibidi21.jpg',
            originalname: '스키비디.jpg',
          },
        ],
        content: `
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi22.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi23.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-skibidi24.jpg"></div>`,
        createdAt: getTime(-10, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: false,
          category: ['PC01', 'PC0103'], // 어린이 > 레고
          sort: 6,
        },
      },
      // 14번 상품. shippingFees가 없을 경우 config.shippingFees 사용
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 12900,
        // shippingFees: 3500,
        show: true,
        active: true,
        name: '푸쉬팝게임기 팝잇 푸시팝 게임기 두더지게임 핑거 뽁뽁이 애니멀 1+1',
        quantity: 300,
        buyQuantity: 298,
        mainImages: [
          {
            path: `/files/${clientId}/sample-pushpop01.jpg`,
            name: 'sample-pushpop01.jpg',
            originalname: '푸쉬팝1.jpg',
          },
          {
            path: `/files/${clientId}/sample-pushpop02.jpg`,
            name: 'sample-pushpop02.jpg',
            originalname: '푸쉬팝2.jpg',
          },
          {
            path: `/files/${clientId}/sample-pushpop03.jpg`,
            name: 'sample-pushpop03.jpg',
            originalname: '푸쉬팝3.jpg',
          },
        ],
        content: `
          <div align="center"><p>푸쉬팝게임기 팝잇 푸시팝 게임기 두더지게임 핑거 뽁뽁이 애니멀을 구매하시는 모든 분께 사은품(무작위)으로 하나 더 드립니다.</p></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-pushpop04.gif"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-pushpop05.jpg"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-pushpop06.jpg"></div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          isNew: false,
          isBest: true,
          category: ['PC01', 'PC0102'], // 어린이 > 보드게임
          sort: 5,
        },
      },
      // 15번 상품. 옵션이 있는 경우 메인 상품 정보
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 12900,
        shippingFees: 3500,
        show: true,
        active: true,
        name: '샤넬 NO.5',
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-pushpop01.jpg`,
            name: 'sample-pushpop01.jpg',
            originalname: '샤넬.jpg',
          },
        ],
        content: `샤넬 향수`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 1,
        },
      },
      // 16번 상품. 옵션이 있는 경우 옵션 상품 정보. 15번 상품의 하위 상품(옵션)
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        price: 6900,
        shippingFees: 3500,
        name: '샤넬 NO.5',
        quantity: 1,
        buyQuantity: 0,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/sample-pushpop03.jpg`,
            name: 'sample-pushpop03.jpg',
            originalname: '샤넬.jpg',
          },
        ],
        content: `3달 쓴 향수입니다.`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          depth: 2,
          parent: 15,
          size: '200mm',
        },
      },
    ],
    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS020',
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: 'OS020',
            name: '헬로카봇 스톰다이버',
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: 'sample-diver.jpg',
              originalname: '헬로카봇.jpg',
            },
            quantity: 2,
            price: 34520,
            review_id: 3,
          },
        ],
        cost: {
          products: 34520,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 37020,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS010',
        products: [
          {
            _id: 3,
            seller_id: 2,
            state: 'OS010',
            name: '레고 클래식 라지 조립 박스 10698',
            image: {
              path: `/files/${clientId}/sample-classic.jpg`,
              name: 'sample-classic.jpg',
              originalname: '레고 클래식.jpg',
            },
            quantity: 1,
            price: 48870,
          },
          {
            _id: 4,
            seller_id: 3,
            state: 'OS010',
            name: '레고 테크닉 42151 부가티 볼리드',
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: 'sample-bugatti.png',
              originalname: '부가티.png',
            },
            quantity: 2,
            price: 90000,
            review_id: 2,
          },
        ],
        cost: {
          products: 138840,
          shippingFees: 3500,
          discount: {
            products: 13880,
            shippingFees: 3500,
          },
          total: 124960,
        },
        address: {
          name: '집',
          value: '서울시 강남구 역삼동 123',
        },
        createdAt: getTime(-4, -60 * 60 * 22),
        updatedAt: getTime(-2, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS040',
        products: [
          {
            _id: 4,
            seller_id: 3,
            state: 'OS110',
            name: '레고 테크닉 42151 부가티 볼리드',
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: 'sample-bugatti.png',
              originalname: '부가티.png',
            },
            quantity: 1,
            price: 45000,
            review_id: 1,
          },
        ],
        cost: {
          products: 45000,
          shippingFees: 3500,
          discount: {
            products: 4500,
            shippingFees: 0,
          },
          total: 44000,
        },
        address: {
          name: '학교',
          value: '서울시 강남구 역삼동 234',
        },
        payment: {
          success: true,
          imp_uid: 'imp_138601212227',
          pay_method: 'card',
          merchant_uid: 'mid_1702540599641',
          name: '레고 테크닉 42151 부가티 볼리드',
          paid_amount: 45000,
          currency: 'KRW',
          pg_provider: 'html5_inicis',
          pg_type: 'payment',
          pg_tid: 'StdpayCARDINIpayTest20231214165706277441',
          apply_num: '30123157',
          buyer_name: '제이지',
          buyer_email: 'aceppin@daum.net',
          buyer_tel: '01044445555',
          buyer_addr: '',
          buyer_postcode: '',
          custom_data: null,
          status: 'paid',
          paid_at: 1702540626,
          receipt_url: 'https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20231214165706277441&noMethod=1',
          card_name: '국민KB카드',
          bank_name: null,
          card_quota: 0,
          card_number: '457973*********5',
        },
        delivery: {
          company: '한진 택배',
          trackingNumber: '364495958003',
          url: 'https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003',
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        state: 'OS040',
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: 'OS310',
            name: '헬로카봇 스톰다이버',
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: 'sample-diver.jpg',
              originalname: '헬로카봇.jpg',
            },
            quantity: 1,
            price: 17260,
            review_id: 2,
          },
        ],
        cost: {
          products: 17260,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 19760,
        },
        address: {
          name: '학교',
          value: '서울시 강남구 역삼동 234',
        },
        delivery: {
          company: '한진 택배',
          trackingNumber: '364495958003',
          url: 'https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003',
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
    ],
    // 후기
    review: [
      {
        _id: await nextSeq('review'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp'
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: '아이가 좋아해요.',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('review'),
        user_id: 2,
        user: {
          _id: 2,
          name: '네오',
          image: 'user-neo.webp'
        },
        order_id: 4,
        product_id: 2,
        rating: 4,
        content: '배송이 좀 느려요.',
        createdAt: getTime(-3, -60 * 60 * 1),
      },
      {
        _id: await nextSeq('review'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp'
        },
        order_id: 2,
        product_id: 3,
        rating: 1,
        content: '하루만에 고장났어요.',
        extra: {
          title: '추천하지 않습니다.',
        },
        createdAt: getTime(-2, -60 * 60 * 10),
      },
    ],
    // 장바구니
    cart: [
      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 1,
        quantity: 2,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 2,
        quantity: 1,
        createdAt: getTime(-4, -60 * 30),
        updatedAt: getTime(-3, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 2,
        product_id: 3,
        quantity: 2,
        createdAt: getTime(-3, -60 * 60 * 4),
        updatedAt: getTime(-3, -60 * 60 * 4),
      },
      {
        _id: await nextSeq('cart'),
        user_id: 2,
        product_id: 4,
        quantity: 3,
        createdAt: getTime(-2, -60 * 60 * 12),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
    ],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: `/files/${clientId}/user-jayg.webp`
        },
        type: 'product',
        target_id: 2,
        memo: '첫째 크리스마스 선물.',
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: `/files/${clientId}/user-jayg.webp`
        },
        type: 'product',
        target_id: 4,
        memo: '둘째 생일 선물',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: `/files/${clientId}/user-jayg.webp`
        },
        type: 'user',
        target_id: 2,
        memo: '단골 셀러',
        createdAt: getTime(-2, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 4,
        user: {
          _id: 4,
          name: '제이지',
          image: `/files/${clientId}/user-jayg.webp`
        },
        type: 'post',
        target_id: 1,
        memo: '크기 문의글 북마크',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('bookmark'),
        user_id: 2,
        user: {
          _id: 2,
          name: '네오',
          image: `/files/${clientId}/user-neo.webp`
        },
        type: 'product',
        target_id: 4,
        memo: '1순위로 살것!',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
    ],
    // QnA, 공지사항 등의 게시판
    post: [
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp'
        },
        title: '크기가 얼만만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: 1,
            user_id: 2,
            user: {
              _id: 2,
              name: '네오',
              image: 'user-neo.webp'
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user_id: 4,
            user: {
              _id: 4,
              name: '제이지',
              image: 'user-jayg.webp'
            },
            content: '어디있나 모르겠어요.',
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: 3,
            user_id: 2,
            user: {
              _id: 2,
              name: '네오',
              image: 'user-neo.webp'
            },
            content: '높이 60cm 입니다.',
            like: 3,
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 50,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp'
        },
        title: '이번주 토요일까지 받아볼 수 있을까요?',
        content: '토요일 생일 선물로 준비중인데 그때까지 배송 가능할까요?',
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 4,
        seller_id: 3,
        views: 0,
        user: {
          _id: 2,
          name: '네오',
          image: 'user-neo.webp'
        },
        title: '배송 빨리 보내주세요.',
        content: '양품으로 보내주세요.',
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'notice',
        views: 10,
        user: {
          _id: 1,
          name: '무지',
          image: 'user-muzi.webp'
        },
        title: '배송지연 안내',
        content: '크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.',
        createdAt: getTime(-4, -60 * 60 * 2),
        updatedAt: getTime(-2, -60 * 60 * 13),
      },
      {
        _id: await nextSeq('post'),
        type: 'notice',
        views: 15,
        user: {
          _id: 1,
          name: '무지',
          image: 'user-muzi.webp'
        },
        title: '배송비 인상 안내',
        content: '택배사 배송비 인상으로 인해 기존 3,000원에서 3,500원으로 인상됩니다.',
        createdAt: getTime(-6, -60 * 60 * 20),
        updatedAt: getTime(-4, -60 * 60 * 13),
      },
    ],
    // 코드
    code: [
      {
        _id: 'productCategory',
        title: '상품 카테고리',
        codes: [
          {
            sort: 2,
            code: 'PC01',
            value: '어린이',
            depth: 1,
          },
          {
            sort: 3,
            code: 'PC0101',
            value: '퍼즐',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 1,
            code: 'PC0102',
            value: '보드게임',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC010201',
            value: '2인용',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 1,
            code: 'PC010202',
            value: '3~4인용',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC0103',
            value: '레고',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 4,
            code: 'PC0104',
            value: '로봇',
            parent: 'PC01',
            depth: 2,
          },

          {
            sort: 1,
            code: 'PC02',
            value: '스포츠',
            depth: 1,
          },
          {
            sort: 1,
            code: 'PC0201',
            value: '축구',
            parent: 'PC02',
            depth: 2,
          },
          {
            sort: 3,
            code: 'PC0202',
            value: '야구',
            parent: 'PC02',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0203',
            value: '농구',
            parent: 'PC02',
            depth: 2,
          },

          {
            sort: 3,
            code: 'PC03',
            value: '어른',
            depth: 1,
          },
          {
            sort: 1,
            code: 'PC0301',
            value: '원격 조종',
            parent: 'PC03',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0302',
            value: '퍼즐',
            parent: 'PC03',
            depth: 2,
          },
          {
            sort: 3,
            code: 'PC0303',
            value: '레고',
            parent: 'PC03',
            depth: 2,
          },
        ],
      },
      {
        _id: 'orderState',
        title: '주문 상태',
        codes: [
          {
            sort: 1,
            code: 'OS010',
            value: '주문 완료',
          },
          {
            sort: 2,
            code: 'OS020',
            value: '결제 완료',
          },
          {
            sort: 3,
            code: 'OS030',
            value: '배송 준비중',
          },
          {
            sort: 4,
            code: 'OS035',
            value: '배송중',
          },
          {
            sort: 5,
            code: 'OS040',
            value: '배송 완료',
          },
          {
            sort: 6,
            code: 'OS110',
            value: '반품 요청',
          },
          {
            sort: 7,
            code: 'OS120',
            value: '반품 처리중',
          },
          {
            sort: 8,
            code: 'OS130',
            value: '반품 완료',
          },
          {
            sort: 9,
            code: 'OS210',
            value: '교환 요청',
          },
          {
            sort: 10,
            code: 'OS220',
            value: '교환 처리중',
          },
          {
            sort: 11,
            code: 'OS230',
            value: '교환 완료',
          },
          {
            sort: 12,
            code: 'OS310',
            value: '환불 요청',
          },
          {
            sort: 13,
            code: 'OS320',
            value: '환불 처리중',
          },
          {
            sort: 14,
            code: 'OS330',
            value: '환불 완료',
          },
        ],
      },
      {
        _id: 'membershipClass',
        title: '회원 등급',
        codes: [
          {
            sort: 1,
            code: 'MC01',
            value: '일반',
            discountRate: 0, // 할인율
          },
          {
            sort: 2,
            code: 'MC02',
            value: '프리미엄',
            discountRate: 10,
          },
          {
            sort: 3,
            code: 'MC03',
            value: 'VIP',
            discountRate: 20,
          },
        ],
      },
    ],
    // 설정
    config: [
      {
        _id: 'shippingFees',
        title: '배송비',
        value: 3500,
      },
      {
        _id: 'freeShippingFees',
        title: '배송비 무료 금액',
        value: 50000,
      },
    ],
  };
};
