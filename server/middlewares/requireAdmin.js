import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Middleware для защиты админ-маршрутов
export const requireAdmin = (req, res, next) => {
  const token = req.cookies?.admin_token;
  if (!token) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Ошибка валидации токена:', error.message);
    return res.status(403).json({ message: 'Недействительный токен' });
  }
};
