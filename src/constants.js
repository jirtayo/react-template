// 这是个文本元素
export const ELEMENT_TEXT = Symbol.for("ELEMENT_TEXT");

// 根节点
export const TAG_ROOT = Symbol.for("TAG_ROOT");
// 原生节点 div span p …
export const TAG_HOST = Symbol.for("TAG_HOST");
// 文本节点
export const TAG_TEXT = Symbol.for("TAG_TEXT");

// effect 插入节点
export const PLACEMENT = Symbol.for("PLACEMENT");
// effect 更新节点
export const UPDATE = Symbol.for("UPDATE");
// effect 删除节点
export const DELETION = Symbol.for("DELETION");
