
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  const cookieStore = await cookies()
  const authCookies = [
    'token',
    'session',
    'auth-token',
    'next-auth.session-token', // If using NextAuth
    'next-auth.csrf-token'
  ]

  authCookies.forEach(cookieName => {
    cookieStore.delete(cookieName)
  })

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Failed to invalidate server session:', error)
  }

  redirect('/')
}