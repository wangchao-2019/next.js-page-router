// pages/api/[...slug].js
export default function handler(req, res) {
    const { slug } = req.query // /api/a/b/c → slug=['a','b','c']
    res.status(200).json({ slug })
}