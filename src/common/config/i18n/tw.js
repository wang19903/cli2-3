// tw.js
export const locale = {
  Navbar: {
    NavItem: ['全部產品', '購物車', '後台管理'],
    EmptyCart: '購物車尚未有商品唷!!',
    GoShop: '前往賣場',
    Checkout: '去結帳',
    Lang: '語言'
    // 用產品名稱
  },
  Cart: {
    ItemName: '品名',
    Qty: '數量',
    SinglePrice: '單價',
    TotalPrice: '總計',
    FinalPrice: '折扣價',
    unit: '個'
  },
  Home: {
    Solgan: '鼎中美食 鮮香味美',
    GoShop: '前往賣場', // 分開管理
    Head: {
      H1: '鼎鮮飯麵',
      H3: '官方網站開幕',
      BeforeCouponText: '結帳輸入優惠碼',
      AfterCouponText: '享 九折優待',
      ClickHere: '點我取得優惠碼!'
    },
    News: {
      Title: '最新消息',
      FirstH3: '新產品',
      FirstName: '冷凍餛飩',
      FirstP: '輕鬆料理，可以加進麵、火鍋，也可以蒸、煎或油炸',
      FirstP2: '更可以發會創意，做成自己喜歡的料理',
      SecondH3: '推薦產品',
      SecondName: '滷豬耳',
      SecondP: '簡單加熱，配上滷汁或是喜歡的醬料即可食用',
      SecondP2: '消夜嘴饞又怕胖，滷豬耳熱量低，不加熱也可直接食用'
    },
    About: {
      Title: '關於我們',
      P:
        '從路邊攤滷味起家，在沒有宣傳下憑著手藝及堅持，慢慢累積顧客，並且在與客戶的交流下，慢慢改良產品，經過多年的努力，在老客戶的累積下開出了店面，增加產品轉為中式創意料理店，中式番茄肉醬加上新鮮食材，健康美味；純手工餛飩以及獨家醬料，在其他地方吃不到的味道。每到過年，老客戶都會來下訂滷味作為年菜，買餛飩或醬料來送禮。如今要邁入二十個年頭，對於顧客的回饋，鼎鮮飯麵會繼續保持品質，並努力回應顧客的需求。',
      Info: '店鋪資訊',
      Adress: '店鋪地址:新北市中和區安樂路x1號',
      NearAdressInfo:
        '位於國立圖書館旁，靠近捷運永安市場站，步行約5分鐘或搭乘免費接駁車。',
      ParkingInfo: '開車親臨，附近有圖書館停車場、國小停車場。',
      Noice: [
        '我們的堅持',
        '不使用人工添加物',
        '每日採購新鮮食材製作',
        '食品來源:牛:澳洲 豬、雞:台灣'
      ]
    }
  },
  ListProducts: {
    BeforeCouponText: '結帳輸入 ',
    AfterCouponText: ' 九折優惠',
    AllCategory: '全部顯示',
    PriceSort: '價格排序',
    AddToCart: '放入購物車'
    // 用產品來命名，用product
  },
  ProductVue: {
    Notice: '注意事項:',
    P1: '每日採購新鮮食材並且不使用食品添加物、防腐劑等。',
    P2: '除醬料品外，只使用冷凍配送，如需一般配送請提供取件資訊或親自提領。',
    P3: '除醬料品外，其他產品保存期較短，不適用七天鑑賞期。',
    P4: '醬料類以及滷汁請勿把表面油層倒掉，並且擦乾器具後使用。',
    P5: '請勿放置在潮濕、高溫處，避免食物變成變質',
    OriginPrice: '原價NT',
    Price: '現在只要NT',
    Selet: '--請選擇--',
    Choose: '選購',
    Total: '小計',
    AddToCart: '加到購物車',
    Recommend: '你可能有興趣...'
  },
  Customer: {
    Email: '電子信箱(必填)', // must
    EmailCorrect: '電子信箱正確',
    OrderName: '訂購者名稱(必填)', // must,
    RecipientName: '包裹收件人為',
    tel: '電話(必填)', // must
    RecipientTel: '收件人電話為',
    Address: '地址(必填)', // must
    RecipientAddress: '收件人地址為',
    Message: '留言' // not must
  },
  CustomerOrder: {
    Notice: '跟隨步驟完成訂單',
    CheckCartItem: '請確認產品明細',
    HaveCouponConfirm: '已套用優惠券',
    CartEmpty: '購物車尚未有商品唷!!',
    GuildToShop: '點擊賣場去看看吧',
    GoShop: '前往賣場',
    Promote: '輸入優惠碼可享九折優惠喔',
    ClickCopy: '點擊此處即可複製',
    AddCoupon: '套用優惠碼',
    FillForm: '請填完表單',
    NextStep: '※全部必填項目填寫完成後，既可點選下一步!',
    Summit: '送出訂單'
  },
  CustomerCheck: {
    PayStatus: '付款狀態',
    Notpaid: '尚未付款',
    paid: '付款完成',
    sir: '先生/女士',
    FinishText:
      '結帳流程完成了，非常感謝您購買我們店鋪的產品，如果有任何問題，歡迎您致電給我們。',
    ShopTel: '電話',
    ShopEmail: '信箱',
    LookingforWard: '期待您的再次光臨!',
    Notice: '提醒您!',
    NoticeContent: '本公司不會主動打電話給您要求操作ATM，如有問題請撥打165查詢',
    CantReturn: '因衛生關係，除食品本身問題外，恕難退貨退款，還請多多見諒。',
    ToHomepage: '返回首頁',
    ToPay: '確認付款去'
  },
  Footer: {
    ShopNameTop: '鼎鮮',
    ShopNameDonw: '飯麵',
    TIME: '營業時間:AM11:30-PM2:30，PM5:00-PM9:00',
    LastOrder: '最後點餐時間:結束前30分鐘，依現場為準。',
    MondayOff: '周一公休'
  },
  Product: {
    Peanut: {
      Title: '花生',
      Content:
        '配合特製醬油以及天然食材下去滷味濃香溢，非常適合和朋友小酌時的配菜冷凍出貨，退冰就可以馬上吃，喜歡吃熱也可以電鍋蒸~兩種口感都很好'
    },
    Kimchi: {
      Title: '泡菜',
      Content:
        '獨門配方製作的韓式泡菜，嚴選清脆可口的白菜，加上辣椒、蒜等秘密配方醃製，口口爽脆、韓式道地滋味。'
    },
    BraisedTripe: {
      Title: '滷牛肚',
      Content:
        '軟硬恰恰好，QQ口感軟硬適中，絕對是您下酒聊天的好夥伴，真空包裝，加熱方便即食包'
    },
    BraisedPorkEars: {
      Title: '滷豬耳',
      Content:
        '選用新鮮國產溫體豬肉,洗淨後川燙再長時間以獨門川味滷汁滷製,軟嫩豬皮中帶有脆口軟骨,口感一流!冰鎮熱食都好吃'
    },
    BraisedBeef: {
      Title: '滷牛肉',
      Content:
        '時熬煮，湯頭濃郁，軟嫩牛腱心肉，以數種中藥材，搭配洋蔥、蔥、蒜炒製，牛肉吸飽炒料的香味，燉後肉質軟嫩適中，腱心肉採用美國進口牛肉，含有高量膠質、帶筋且脂肪少、口感既Q彈又多汁，很適合長時間燉煮，加上蔥花或蔬菜，超級美味就可以上桌囉!!'
    },
    BraisedTendon: {
      Title: '滷牛筋',
      Content:
        '看似韌度強，實際上口感極佳，保留住滷汁精華，咬上一口彈牙的香Q口感，老人小孩都能嚐鮮。富含的膠質，更讓重養身的現代人趨之若驚！咀嚼後齒頰留香，越吃越順口。'
    },
    DriedFishChiliSauce: {
      Title: '魚干辣醬',
      Content:
        '嚴選四川頂級大紅袍花椒 & 清香逼人的四川青花椒與肉桂 丁香 八角 小魚干 草果等15種嚴選辛香料 磨碎後放入恆溫熱油 以人手緩緩攪拌 耐心等待辣味與香味緩緩釋放'
    },
    ChiliSauce: {
      Title: '辣椒醬',
      Content:
        '嚴選四川頂級大紅袍花椒 & 清香逼人的四川青花椒與肉桂 丁香 八角 小魚干 草果等15種嚴選辛香料 磨碎後放入恆溫熱油 以人手緩緩攪拌 耐心等待辣味與香味緩緩釋放'
    },
    WontonSoup: {
      Title: '餛飩湯',
      Content:
        '堅持真材實料的趙記菜肉餛飩，汁多味美。以完美的黃金比率調和成最佳的內餡，為顧及大眾的健康，我們的內餡青菜香翠、料多實在，吃起來不油膩。真正的符合台灣人的口味，咬在嘴裡豐富內餡與滑Q嫩皮合奏出完美的頻率。'
    },
    FrozenWonton: {
      Title: '冷凍餛飩',
      Content:
        '堅持真材實料的菜肉餛飩，汁多味美。以完美的黃金比率調和成最佳的內餡，為顧及大眾的健康，我們的內餡青菜香翠、料多實在，吃起來不油膩。真正的符合台灣人的口味，咬在嘴裡豐富內餡與滑Q嫩皮合奏出完美的頻率。'
    }
  },
  Category: {
    小菜: '小菜',
    滷味: '滷味',
    醬汁: '醬汁',
    餛飩: '餛飩'
  }
  // 待檢查
  // GENERAL: {
  //   NAV_OPTIONS: ['全部產品', '購物車', '後台管理'],
  //   LANG: '語言',
  //   CHECK: '去結帳',
  //   CART_EMPTY: '購物車尚未有商品唷!!',
  //   CART_ITEM: '品名',
  //   CART_QTY: '數量',
  //   CART_PRICE: '單價',
  //   TOTAL: '總計',
  //   NOW_PRICE: '折扣價',
  //   NAME: '鼎鮮飯麵',
  //   NAME_1: '鼎鮮',
  //   NAME_2: '飯麵',
  //   SLOGAN: '鼎中美食 鮮香味美',
  //   GOSHOP: '前往賣場',
  //   AD: {
  //     OPEN: '官方網站開幕'
  //   },
  //   AD_OPEN_P: '結帳輸入優惠碼',
  //   AD_OPEN_P2: '享 九折優待',
  //   AD_OPEN_CODE: 'order999',
  //   AD_OPEN_CLICKHERE: '點我取得優惠碼!',
  //   NEWS: '最新消息',
  //   NEWS_1: '新產品',
  //   NEWS_1_NAME: '冷凍餛飩',
  //   NEWS_1_P: '輕鬆料理，可以加進麵、火鍋，也可以蒸、煎或油炸',
  //   NEWS_1_P2: '更可以發會創意，做成自己喜歡的料理',
  //   NEWS_2: '推薦產品',
  //   NEWS_2_NAME: '滷豬耳',
  //   NEWS_2_P: '簡單加熱，配上滷汁或是喜歡的醬料即可食用',
  //   NEWS_2_P2: '消夜嘴饞又怕胖，滷豬耳熱量低，不加熱也可直接食用',
  //   ABOUT: '關於我們',
  //   ABOUT_P:
  //     '從路邊攤滷味起家，在沒有宣傳下憑著手藝及堅持，慢慢累積顧客，並且在與客戶的交流下，慢慢改良產品，經過多年的努力，在老客戶的累積下開出了店面，增加產品轉為中式創意料理店，中式番茄肉醬加上新鮮食材，健康美味；純手工餛飩以及獨家醬料，在其他地方吃不到的味道。每到過年，老客戶都會來下訂滷味作為年菜，買餛飩或醬料來送禮。如今要邁入二十個年頭，對於顧客的回饋，鼎鮮飯麵會繼續保持品質，並努力回應顧客的需求。',
  //   INFO: '店鋪資訊',
  //   ADRESS: '店鋪地址:新北市中和區安樂路x1號',
  //   ADRESS_INFO:
  //     '位於國立圖書館旁，靠近捷運永安市場站，步行約5分鐘或搭乘免費接駁車。',
  //   ADRESS_INFO2: '開車親臨，附近有圖書館停車場、國小停車場。',
  //   FOOD_NOTICE: '我們的堅持',
  //   FOOD_NOTICE_P: '不使用人工添加物',
  //   FOOD_NOTICE_P2: '每日採購新鮮食材製作',
  //   FOOD_NOTICE_P3: '食品來源:牛:澳洲 豬、雞:台灣',
  //   TIME: '營業時間:AM11:30-PM2:30，PM5:00-PM9:00',
  //   TIME_INFO: '最後點餐時間:結束前30分鐘，依現場為準。',
  //   REST: '周一公休',
  //   LIST_BANNER_P: '結帳輸入 ',
  //   LIST_BANNER_P2: ' 九折優惠',
  //   VIEWALL: '全部顯示',
  //   SORT: '價格排序',
  //   ADDTO: '放入購物車',
  // },
  // 小菜: '小菜',
  // 滷味: '滷味',
  // 醬汁: '醬汁',
  // 餛飩: '餛飩'
  // 紅油炒手: 'Dried chili Wonton',
  //* 餛飩湯: 'Wonton soup',
  //* 冷凍餛飩: 'Frozen wonton',
  // 滷肋排: 'Braised ribs',
  //* 滷豬耳: 'Braised pork ears',
  // 滷豬腳: 'Braised pork knuckle',
  // 紅油豬肝: 'chili liver',
  // 滷味拚盤: 'Braised platter',
  //* 泡菜: 'Kimchi',
  //* 滷牛肉: 'Braised beef',
  //* 滷牛筋: 'Braised tendon',
  // 炸醬: 'Jah Jan',
  //* 魚干辣醬: 'Dried Fish Chili Sauce',
  //* 辣椒醬: 'Chili sauce',
  // 花干: 'hua gan',
  // 滷雞腳: 'Braised Chicken Feet',
  //* 滷牛肚: 'Braised tripe',
  //* 花生: 'Braised Peanuts'
}
