// GET /demo → 302 到环境变量 DEMO_URL 指向的智能询价系统演示链接。
// 改链接：Netlify 后台 → Site configuration → Environment variables → 改 DEMO_URL
// （scope 勾选 Functions），函数按请求实时读取，无需改代码。
export default async (req, context) => {
  const target = context.env.DEMO_URL;
  if (!target) {
    return new Response('演示链接未配置：请在 Netlify 后台设置环境变量 DEMO_URL（scope: Functions）', {
      status: 500,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  return Response.redirect(target, 302);
};
