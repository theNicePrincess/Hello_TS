// Tuesday - Utility Types 练习
// 目标：掌握 Partial / Pick / Omit / Record 的常见用法

// 基础类型
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  role: "admin" | "user";
}

// =========================
// 练习 1：Partial<T>
// =========================
// 要求：定义 UpdateUserDto，使其可用于“部分更新用户信息”（所有字段可选）
// 提示：UpdateUserDto 应该基于 User
// TODO: 把 any 替换为正确写法

type UpdateUserDto = Partial<User>;

function updateUser(userId: number, patch: UpdateUserDto): void {
  console.log("更新用户", userId, patch);
}

// TODO: 让下面两次调用都通过类型检查
updateUser(1, { name: "新名字" });
updateUser(2, { age: 20, email: "test@example.com" });

// =========================
// 练习 2：Pick<T, K>
// =========================
// 要求：定义 UserCard，只保留 id、name、role 三个字段
// TODO: 把 any 替换为正确写法

type UserCard = Pick<User, "id" | "name" | "role">;

const userCard: UserCard = {
  id: 100,
  name: "张三",
  role: "user"
};

console.log("用户卡片", userCard);

// =========================
// 练习 3：Omit<T, K>
// =========================
// 要求：定义 CreateUserDto，模拟“创建用户”入参，不允许传 id
// TODO: 把 any 替换为正确写法

type CreateUserDto = Omit<User, "id">;

function createUser(data: CreateUserDto): void {
  console.log("创建用户", data);
}

createUser({
  name: "李四",
  age: 18,
  email: "lisi@example.com",
  role: "admin"
});

// =========================
// 练习 4：Record<K, V>
// =========================
// 要求：用 Record 定义一个角色中文名映射表 RoleTextMap
// 键：User["role"]
// 值：string
// TODO: 把 any 替换为正确写法

type RoleTextMap = Record<User["role"], string>;

const roleTextMap: RoleTextMap = {
  admin: "管理员",
  user: "普通用户"
};

console.log("角色映射", roleTextMap);

// =========================
// 加餐练习（可选）
// =========================
// 定义 SafeUser：从 User 中去掉 email，再把剩余字段全部变成只读
// 提示：组合 Omit + Readonly
// TODO: 把 any 替换为正确写法

type SafeUser = Readonly<Omit<User, "email">>;

const safeUser: SafeUser = {
  id: 1,
  name: "王五",
  age: 30,
  role: "user"
};

console.log("安全用户", safeUser);
