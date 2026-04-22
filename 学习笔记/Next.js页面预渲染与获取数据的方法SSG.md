

# SSG
 SSG 是静态站点生成，就是在文件打包阶段，预先生成页面<br>
 Next.js 默认会预渲染所有没有动态数据的页面，而动态的数据还是像 React 一样在客户端渲染的。<br>
如果要在 HTML 源码中展现动态数据，可以使用 page 下 getStaticProps 方法。这个方法是跑在服务端环境下的，可以在服务端获取数据并渲染，并且客户端不会收到方法内任何的代码

## getStaticProps
```
// 此函数会在构建阶段于服务器端被调用。
// 该方法不会在客户端调用，因此你甚至可以直接执行数据库查询
export async function getStaticProps(context) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const posts = await new Promise(resolve => {
        setTimeout(resolve('i am post'), 5000);
    })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    const temp = {}
    for (const contextKey in context) {
        console.log('context[contextKey]context[contextKey]');
        console.log(contextKey);
        console.log(context[contextKey]);
        temp[contextKey] = context[contextKey]
    }
    return {
        // 必选：传给页面的数据（可序列化）
        props: { posts: [] },
        // 可选：增量静态再生（秒）→ 生产生效
        revalidate: 60,
        // 可选：找不到数据 → 404
        // notFound: true,
        // 可选：重定向（如旧URL跳新URL）
        // redirect: { destination: '/', permanent: false },
    };
}
```
该方法返回的参数会通过prop的形式转递给组件接受，此外如果需要在 getStaticProps 中访问路径参数，可以在方法的 context 参数的 params 属性获取。

## getStaticPaths
这个方法用在动态路由，就是本项目中/pages/posts/[id].js<br>
getStaticPaths 是 Next.js Pages Router 动态路由 + SSG 静态生成必须写的服务端函数，作用只有一个
**告诉 Next.js：构建时要预生成哪些动态页面的路径**<br>
**它必须和 getStaticProps 一起用，缺一不可。**<br>
getStaticPaths：决定生成哪些路径，getStaticProps：决定每个路径拿什么数据<br>
**只要你的页面满足 2 个条件，就必须导出 getStaticPaths：**<br>
1，页面是动态路由：文件名带 []，如 pages/posts/[id].js<br>
2，页面用了 getStaticProps（SSG 静态生成）

```
// 必须是 async 函数
export async function getStaticPaths() {
  return {
    // 要预生成的路径列表
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
    ],
    // 关键配置：未预生成路径如何处理
    fallback: false,
  };
}
```
paths：要预生成哪些路径
是一个数组，每一项代表一个要预渲染的页面
每一项必须是 { params: { 动态字段名: 值 } }
params 的 key 必须和路由文件名一致：[id] → params: { id }