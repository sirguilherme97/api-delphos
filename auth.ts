import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
 

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        id: 'credentials',
        name: 'credentials',

        credentials: {
            email: {
                label: 'email',
                type: 'email',
                placeholder: 'email'
            },
            password: { label: 'password', type: 'password' }
        },

        async authorize(credentials: any, req, ) {
            const payload = {
                email: credentials?.email,
                password: credentials?.password
            };

            const res = await fetch('https://treina1.delphosautomacao.com/api/collections/users/auth-with-password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                  identity: 'user1',
                  password: '123456789'
                }).toString()
              });
              
            console.log(res)

            const user = await res.json();

            if (res.status === 429) {
                throw new Error('Too Many Requests');
            }

        

            if (!res.ok) {
                return res.json();
            }

            
            if (res.ok && user) {
                user;

                return user;
            
            }

            return null;
        }
    })


   ],
});

// Add providers with an empty array for no