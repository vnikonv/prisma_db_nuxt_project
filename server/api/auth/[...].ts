import {NuxtAuthHandler} from '#auth'
import GithubProvider from 'next-auth/providers/github'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const runtimeConfig = useRuntimeConfig()
console.log('GitHub Client ID:', runtimeConfig.public.GITHUB_CLIENT_ID)
console.log('GitHub Redirect URI:', runtimeConfig.public.GITHUB_REDIRECT_URI)
const prisma = new PrismaClient()

async function getMe(session: any) {
    return await $fetch('/api/me', {
      method: 'POST', query: {
        API_ROUTE_SECRET: runtimeConfig.API_ROUTE_SECRET,
      },
      body: {
        email: session?.user?.email,
      },
    })
  }

export default NuxtAuthHandler({

    pages: {
        signIn: '/login',
        newUser: '/',
    },
    session: {
      strategy: "jwt" // Явно указываем стратегию JWT
    },
    adapter: PrismaAdapter(prisma),
    callbacks:  {
      session: async ({ session }) => {
        try {
          // Проверяем: есть ли email у session.user
          if (session?.user?.email) {
            const me = await $fetch('/api/me', {
              method: 'POST',
              query: {
                API_ROUTE_SECRET: runtimeConfig.API_ROUTE_SECRET,
              },
              body: {
                email: session.user.email,
              },
            })
    
            // Добавляем только если `me` успешно получен
            if (me?.subscribed !== undefined) {
              session.subscribed = me.subscribed
            }
          }
        } catch (e) {
          console.warn('⚠️ Не удалось получить данные /api/me:', e.message)
          // Не выбрасываем ошибку! Просто продолжаем без поля subscribed
        }
    
        return session
      },
    },


    providers: [
        GithubProvider.default({
            clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
            clientSecret: runtimeConfig.public.GITHUB_CLIENT_SECRET
        }),

        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
              email: { label: 'Email', type: 'text' },
              password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any) {
              if (!credentials?.email || !credentials?.password) {
                throw new Error('Missing credentials')
              }
          
              const user = await prisma.user.findUnique({
                where: { email: credentials.email },
              })
          
              if (!user || !user.password) {
                throw new Error('User not found or no password')
              }
          
              const isValid = await bcrypt.compare(credentials.password, user.password)
          
              if (!isValid) {
                throw new Error('Invalid password')
              }
              
              console.log('✅ Авторизованный пользователь из Prisma:', {
                id: user.id,
                email: user.email,
                name: user.name,
              })
              // ВАЖНО: возвращаем объект С ПОЛЕМ id
              return {
                id: user.id,
      email: user.email,
      name: user.name,
      image: user.image || null,
              }

            }
          }),
          

    ],
})