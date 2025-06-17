import bcrypt from 'bcrypt';

const plainPassword = 'Ssstasklimmm5112'; // ← твой пароль
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Ошибка хеширования:', err);
  } else {
    console.log('Хеш пароля:', hash);
  }
});
