// posts 将在构建阶段由 getStaticProps () 自动填充
function Blog({posts, context}) {
    return (
        <ul>
            {posts}
            {/*   {Object.keys(context).map((key) => (
                <li key={key}>
                    {key}: {context[key]}
                </li>
            ))}*/}

        </ul>
    )
}

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

export default Blog