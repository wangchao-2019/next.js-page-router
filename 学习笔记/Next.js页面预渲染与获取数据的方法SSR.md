## SSR 服务端渲染

next.js中getServerSideProps 方法可以针对每次请求作出处理，适用于数据变化比较频繁的页面。<br>
**getStaticProps 与 getServerSideProps 只能二选一。**
<br>
getServerSideProps 是 Next.js (Pages Router) 中用于实现 服务端渲染 (SSR) 的核心函数。<br>

**它的核心作用是：在用户每次请求页面时，在服务端动态获取数据并渲染页面，然后返回完整的 HTML。
与构建时预渲染的 getStaticProps 不同，它永远在请求时 (Request Time) 运行，确保数据始终是最新的。**

## 一、核心特性与运行机制
运行环境：仅在服务端 Node.js 环境执行，代码不会被打包到客户端（浏览器）Next.js。<br>
触发时机：<br>
直接访问：用户输入 URL 或刷新页面时，服务端执行 getServerSideProps → 获取数据 → 渲染 HTML → 返回给浏览器。<br>
客户端跳转：通过 <Link> 或 router.push 跳转时，Next.js 会发送 API 请求到服务端执行 getServerSideProps，获取 JSON 数据后在客户端渲染（Hydrate）。<br>
核心能力：<br>
可访问完整的 请求上下文 (context)，包括 req (请求对象)、res (响应对象)、cookies、query 参数等。<br>
适合获取高度动态、需鉴权、实时性强的数据。<br>

## 二、context 参数详解
context 是 getServerSideProps 的核心，包含所有请求信息：<br>
params：动态路由的参数（如 [id].ts → { id: '123' }）。<br>
req：HTTP 请求对象 (IncomingMessage)，包含 headers, cookies, query 等。常用于鉴权（读取 Session/Cookie）。<br>
res：HTTP 响应对象 (ServerResponse)，可用于设置响应头（如 Cache-Control）。<br>
query：URL 查询参数（如 ?id=123&ref=home）。<br>
resolvedUrl：标准化后的请求 URL。<br>
previewData：预览模式数据。<br>

## 三、返回值配置
函数必须返回一个对象，支持以下属性：<br>
props (必选其一)：传递给页面组件的数据，必须可序列化。<br>
notFound: true (可选)：返回 404 Not Found 页面。<br>
redirect (可选)：重定向到其他页面。<br>

## 四、优缺点
优点<br>
✅ 数据绝对实时：每次访问都是最新数据。<br>
✅ 安全：可直接访问数据库、私密 API，密钥不会暴露Next.js。<br>
✅ SEO 友好：返回完整 HTML，利于爬虫抓取。<br>
✅ 强大的请求级控制：能读取 req/res，处理鉴权、重定向。<br>
缺点<br>
⚠️ 性能较差：每次请求都要重新计算、获取数据、渲染，首屏速度慢于 SSG。<br>
⚠️ 服务器成本高：高并发下对服务器压力大，需要更强的服务器或 CDN 缓存策略。<br>

## 与 getStaticProps 核心区别
| 特性 | getStaticProps (SSG) | getServerSideProps (SSR) |
| :--- | :--- | :--- |
| 运行时机 | 构建时 / 构建时 (next build) | 每次请求时 |
| 数据时效性 | 静态（需 ISR 更新） | 实时 |
| 性能 | 极快（静态 HTML） | 较慢（服务端渲染） |
| 能否访问内部 API | 可以，但不推荐 | 可以 |
| 请求上下文 | 无 | 有 (req, res, cookies) |
| 适用场景 | 博客、文档、营销页 | 个人中心、实时数据、需鉴权页面 |
