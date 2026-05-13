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
// readonlyUserList[0].name = '赵六'; // 允许：可以修改只读数组中对象的属性

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

function count(a: number, b: number): number{
  return a + b;
}
console.log(count(1, 2));

//any类型
let anyValue: any;  // any类型：允许赋值任何类型的值，关闭类型检查
anyValue = 123; // 允许
anyValue = true; // 允许
anyValue = 'Hello'; // 允许

let x:boolean = anyValue; // any 可以赋值给任意类型
console.log(x, typeof x); // 输出：Hello

let obj: {name: string, age?: number} = {name: '张三'}; // age是可选属性，可以不写


//enum枚举，数字枚举是一组命名的数字常量，默认从0开始递增并且反向映射
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log(Direction)
function move(data: Direction) {
  if (data === Direction.Up){
    console.log('向上移动');
  } else if (data === Direction.Down){
    console.log('向下移动');
  } else if (data === Direction.Left){
    console.log('向左移动');
  } else if (data === Direction.Right){
    console.log('向右移动');
  } else {
    console.log('未知方向');
  } 
}

move(Direction.Up); // 输出：向上移动

// 一种特殊的情况
type LocalFu = () => void; // 定义一个函数类型，表示一个没有参数且没有返回值的函数
let localFu: LocalFu = () => {
  return 666
}
console.log(localFu()); // 输出：666

// 如果在定义函数的时候顺手定义类型就不会出现特殊情况
// let nomalFu = ():void => {
//   return 666
// }

//复习类相关的知识
class Person {
  name: string;
  age: number;
  constructor(name: string, age:number){
    this.name = name;
    this.age = age;
  }
  speak(){
    console.log(`我叫${this.name}，今年${this.age}岁了！`);
  }
}

let person = new Person('张三', 30);
person.speak(); // 输出：我叫张三，今年30岁了！

//类的继承
class Student extends Person {
  grade: number;
  constructor(name: string, age: number, grade: number){
    super(name, age); // 调用父类的构造函数
    this.grade = grade;
  }
  override speak(): void {
    console.log(`我叫${this.name}，今年${this.age}岁了！我在读${this.grade}年级！`);
  }
  study(){
    console.log(`我在学习，成绩是${this.grade}分！`);
  }
}

let student = new Student('李四', 20, 90);
student.speak();
student.study();

// 简写方式
class Teacher{
  constructor(public name: string, public age: number, public subject: string){} // 父类简写方式
  teach(){
    console.log(`我叫${this.name}，今年${this.age}岁了！我教${this.subject}！`);
  }
}

class MathTeacher extends Teacher {
  constructor(name: string, age: number){
    super(name, age, '数学'); // 固定科目为数学，子类简写方式
  }
  override teach(): void {
    console.log(`我叫${this.name}，今年${this.age}岁了！我教数学！`);
  }
}

let math = new MathTeacher('王五', 40);
console.log(math.subject)

// 抽象类
abstract class Package{
  // 构造方法
  constructor(public weight: number){}
  // 抽象方法：抽象类：抽象类是不能直接实例化的类，它通常用作其他类的基类。
  // 抽象方法：抽象方法是没有方法体的声明，必须由[非抽象子类]实现。
  abstract calculate(): number;
  // 具体方法
  printPackage(){
    console.log(`包裹重量是${this.weight}kg, 费用是${this.calculate()}元！`);
  }
}
class StandardPackage extends Package {
  constructor(weight: number, public pricePerKg: number){
    super(weight);
  }
  calculate(): number {
    return this.weight * this.pricePerKg;
  }
}

let s1 = new StandardPackage(10, 5); // 错误：无法创建抽象类的实例
s1.printPackage(); // 输出：包裹重量是10kg, 费用是50元！

class ExpressPackage extends Package {
  constructor(weight: number, public pricePerKg: number, public expressFee: number){
    super(weight);
  }
  calculate(): number {
    if (this.weight > 5){
      return 5 * this.pricePerKg + (this.weight  - 5)*this.expressFee;
    } else {
      return this.weight * this.pricePerKg;
    }
  }
}
let e1 = new ExpressPackage(13, 10, 15);
e1.printPackage(); 

