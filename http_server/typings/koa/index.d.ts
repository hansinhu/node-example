import Koa from "koa";

declare module 'koa' {
  // FIX: @types/koa-views
  interface BaseContext {
      render(viewPath: string, locals?: any): Promise<void>;
  }

  type Next = () => void
}
