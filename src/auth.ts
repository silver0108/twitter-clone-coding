import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers';

export const {
  handlers: { GET, POST }, // API Route (실제 주소)
  auth, // 로그인 유무 알아내는 용도
  signIn, // 로그인하는 용도
} = NextAuth({
 pages: {
});