// 接口 interface，是一种定义结构的方式，主要用来定义对象的类型，接口也可以被类实现（implements）来约束类的结构
// interface只能定义格式，不能包含任何实现
interface PersonInterface {
  name: string;
  age: number;
  speak(n: number):void;
}

class PersonInt implements PersonInterface {
  constructor(public name: string, public age: number){}
  speak(n: number): void {
    console.log(`我叫${this.name}，今年${this.age}岁了！我说了${n}句话！`);
  }
}

let personInt = new PersonInt('赵六', 35);
personInt.speak(5); // 输出：我叫赵六，今年35岁了！我说了5句话！

// type和interface都可以定义对象类型
type NewPersonType = {
  name: string;
  age: number;
  gender?: string;
}

let npt1: NewPersonType = {
  name: '钱七',
  age: 28
}

interface NewPersonInterface {
  name: string;
  age: number;
  gender?: string;
}
let npi1: NewPersonInterface = {
  name: '孙八',
  age: 32,
  gender: '男'
}

/**
 * interface和抽象类的区别
 * 相同点：都用于定义一个类的格式，都可以包含抽象方法（接口中的方法默认是抽象的），都可以被类实现（implements）来约束类的结构
 * 不同点：
 * 1、interface：只能描述结构，不能有任何实现代码，一个类可以实现多个接口；
 * 2、抽象类：既可以包含抽象方法，也可以包含具体方法，抽象类可以有构造函数，一个类只能继承一个抽象类。
*/

// 泛型：泛型是一种在定义函数、接口或类时使用的类型参数，可以在使用时指定具体的类型，提供更强的类型安全和代码复用性
// 定义一个泛型函数，T是类型参数，可以在调用时指定具体的类型
function logData<T>(data: T){
  console.log(data)
}
logData<string>('hello');
logData<number>(123);

// 可以用多个泛型
function logMultipleData<T, U>(data1: T, data2: U): T | U{
  return Math.random() > 0.5 ? data1 : data2; // 随机返回data1或data2
}
console.log(logMultipleData<string, number>('hello', 123))
console.log(logMultipleData<boolean, string>(true, 'world'))

// 泛型接口
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 使用泛型接口时指定具体的类型
interface User{
  id: number;
  name: string;
}
let response1: ApiResponse<User> = {
  code: 200,
  message: '成功',
  data: {
    id: 1,
    name: '张三'
  }
}

// 泛型类
class Box<T>{
  constructor(public name: string, public age: number, public content: T){};
  public getContent(){
    console.log(`盒子名字${this.name}，年龄${this.age}，内容${this.content}`);
  }
}

let box1 = new Box<string>('礼物盒', 1, '玩具');
box1.getContent(); // 输出：盒子名字礼物盒，年龄1，内容玩具

// 泛型约束：限制泛型参数必须满足某些条件
interface Lengthwise {
  length: number;
}
function logLength<T extends Lengthwise>(data: T): T{
  console.log(`长度是${data.length}`);
  return data;
}
logLength('hello'); // 输出：长度是5
logLength([1, 2, 3]); // 输出：长度是3
// logLength(123); // 错误：类型 'number' 不满足约束 'Lengthwise'，因为 number 类型没有 length 属性

// interface+泛型约束 vs 普通type/interface
interface Person3 {
  name: string;
}

// T 必须满足 Person 结构
function showName<T extends Person3>(p: T) {
  return p;
}
type Person2 = {
  name: string
}
function showName2(p: Person2) {
  return p;
}

const userTest = { name: "abc", age: 18 }

const a = showName(userTest)    // a 的类型：{ name: string; age: number }
const b = showName2(userTest)   // b 的类型：Person （看不到 age）
// a.age; // 允许访问 age 属性
// b.age; // 错误：属性 'age' 在类型 'Person' 上不存在