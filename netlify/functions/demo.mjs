// GET /demo → 302 到环境变量 DEMO_URL 指向的智能询价系统演示链接。
// 改链接：Netlify 后台 → Site configuration → Environment variables → 改 DEMO_URL
// （scope 勾选 Functions），函数按请求实时读取，无需改代码。
export default async (req, context) => {
  // context.env 在部分函数运行时不注入，统一回退到 process.env（Netlify 按 Functions scope 注入）
  let target = '';
  try {
    const env = (context && context.env) || process.env || {};
    target = env.DEMO_URL || (process.env && process.env.DEMO_URL) || '';
  } catch {
    target = '';
  }
  if (!target || !/^https?:\/\//i.test(target)) {
    return new Response(
      '演示链接未配置：请在 Netlify 后台 → Site configuration → Environment variables 设置 DEMO_URL（完整含 token 的链接，scope 勾选 Functions）',
      {
        status: 500,
        headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
      },
    );
  }
  return new Response(null, {
    status: 302,
    headers: { Location: target, 'cache-control': 'no-store' },
  });
};
