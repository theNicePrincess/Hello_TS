//搞懂：type/interface 区别、联合类型、交叉类型


//跟着公众号先学习一下数组类型
//1、TS普通数组声明
// 全是string类型
let userNameList: string[] = ['张三', '李四', '王五'];
// 全是number类型
let userIdList: number[] = [1,2,3];
//全是boolean类型
let userStatusList: boolean[] = [true, false, true];


//2、联合类型数组：元素类型二选一（或多选一）
//元素类型可以是string或者number
let searchResult: (string | number)[] = ['张三', '李四', 1, 2];
//元素类型可以是string或者boolean
let mixedList: (string | boolean)[] = ['张三', '李四', true, false];
//元素类型可以是number或者boolean
let idStatusList: (number | boolean)[] = [1, 2, true, false];

//3、只读数组
let readyonlyNameList: readonly string [] = ['张三', '李四', '王五'];
// readonlyNameList.push('赵六'); // 错误：无法在只读数组上使用 push 方法
// readonlyNameList[0] = '赵六'; // 错误：无法修改只读数组的元素

// 只读数组里如果是对象呢
interface User {
  id: number;
  name: string;
}
let readonlyUserList: readonly User[] = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
];
// readonlyUserList.push({ id: 4, name: '赵六' }); // 错误：无法在只读数组上使用 push 方法
// readonlyUserList[0] = { id: 4, name: '赵六' }; // 错误：无法修改只读数组的元素
// 但是可以修改只读数组中对象的属性
readonlyUserList[0].name = '赵六'; // 允许：可以修改只读数组中对象的属性

//4、元组类型：元素类型和数量都固定，元组尽量“不越界”，固定长度和类型才是元组的核心价值
//元组类型：第一个元素是string，第二个元素是number
let userInfo: [string, number] = ['张三', 30];
let userInfo2: [string, number, string] = ['李四', 25, '男'];
//元组解构
let [name1, age1] = userInfo; // name: string, age: number
console.log(name1, age1); // 输出：张三 30

//重点：联合类型与交叉类型：组合类型的“两大神器”
//联合类型用 | 连接，表示类型二选一（或多选一），交叉类型用 & 连接，表示类型必须同时满足多个条件
// 类型别名配合联合类型
type Status  = 'success' | 'error' | 'loading';
type Id = string | number;

let btnStatus: Status = 'success';
btnStatus = 'error'; // 允许
btnStatus = 'loading'; // 允许
// btnStatus = 'other'; // 错误：不能将 'other' 赋值给类型 'Status'
let userId: Id = 123;
userId = 'abc'; // 允许
// userId = true; // 错误：不能将 boolean 赋值给类型 'Id'

//交叉类型：全要，属性合并！
//定义两个基础类型
type UserBase = {
  id: number;
  name: string;
}
type UserDetail = {
  age: number;
  gender?: string; // 可选属性
}

//交叉类型：合并UserBase和UserDetail的属性，得到一个新的类型UserInfo
type UserInfo = UserBase & UserDetail;

// 使用交叉类型（必须拥有所有属性）
let user: UserInfo = {
  id: 1,
  name: '张三',
  age: 30,
  gender: '男' // 可选属性，可以不写
}

// 场景：NodeJS接口返回值（合并基础信息和扩展信息）
type ResponseBase = {
  code: number;
  message: string;
}

type UserData = {
  user: UserInfo
}
//交叉类型：接口返回值 = 基础响应 + 用户数据
type UserResponse = ResponseBase & UserData;

let response : UserResponse = {
  code: 200,
  message: '成功',
  user: {
    id: 1,
    name: '张三',
    age: 30,
    gender: '男'
  }
}