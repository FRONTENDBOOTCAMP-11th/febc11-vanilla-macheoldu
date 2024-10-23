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
        type: 'admin',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '2000.01.31',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 's1@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '나이키',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('user'),
        email: 'u2@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '어피치',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          birthday: '2001.10.13',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'u1@gmail.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '제이지',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: '1988.05.13',
        },
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 125100,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '나이키 잼',
        quantity: 9999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_JAM_01.jpg`,
            name: 'NIKE_JAM_01.jpg',
            originalname: 'NIKE_JAM_01.jpg',
          }
        ],
        content: `나이키가 세계적인 무대에 오르는 브레이크 댄서를 위해 제작한 첫 신발인 잼과 함께 몸과 마음, 정신을 하나로 만들어 보세요. 신발의 모든 디테일을 꼼꼼히 제작했기 때문에 자신 있게 사이퍼에 도전할 수 있습니다. 유연하고 내구성이 뛰어난 갑피가 몸을 따라 움직이며, 중창의 텍스처 처리된 핸드 그립 덕분에 공중에서 신발을 쉽게 잡을 수 있습니다. 그리고 위아래가 뒤집힌 로고를 배치해 프리즈 동작을 할 때 로고가 똑바로 보이는 재미를 더했죠.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          depth: 1,
          isNew: true,
          isBest: false,
          category: ['PC02', 'PC0201'], // Women > 신발
          primeCost: 139000,
          gender: 'women',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 125100,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '나이키 잼',
        quantity: 20,
        buyQuantity: 10,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_JAM_01.jpg`,
            name: 'NIKE_JAM_01.jpg',
            originalname: 'NIKE_JAM_01.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_02.png`,
            name: 'NIKE_JAM_02.png',
            originalname: 'NIKE_JAM_02.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_03.jpg`,
            name: 'NIKE_JAM_03.jpg',
            originalname: 'NIKE_JAM_03.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_04.png`,
            name: 'NIKE_JAM_04.png',
            originalname: 'NIKE_JAM_04.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_05.png`,
            name: 'NIKE_JAM_05.png',
            originalname: 'NIKE_JAM_05.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_06.png`,
            name: 'NIKE_JAM_06.png',
            originalname: 'NIKE_JAM_06.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_07.jpg`,
            name: 'NIKE_JAM_07.jpg',
            originalname: 'NIKE_JAM_07.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_08.jpg`,
            name: 'NIKE_JAM_08.jpg',
            originalname: 'NIKE_JAM_08.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_09.png`,
            name: 'NIKE_JAM_09.png',
            originalname: 'NIKE_JAM_09.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_10.png`,
            name: 'NIKE_JAM_10.png',
            originalname: 'NIKE_JAM_10.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_11.png`,
            name: 'NIKE_JAM_11.png',
            originalname: 'NIKE_JAM_11.png',
          },

        ],
        content: `나이키 잼 갈색`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          depth: 2,
          parent: 1,
          size: [220, 225, 230, 235, 240, 245, 250, 255, 260],
          color: '다크 드리프트우드/헴프/세일/블랙',
          styleNo: 'FN0314-200',
          primeCost: 139000,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 125100,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '나이키 잼',
        quantity: 30,
        buyQuantity: 15,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_JAM_b_01.png`,
            name: 'NIKE_JAM_b_01.png',
            originalname: 'NIKE_JAM_b_01.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_02.png`,
            name: 'NIKE_JAM_b_02.png',
            originalname: 'NIKE_JAM_b_02.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_03.png`,
            name: 'NIKE_JAM_b_03.png',
            originalname: 'NIKE_JAM_b_03.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_04.png`,
            name: 'NIKE_JAM_b_04.png',
            originalname: 'NIKE_JAM_b_04.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_05.png`,
            name: 'NIKE_JAM_b_05.png',
            originalname: 'NIKE_JAM_b_05.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_06.png`,
            name: 'NIKE_JAM_b_06.png',
            originalname: 'NIKE_JAM_b_06.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_07.jpg`,
            name: 'NIKE_JAM_b_07.jpg',
            originalname: 'NIKE_JAM_b_07.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_08.jpg`,
            name: 'NIKE_JAM_b_08.jpg',
            originalname: 'NIKE_JAM_b_08.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_09.png`,
            name: 'NIKE_JAM_b_09.png',
            originalname: 'NIKE_JAM_b_09.png',
          },
          {
            path: `/files/${clientId}/NIKE_JAM_b_10.png`,
            name: 'NIKE_JAM_b_10.png',
            originalname: 'NIKE_JAM_b_10.png',
          },

        ],
        content: `나이키 잼 검은색`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          depth: 2,
          parent: 1,
          size: [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270],
          color: '블랙/검 라이트 브라운/검 미디엄 브라운',
          styleNo: 'FN0314-002',
          primeCost: 139000,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 109000,
        show: true,
        active: true,
        name: '나이키 투어 리펠',
        quantity: 30,
        buyQuantity: 10,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_01.png`,
            name: 'NIKE_TOUR_REPEL_01.png',
            originalname: 'NIKE_TOUR_REPEL_01.png',
          },
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_02.png`,
            name: 'NIKE_TOUR_REPEL_02.png',
            originalname: 'NIKE_TOUR_REPEL_02.png',
          },
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_03.jpg`,
            name: 'NIKE_TOUR_REPEL_03.jpg',
            originalname: 'NIKE_TOUR_REPEL_03.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_04.jpg`,
            name: 'NIKE_TOUR_REPEL_04.jpg',
            originalname: 'NIKE_TOUR_REPEL_04.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_05.png`,
            name: 'NIKE_TOUR_REPEL_05.png',
            originalname: 'NIKE_TOUR_REPEL_05.png',
          },
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_06.jpg`,
            name: 'NIKE_TOUR_REPEL_06.jpg',
            originalname: 'NIKE_TOUR_REPEL_06.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TOUR_REPEL_07.png`,
            name: 'NIKE_TOUR_REPEL_07.png',
            originalname: 'NIKE_TOUR_REPEL_07.png',
          }
        ],
        content: `약한 비가 내리는 날씨라고 골프를 포기하지는 마세요. 이 편안한 핏의 발수 베스트가 곁에 있을 거예요. 밑단에 조절 가능한 번지 코드가 있어 핏과 보호력을 조절할 수 있으며, 날씨 때문에 경기가 방해받지 않도록 도와줍니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          isNew: false,
          isBest: true,
          category: ['PC02', 'PC0203'], // Women > 용품
          size: ['XS', 'S', 'M', 'L', 'XL'],
          color: '블랙/화이트',
          styleNo: 'DZ6021-010',
          primeCost: 109000,
          gender: 'women',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 179000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '나이키 테크 윈드러너',
        quantity: 40,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_JAM_01.jpg`,
            name: 'NIKE_JAM_01.jpg',
            originalname: 'NIKE_JAM_01.jpg',
          }
        ],
        content: `시그니처 윈드러너 재킷을 산뜻하게 재해석한 이 버전은 매끄럽고 약간의 신축성이 있는 우븐 소재로 제작되었습니다. 가슴과 팔, 몸체가 넉넉한 디자인으로 완성되어 편안하게 레이어링하고 움직일 수 있습니다. 후드와 밑단에 신축성 있는 조임 끈을 적용해 원하는 핏을 연출할 수 있습니다.`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          depth: 1,
          isNew: false,
          isBest: false,
          category: ['PC01', 'PC0103', 'PC010305'], // Men > 의류 > 트랙수트
          primeCost: 179000,
          gender: 'men',
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 179000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '나이키 테크 윈드러너',
        quantity: 20,
        buyQuantity: 10,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_01.png`,
            name: 'NIKE_TECH_WIND_01.png',
            originalname: 'NIKE_TECH_WIND_01.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_02.png`,
            name: 'NIKE_TECH_WIND_02.png',
            originalname: 'NIKE_TECH_WIND_02.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_03.jpg`,
            name: 'NIKE_TECH_WIND_03.jpg',
            originalname: 'NIKE_TECH_WIND_03.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_04.jpg`,
            name: 'NIKE_TECH_WIND_04.jpg',
            originalname: 'NIKE_TECH_WIND_04.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_05.png`,
            name: 'NIKE_TECH_WIND_05.png',
            originalname: 'NIKE_TECH_WIND_05.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_06.jpg`,
            name: 'NIKE_TECH_WIND_06.jpg',
            originalname: 'NIKE_TECH_WIND_06.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_07.png`,
            name: 'NIKE_TECH_WIND_07.png',
            originalname: 'NIKE_TECH_WIND_07.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_08.png`,
            name: 'NIKE_TECH_WIND_08.png',
            originalname: 'NIKE_TECH_WIND_08.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_09.jpg`,
            name: 'NIKE_TECH_WIND_09.jpg',
            originalname: 'NIKE_TECH_WIND_09.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_10.jpg`,
            name: 'NIKE_TECH_WIND_10.jpg',
            originalname: 'NIKE_TECH_WIND_10.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_11.png`,
            name: 'NIKE_TECH_WIND_11.png',
            originalname: 'NIKE_TECH_WIND_11.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_12.png`,
            name: 'NIKE_TECH_WIND_12.png',
            originalname: 'NIKE_TECH_WIND_12.png',
          },

        ],
        content: `나이키 테크 윈드러너 블랙`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          depth: 2,
          parent: 5,
          size: ['S', 'M', 'L', 'XL', 'XXL'],
          color: '블랙/블랙/블랙',
          styleNo: 'HM7152-010',
          primeCost: 179000,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 179000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '나이키 테크 윈드러너',
        quantity: 30,
        buyQuantity: 15,
        mainImages: [
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_01.png`,
            name: 'NIKE_TECH_WIND_o_01.png',
            originalname: 'NIKE_TECH_WIND_o_01.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_02.png`,
            name: 'NIKE_TECH_WIND_o_02.png',
            originalname: 'NIKE_TECH_WIND_o_02.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_03.jpg`,
            name: 'NIKE_TECH_WIND_o_03.jpg',
            originalname: 'NIKE_TECH_WIND_o_03.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_04.jpg`,
            name: 'NIKE_TECH_WIND_o_04.jpg',
            originalname: 'NIKE_TECH_WIND_o_04.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_05.jpg`,
            name: 'NIKE_TECH_WIND_o_05.jpg',
            originalname: 'NIKE_TECH_WIND_o_05.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_06.jpg`,
            name: 'NIKE_TECH_WIND_o_06.jpg',
            originalname: 'NIKE_TECH_WIND_o_06.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_07.png`,
            name: 'NIKE_TECH_WIND_o_07.png',
            originalname: 'NIKE_TECH_WIND_o_07.png',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_08.jpg`,
            name: 'NIKE_TECH_WIND_o_08.jpg',
            originalname: 'NIKE_TECH_WIND_o_08.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_09.jpg`,
            name: 'NIKE_TECH_WIND_o_09.jpg',
            originalname: 'NIKE_TECH_WIND_o_09.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_10.jpg`,
            name: 'NIKE_TECH_WIND_o_10.jpg',
            originalname: 'NIKE_TECH_WIND_o_10.jpg',
          },
          {
            path: `/files/${clientId}/NIKE_TECH_WIND_o_11.png`,
            name: 'NIKE_TECH_WIND_o_11.png',
            originalname: 'NIKE_TECH_WIND_o_11.png',
          },

        ],
        content: `나이키 테크 윈드러너 올리브`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          depth: 2,
          parent: 5,
          size: [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270],
          color: '미디엄 올리브/미디엄 올리브/블랙',
          styleNo: 'HM7152-223',
          primeCost: 179000,
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
            name: '나이키 잼',
            image: {
              path: `/files/${clientId}/NIKE_JAM_01.jpg`,
              name: 'NIKE_JAM_01.jpg',
              originalname: 'NIKE_JAM_01.jpg',
            },
            quantity: 2,
            price: 250200,
            review_id: 1,
          },
        ],
        cost: {
          products: 250200,
          shippingFees: 3000,
          discount: {
            products: 0,
            shippingFees: 3000,
          },
          total: 250200,
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
            _id: 4,
            seller_id: 2,
            state: 'OS010',
            name: '나이키 투어 리펠',
            image: {
              path: `/files/${clientId}/NIKE_TOUR_REPEL_01.png`,
              name: 'NIKE_TOUR_REPEL_01.png',
              originalname: 'NIKE_TOUR_REPEL_01.png',
            },
            quantity: 1,
            price: 109000,
          },
          {
            _id: 7,
            seller_id: 2,
            state: 'OS010',
            name: '나이키 테크 윈드러너',
            image: {
              path: `/files/${clientId}/NIKE_TECH_WIND_o_01.png`,
              name: 'NIKE_TECH_WIND_o_01.png',
              originalname: 'NIKE_TECH_WIND_o_01.png',
            },
            quantity: 2,
            price: 358000,
          },
        ],
        cost: {
          products: 467000,
          shippingFees: 3000,
          discount: {
            products: 0,
            shippingFees: 3000,
          },
          total: 467000,
        },
        createdAt: getTime(-4, -60 * 60 * 22),
        updatedAt: getTime(-2, -60 * 60 * 12),
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
          image: `/files/${clientId}/user-jayg.webp`
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: '아이가 좋아해요.',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
    ],
    // 장바구니
    cart: [
      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 2,
        quantity: 2,
        size: 255,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
        product: {
          _id: 2,
          name: '나이키 잼',
          price: 125100,
          seller_id: 2,
          quantity: 20,
          buyQuantity: 10,
          image: {
            path: '/files/vanilla00/NIKE_JAM_01.jpg',
            name: 'NIKE_JAM_01.jpg',
            originalname: 'NIKE_JAM_01.jpg'
          },
          extra: {
            depth: 2,
            parent: 1,
            size: [220, 225, 230, 235, 240, 245, 250, 255, 260],
            color: '다크 드리프트우드/헴프/세일/블랙',
            styleNo: 'FN0314-200',
            primeCost: 139000
          }
        }

      },

      {
        _id: await nextSeq('cart'),
        user_id: 4,
        product_id: 4,
        quantity: 1,
        size: 'XL',
        createdAt: getTime(-3, -60 * 60 * 4),
        updatedAt: getTime(-3, -60 * 60 * 4),
        product: {
          _id: 4,
          name: '나이키 투어 리펠',
          price: 109000,
          seller_id: 2,
          quantity: 30,
          buyQuantity: 10,
          image: {
            path: '/files/vanilla00/NIKE_TOUR_REPEL_01.png',
            name: 'NIKE_TOUR_REPEL_01.png',
            originalname: 'NIKE_TOUR_REPEL_01.png'
          },
          extra: {
            isNew: true,
            isBest: true,
            category: ['PC02', 'PC0203'],
            size: ['XS', 'S', 'M', 'L', 'XL'],
            color: '블랙/화이트',
            styleNo: 'DZ6021-010',
            primeCost: 109000,
            gender: 'women'
          }
        }
      }
    ],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq('bookmark'),
        type: 'product',
        user_id: 4,
        target_id: 3,
        user: {
          _id: 4,
          name: '제이지',
          email: 'u1@gmail.com',
          image: `/files/${clientId}/user-jayg.webp`
        },
        memo: '첫째 크리스마스 선물.',
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('bookmark'),
        type: 'product',
        user_id: 4,
        target_id: 6,
        user: {
          _id: 4,
          name: '제이지',
          email: 'u1@gmail.com',
          image: `/files/${clientId}/user-jayg.webp`
        },
        memo: '둘째 생일 선물',
        createdAt: getTime(-1, -60 * 60 * 12),
      },
    ],
    // QnA, 공지사항 등의 게시판
    post: [],
    // 코드
    code: [
      {
        _id: 'productCategory',
        title: '상품 카테고리',
        codes: [
          {
            sort: 1,
            code: 'PC01',
            value: 'Men',
            desc: '남성',
            depth: 1,
          },
          {
            sort: 3,
            code: 'PC0101',
            value: '용품',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 1,
            code: 'PC0102',
            value: '신발',
            parent: 'PC01',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0103',
            value: '의류',
            parent: 'PC01',
            depth: 2,
          },
          // Men > 용품
          {
            sort: 2,
            code: 'PC010101',
            value: '가방',
            parent: 'PC0101',
            depth: 3,
          },
          {
            sort: 1,
            code: 'PC010102',
            value: '모자 & 헤드밴드',
            parent: 'PC0101',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC010103',
            value: '장갑',
            parent: 'PC0101',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC010104',
            value: '슬리브 & 암 밴드',
            parent: 'PC0101',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC010105',
            value: '공',
            parent: 'PC0101',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC010106',
            value: '보호대',
            parent: 'PC0101',
            depth: 3,
          },
          // Men > 신발
          {
            sort: 2,
            code: 'PC010201',
            value: '라이프스타일',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 1,
            code: 'PC010202',
            value: '조던',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC010203',
            value: '러닝',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC010204',
            value: '농구',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC010205',
            value: '미식축구',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC010206',
            value: '축구',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 7,
            code: 'PC010207',
            value: '트레이닝 및 짐',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 8,
            code: 'PC010208',
            value: '스케이트보딩',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 9,
            code: 'PC010209',
            value: '골프',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 10,
            code: 'PC010210',
            value: '테니스',
            parent: 'PC0102',
            depth: 3,
          },
          {
            sort: 11,
            code: 'PC010211',
            value: '샌들 & 슬리퍼',
            parent: 'PC0102',
            depth: 3,
          },
          // Men > 의류
          {
            sort: 1,
            code: 'PC010301',
            value: '탑 & 티셔츠',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC010302',
            value: '후디 & 크루',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC010303',
            value: '재킷 & 베스트',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC010304',
            value: '팬츠 & 타이즈',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC010305',
            value: '트랙수트',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC010306',
            value: '쇼츠',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 7,
            code: 'PC010307',
            value: '점프수트 & 롬퍼스',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 8,
            code: 'PC010308',
            value: '서핑 & 수영복',
            parent: 'PC0103',
            depth: 3,
          },
          {
            sort: 9,
            code: 'PC010309',
            value: '양말',
            parent: 'PC0103',
            depth: 3,
          },



          {
            sort: 2,
            code: 'PC02',
            value: 'Women',
            depth: 1,
          },


          {
            sort: 1,
            code: 'PC0201',
            value: '신발',
            parent: 'PC02',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0202',
            value: '의류',
            parent: 'PC02',
            depth: 2,
          },
          {
            sort: 3,
            code: 'PC0203',
            value: '용품',
            parent: 'PC02',
            depth: 2,
          },

          // Women > 신발
          {
            sort: 1,
            code: 'PC020101',
            value: '라이프스타일',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC020102',
            value: '러닝',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC020103',
            value: '농구',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC020104',
            value: '축구',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC020105',
            value: '드레이닝 & 짐',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC020106',
            value: '조던',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 7,
            code: 'PC020107',
            value: '스케이트보딩',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 8,
            code: 'PC020108',
            value: '골프',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 9,
            code: 'PC020109',
            value: '테니스',
            parent: 'PC0201',
            depth: 3,
          },
          {
            sort: 10,
            code: 'PC020110',
            value: '샌들 & 슬리퍼',
            parent: 'PC0201',
            depth: 3,
          },
          // Women > 의류
          {
            sort: 1,
            code: 'PC020201',
            value: '탑 & 티셔츠',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC020202',
            value: '스포츠 브라',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC020203',
            value: '후디 & 크루',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC020204',
            value: '쇼츠',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC020205',
            value: '팬츠 & 타이츠',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC020206',
            value: '재킷 & 베스트',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 7,
            code: 'PC020207',
            value: '트랙수트',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 8,
            code: 'PC020208',
            value: '점프수트 & 롬퍼스',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 9,
            code: 'PC020209',
            value: '스커트 & 드레스',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 10,
            code: 'PC020210',
            value: '서핑 & 수영복',
            parent: 'PC0202',
            depth: 3,
          },
          {
            sort: 11,
            code: 'PC020211',
            value: '양말',
            parent: 'PC0202',
            depth: 3,
          },
          // Women > 용품
          {
            sort: 1,
            code: 'PC020301',
            value: '가방',
            parent: 'PC0203',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC020302',
            value: '모자 & 헤드밴드',
            parent: 'PC0203',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC020303',
            value: '장갑',
            parent: 'PC0203',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC020304',
            value: '슬리브 & 암 밴드',
            parent: 'PC0203',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC020305',
            value: '공',
            parent: 'PC0203',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC020306',
            value: '보호대',
            parent: 'PC0203',
            depth: 3,
          },

          {
            sort: 2,
            code: 'PC03',
            value: 'Kids',
            depth: 1,
          },


          {
            sort: 1,
            code: 'PC0301',
            value: '신발',
            parent: 'PC03',
            depth: 2,
          },
          {
            sort: 2,
            code: 'PC0302',
            value: '의류',
            parent: 'PC03',
            depth: 2,
          },
          {
            sort: 3,
            code: 'PC0303',
            value: '용품',
            parent: 'PC03',
            depth: 2,
          },
          // Kids > 신발
          {
            sort: 1,
            code: 'PC030101',
            value: '라이프스타일',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC030102',
            value: '조던',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC030103',
            value: '러닝',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC030104',
            value: '농구',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC030105',
            value: '축구',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC030106',
            value: '스케이트보딩',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 7,
            code: 'PC030107',
            value: '샌들 & 슬리퍼',
            parent: 'PC0301',
            depth: 3,
          },
          {
            sort: 8,
            code: 'PC030108',
            value: '테니스',
            parent: 'PC0301',
            depth: 3,
          },

          // Kids > 의류
          {
            sort: 1,
            code: 'PC030201',
            value: '탑 & 티셔츠',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC030202',
            value: '쇼츠',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC030203',
            value: '상하의 세트',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC030204',
            value: '점프수트 & 롬퍼스',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC030205',
            value: '팬츠 & 타이츠',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC030206',
            value: '스커트 & 드레스',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 7,
            code: 'PC030207',
            value: '양말',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 8,
            code: 'PC030208',
            value: '스포츠 브라',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 9,
            code: 'PC030209',
            value: '재킷 & 베스트',
            parent: 'PC0302',
            depth: 3,
          },
          {
            sort: 10,
            code: 'PC030210',
            value: '후디 & 크루',
            parent: 'PC0302',
            depth: 3,
          },
          // Kids > 용품
          {
            sort: 1,
            code: 'PC030301',
            value: '가방',
            parent: 'PC0303',
            depth: 3,
          },
          {
            sort: 2,
            code: 'PC030302',
            value: '모자 & 헤드밴드',
            parent: 'PC0303',
            depth: 3,
          },
          {
            sort: 3,
            code: 'PC030303',
            value: '양말',
            parent: 'PC0303',
            depth: 3,
          },
          {
            sort: 4,
            code: 'PC030304',
            value: '장갑',
            parent: 'PC0303',
            depth: 3,
          },
          {
            sort: 5,
            code: 'PC030305',
            value: '공',
            parent: 'PC0303',
            depth: 3,
          },
          {
            sort: 6,
            code: 'PC030306',
            value: '보호대',
            parent: 'PC0303',
            depth: 3,
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
        value: 20000,
      },
    ],
  };
};
