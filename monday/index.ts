/**
  - 学习：TS基础加固、接口type/interface区别、联合类型、交叉类型
  - 实战：定义5组业务常用复杂类型（用户、角色、菜单、接口返回、分页）
  - 复盘：整理业务类型规范笔记
*/
// 1、联合类型数组
let searchResult: (string | number)[] = ['张三', 12, '李四', 23]; // searchResult是一个联合类型的数组，元素可以是string或者number
searchResult.push('王五'); // 允许：可以添加string类型的元素
searchResult.push(34); // 允许：可以添加number类型的元素
// searchResult.push(true);// 错误，不能添加boolean类型的元素

// 2、元组：元素类型和数量都固定
let userInfo: [string, number, boolean] = ['张三', 32, false]; // 声明时严格匹配长度和类型

/**
 * 1、元组本质上是数组类型的特化，仍然继承了数组方法。
 * 2、对可变元组（不是 readonly）来说，push 在类型层面通常是允许的。
 * 3、但 TS 只“保证前几个已声明位置”的类型，比如 [string, number] 的 0 和 1 位。
 * 4、你 push 进去的额外元素，运行时确实存在；只是 TS 对这些“超出声明长度的位置”不会按元组位置信息精确建模。
 */
userInfo.push('12345678899'); // 允许：可以添加string类型的元素
userInfo.push(123); // 错误：不能添加number类型的元素
userInfo.push('323232'); // 错误：不能添加boolean类型的元素
console.log(userInfo);

/**
 * 想要“真固定”有两种常见写法：

    使用 readonly 元组
    let t: readonly [string, number] = ['a', 1]
    这样 push 会直接报错。

    使用 const 断言（常量场景）
    const t = ['a', 1] as const
    得到只读且字面量更精确的元组，也不能 push。
*/

const t = [1, '2', true] as const; // t是一个只读的元组，元素类型分别是number、string和boolean，使用as const断言使其成为只读类型
// t.push(3); // 错误：无法在只读数组上使用 push 方法
// t[0] = 4; // 错误：无法修改只读数组的元素

//3、对象类型, 可选属性，只读属性
let user: {
  id: number, 
  name: string, 
  address?: string,
  readonly email: string
} = {
  id: 1, 
  name: '张三', 
  address: '北京市',
  email: '1277449203@qq.com'
}; // 声明一个对象类型，包含id、name和可选的address属性 以及只读的email属性

// 属性索引签名：处理未知属性
let dynamicForm: {[key: string]: string} = {
  username: '张三',
  password: '123456',
  address: '北京市'
}

// 属性不确定，可以是string或者number
let dynamicParams: {[key: string]: string | number} = {
  name: '张三',
  age: 30,
  city: '北京市'
}

dynamicParams.sex = '男'; // 允许：可以添加string类型的属性值


// 4、类型别名（type）: 给类型起个名字，简化复杂类型的使用

// 给类型对象起别名, 首字母大写是惯例
type User = {
  id: number;
  name: string;
  age: number;
  gender?: string; // 可选属性
  readonly email: string; // 只读属性
}

let user1: User = {
  id: 1,
  name: '张三',
  age: 30,
  email: '1277449203@qq.com'
}
let user2: User = {
  id: 2,
  name: '李四',
  age: 25,
  gender: '男',
  email: '1539985625@qq.com'
}

// 数组起别名
type UserList = User[]; // UserList是一个User类型的数组
let userList: UserList = [user1, user2]
console.log(userList);


//联合类型, 二选一或者多选一
type BtnStatus = 'success' | 'error' | 'loading';
type Id = string | number;

let btnStatus: BtnStatus = 'success';
btnStatus = 'error'; // 允许
btnStatus = 'loading'; // 允许
// btnStatus = 'other'; // 错误：不能将 'other' 赋值给类型 'BtnStatus'

let userId: Id = 123;
userId = 'abcdk'; // 允许
// userId = true; // 错误：不能将 boolean 赋值给类型 'Id'

// 交叉类型：全要，属性合并！如果两个类型有重复属性，必须类型兼容，否则会报错
//定义两个基础类型
type UserBase = {
  id: number;
  name: string;
  age: number; // 重复属性类型得相同，不然会报错
}

type UserDetail = {
  age: number;
  gender?: string; // 可选属性
}

type NewUserInfo = UserBase & UserDetail; // 交叉类型：合并UserBase和UserDetail的属性，得到一个新的类型NewUserInfo

// 使用交叉类型（必须拥有所有属性）
let newUser: NewUserInfo = {
  id: 1,
  name: '张三',
  age: 30,
  gender: '男' // 可选属性，可以不写
}

/**
 * type和interface的区别：
 * type更灵活，可以定义联合类型、交叉类型、基本类型别名等；
 * interface更适合定义对象类型和类的结构，支持声明合并。
 * 选择哪个主要看个人习惯和具体场景需求。
 * */ 

