// 分页请求参数类型
export type PageParamsType = {
	pageNum: number;
	pageSize: number;
};

// 分页返回结构类型（泛型 T 表示列表项类型）
export type PageResultType<T> = {
	pageNum: number;
	pageSize: number;
	total: number;
	list: T[];
};
