declare module 'smalltalk' {
  export function prompt(
    title: string,
    message: string,
    defaultValue: string
  ): Promise<string | null>;
  export function alert(title: string, message: string): Promise<void>;
  export function confirm(title: string, message: string): Promise<boolean>;
}

// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}
