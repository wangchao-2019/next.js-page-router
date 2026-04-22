// 1. 页面组件
import {useEffect, useState} from "react";

export default function Post({post}) {
    const [data, setData] = useState(null)

    // ✅ 客户端调用 API 完全正常
    useEffect(() => {
        fetch('/api/hello')
            .then(res => {
                console.log('res+++++++++++++');
                console.log(res);
                console.log(res);
                return res.json()
            })
            .then(d => setData(d))
    }, [])

    return <>
        <div>{post?.title}</div>
        <div>{data?.name}</div>
    </>;

}

// 2. 先定义：要预生成哪些路径
export async function getStaticPaths() {
    // 服务端获取所有文章ID
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() }, // 必须字符串
    }));

    // fallback: false → 不在paths里的路径 → 404
    // fallback: 'blocking' → 首次访问后台生成，用户无感（推荐）
    return { paths, fallback: 'blocking' };
}

// 3. 再定义：每个路径拿什么数据
export async function getStaticProps(context) {
    // 从getStaticPaths拿到当前params
    const { id } = context.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await res.json();

    return {
        props: { post }, // 传给页面组件
        revalidate: 60, // 60秒后可增量更新（ISR）
    };
}
