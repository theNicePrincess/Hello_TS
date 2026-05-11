import type { UserInfoType } from './1_用户信息类型';

// 用type定义接口请求参数类型
type LoginParams = {
  username: string;
  password: string;
  rememberMe?: boolean; // 可选参数：是否记住登录状态
}

// 定义接口返回值类型
type ResponseBase = {
  code: number;
  message: string;
}

type LoginData = {
  token: string;
  user: UserInfoType; // 引用之前定义的用户信息类型
}

type LoginResponse = ResponseBase & LoginData; // 交叉类型：接口返回值 = 基础响应 + 登录数据

// 模拟Nodejs接口请求函数
function login(params: LoginParams): Promise<LoginResponse> {
  // 模拟请求成功返回
  return Promise.resolve({
    code: 200,
    message: '登录成功',
    token: 'mock-token',
    user: {
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
  });
}

// 调用接口函数
const params: LoginParams = {
  username: 'zhangsan',
  password: '123456',
  rememberMe: true
};

login(params).then(response => {
  console.log(response.code); // 输出：200
  console.log(response.message);  // 输出：登录成功
  console.log(response.token); // 输出：mock-token
  console.log(response.user.name); // 输出：张三
}).catch(error => {
  console.error('登录失败', error);
});