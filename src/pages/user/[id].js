// pages/user/[id].js （动态路由示例 ）

// 页面组件
function UserPage({ userData }) {
    return (
        <div>
            <h1>用户信息: {userData.name}</h1>
            <p>ID: {userData.id}</p>
            <p>邮箱: {userData.email}</p>
            <p>电话: {userData.phone}</p>
        </div>
    );
}

// 服务端数据获取函数
export async function getServerSideProps(context) {
    // 1. 从上下文中获取参数
    const { params, req, res } = context;
    const userId = params?.id; // 动态路由参数

    try {
        // 2. 服务端请求数据
        const apiRes = await fetch(`https://your-api.com/users/${userId}`, {
            headers: {
                Cookie: req.headers.cookie || '',
                Authorization: `Bearer SERVER_API_TOKEN}`,
            },
        });

        if (!apiRes.ok) {
            // 数据不存在 → 404
            return { notFound: true };
        }

        const userData = await apiRes.json();

        // 3. 返回 props
        return {
            props: {
                userData,
            },
        };
    } catch (error) {
        // 出错 → 重定向到首页
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}

export default UserPage;