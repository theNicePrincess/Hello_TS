/**
 * 周二
  - 学习：泛型基础、泛型约束、泛型工具类型Partial/Pick/Omit/Record
  - 实战：用泛型封装通用分页结构、通用接口返回结构
*/
// 什么是泛型？
// 泛型（Generics）是
// 一种在编程中使用的工具，允许我们在定义函数、接口或类时，不预先指定具体的类型，而是在使用时再指定。这使得代码更加灵活和可重用。

// 泛型函数
function logData<T>(data: T):void{
  console.log(data)
}
// 因为事先不知道data是什么类型，所以用T来表示这个类型参数，在调用时再指定具体的类型
logData<string>('hello');
logData<number>(123);

// 泛型接口
interface ApiResponse<T>{
  code: number;
  message: string;
  data: T
}

interface UserData{
  id: number;
  name: string;
}

let response1: ApiResponse<UserData> = {
  code: 200,
  message: '成功',
  data: {
    id: 1,
    name: 'Alice'
  }
};

// 泛型类
class ApiService<T>{
  fetchData(): Promise<ApiResponse<T>> {
    // 模拟接口请求，返回一个Promise，泛型T表示接口返回数据的类型
    return Promise.resolve({
      code: 200,
      message: '成功',
      data: {} as T // 这里用类型断言模拟返回数据
    });
  }
}

// 使用泛型类时指定具体的类型
interface Product{
  id: number;
  name: string;
  price: number;
}
let productService = new ApiService<Product>();
productService.fetchData().then(response => {
  console.log(response.data.name); // 这里可以正确推断出data的类型是Product
});

// 泛型约束, 1、约束必须有某个属性。有时候我们希望泛型参数必须满足某些条件，比如必须有length属性，这时就可以使用泛型约束
interface Lengthwise {
  length: number;
}
function logLength<T extends Lengthwise>(data: T):void{
  // 这里我们想要访问data的length属性，但T可能是任何类型，所以需要约束T必须有length属性
  console.log(`长度是${data.length}`);
}
logLength("hello"); // 输出：长度是5
logLength([1, 2, 3]); // 输出：长度是3
// logLength(123); // 错误：number类型没有length属性 

// 泛型约束，2、约束必须是某些类型之一。有时候我们希望泛型参数只能是某些特定的类型，这时也可以使用泛型约束
function logValue<T extends string | number>(value: T):void{
  console.log(`值是${value}`);
}
logValue("hello"); // 输出：值是hello
logValue(123); // 输出：值是123
// logValue(true); // 错误：boolean类型不满足约束

// 3、键名约束 T extends keyof U。有时候我们希望泛型参数必须是另一个类型的键名，这时可以使用这种约束
function getProperty<T, U extends keyof T>(obj: T, key: U): T[U]{
  return obj[key];
}
const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name");
console.log(name); // 输出：Alice
// const invalid = getProperty(person, "invalidKey"); // 错误：'invalidKey' 不是 'person' 的键

// 泛型工具类型：TypeScript内置了一些非常有用的泛型工具类型，帮助我们快速构造新的类型
// 1、Partial<T>：将类型T的所有属性变为可选
interface User {
  id: number;
  name: string;
  age: number;
  role: "admin" | "user";
}
type UpdateUserDto = Partial<User>; // UpdateUserDto的所有属性都是可选的
function updateUser(userId: number, patch: UpdateUserDto): void {
  console.log("更新用户", userId, patch);
}
updateUser(1, { name: "新名字" });
// updateUser(2, { age: 20, email: "newemail@example.com" }); // 这里email不是User的属性，但因为UpdateUserDto是Partial<User>，所以所有属性都是可选的

// 2、Pick<T, K>：从类型T中选择一组属性K来构造一个新类型
type UserCard = Pick<User, "id" | "name">;
const userCard: UserCard = {
  id: 100,
  name: "张三"
};

// 3、Omit<T, K>：从类型T中排除一组属性K来构造一个新类型
type CreateUserDto = Omit<User, "id">;
function createUser(data: CreateUserDto): void {
  console.log("创建用户", data);
}

createUser({
  name: "李四",
  age: 18,
  role: "user"
  // id: 123 // 错误：CreateUserDto类型不允许有id属性
});

// 4、Record<K, T>：构造一个对象类型，其属性键为K，属性值为T
type RoleTextMap = Record<User["role"], string>;
const roleTextMap: RoleTextMap = {
  admin: "管理员",
  user: "普通用户"
};

// 实战：用泛型封装通用分页结构、通用接口返回结构
// 定义一个通用的分页结果类型，T表示列表项的类型
type PageResult<T> = {
  pageNum: number;
  pageSize: number;
  total: number;
  list: T[];
}
// 定义一个通用的接口返回类型，T表示data字段的类型
type Result<T> = {
  code: number;
  message: string;
  data: T;
}

// 使用泛型封装接口返回结构
interface UserInfo {
  id: number;
  name: string;
  age: number;
}

function fetchUserInfo(): Promise<Result<UserInfo>>{
  // 模拟接口请求，返回一个Promise，泛型UserInfo表示data字段的类型
  return Promise.resolve({
    code: 200,
    message: "成功",
    data: {
      id: 1,
      name: "张三",
      age: 30
    }
  })
}

fetchUserInfo().then(response => {
  console.log(response.data); 
}).catch(error => {
  console.error("请求失败", error);
});


