// 用type定义商品信息对象类型
type Goods = {
  readonly id: string | number;
  name: string;
  price: number;  
  stock: number;
  status: 'onsale' | 'offsale' | 'soldout'; // 联合类型：商品状态只能是这三个值之一
  tags?: string[]; // 可选属性：商品标签，可以是字符串数组，也可以不写
  details: { // 嵌套对象类型：商品详情
    description: string;
    images: string[];
  };
}

// 定义单个商品
let goods1: Goods = {
  id: '123456',
  name: 'iPhone 13',
  price: 7999,
  stock: 100,
  status: 'onsale',
  tags: ['手机', '电子产品'],
  details: {
    description: '苹果公司最新款智能手机',
    images: ['https://example.com/iphone13-front.jpg', 'https://example.com/iphone13-back.jpg']
  }
}

// 定义商品数组
let goodsList: Goods[] = [
  goods1,
  {
    id: 789012,
    name: 'MacBook Pro',
    price: 14999,
    stock: 50,
    status: 'offsale',
    details: {
      description: '苹果公司高性能笔记本电脑',
      images: ['https://example.com/macbookpro-front.jpg', 'https://example.com/macbookpro-back.jpg']
    }
  }
]