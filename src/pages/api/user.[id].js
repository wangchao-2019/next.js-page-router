// pages/api/users/[id].js
export default function handler(req, res) {
    const { id } = req.query // /api/users/123 → id='123'
    res.status(200).json({ id, name: 'User ' + id })
}