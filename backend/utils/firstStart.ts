import { SALT } from '../constants';
import Admin from '../models/Admin';
import bcrypt from "bcrypt"

export default async function firstStart () {
  try {
    const rootAdmin = await Admin.findOne({ login: 'admin' })
    if (!rootAdmin) {
      const password = process.env.DEFAULT_ADMIN_PASS || '123456'
      console.log(password);

      const hash = await bcrypt.hash(password, SALT)
      await Admin.create({
        login: "admin",
        username: "Администратор",
        hash,
        role: 'admin'
      })
      return console.log('✅ Админ создан');
    } else return
  } catch (error) {
    console.log(error);
    console.log('❌ Ошибка создания админа');
  }
}