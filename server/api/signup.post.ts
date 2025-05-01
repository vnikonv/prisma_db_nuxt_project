import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Проверяем обязательные поля
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  // Хешируем пароль
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(body.password, salt)

  // Проверяем, существует ли пользователь
  const existingUser = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already in use'
    })
  }

  // Создаем нового пользователя (без имени)
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      emailVerified: new Date(), // Для простоты сразу верифицируем
      // Имя будет null по умолчанию, как указано в вашей схеме
    }
  })

  // Создаем связанную запись Account
  await prisma.account.create({
    data: {
      userId: newUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: newUser.id,
      subscribed: false
    }
  })

  return {
    id: newUser.id,
    email: newUser.email
    // name не возвращаем, так как его нет в форме
  }
})