import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',

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
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identity: credentials?.email,
            password: credentials?.password
          })
        });

			
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
	pages: {
		//change for PROD OR DEV
		//
		// signIn: "https://amdocsplataform.vercel.app/login",
		//DEV
		// signIn: 'http//localhost:3000/login',

		// error: "https://amdocsplataform.vercel.app/login"
		//DEV
		// error: 'http//localhost:3000/login'
	},
	secret: 'no secret',

	callbacks: {
	

		async jwt({ token, user, account }: any) {
			if (account && user && token) {
				return {
					...token,
					...user,
					accessToken: user.access_token
				};
			}

			return token;
		},
		// async redirect({ url, baseUrl }) {
		// 	return url.startsWith(baseUrl) ? url : baseUrl;
		// },

		async session({ session, token }: any) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.id = token.id;
			// session.user.name = token.user;
			// session.user = token;
			

			return session;
		}
	},

	session: {
		strategy: 'jwt'
	},
	debug: true
});
