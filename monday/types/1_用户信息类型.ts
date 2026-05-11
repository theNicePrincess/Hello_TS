export type UserInfoType = {
  readonly id: number;
  name: string;
  age: number;
  gender?: string; // 可选属性
  email: string;
  phone?: string;
  address: { // 嵌套对象类型
    province: string,
    city: string,
  };
  role: 'admin' | 'user' | 'guest';
}

// 定义单个用户
let user1: UserInfoType = {
  id: 1,
  name: '张三',
  age: 30,
  gender: '男',
  email: '1277449203@qq.com',
  address: {
    province: '北京市',
    city: '北京市'
  },
  role: 'admin'
}

// 定义用户数组
let users: UserInfoType[] = [
  user1
]
  