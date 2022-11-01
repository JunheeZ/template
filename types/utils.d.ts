import type { ComputedRef, Ref } from "vue";

// 返回的类型是T类型的扩展
// key还是T类型中的Key
// 值是T类型下key对应的值，或者该值的响应式代理、计算属性响应式代理
export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};