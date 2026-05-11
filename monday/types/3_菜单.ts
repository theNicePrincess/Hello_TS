// 菜单项类型：支持多级菜单递归
export type MenuItemType = {
	id: number;
	name: string;
	path: string;
	icon?: string;
	hidden?: boolean;
	children?: MenuItemType[];
}

// 菜单列表类型别名
export type MenuListType = MenuItemType[];
