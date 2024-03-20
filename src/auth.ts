import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST }, // API Route (실제 주소)
  auth, // 로그인 유무 알아내는 용도
  signIn, // 로그인하는 용도
} = NextAuth({
  pages: {
    signIn: '/i/flow/login', // 기본적으로 로그인하는 창을 지원해줘서 만든 로그인 창으로 가게끔
    newUser: '/i/flow/signup', // 회원가입 창
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username, // credentials안에 username으로 고정되어 있어 id로 바꿔줌
            password: credentials.password,
          }),
        })

        // 로그인 실패
        if (!authResponse.ok) {
          return null
        }

        const user = await authResponse.json()
        console.log(user)
        return user // 로그인한 사람의 user 정보 (로그인 유무와 로그인한 사람을 알 수 있음)
      },
    }),
  ],
});