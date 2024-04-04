'use client'
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event:SyntheticEvent){
    event.preventDefault()
    setIsLoading(true)
    
    const res = await fetch('https://treina1.delphosautomacao.com/api/collections/users/auth-with-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        identity: identity,
        password: password
      }).toString()
      });
      

    const user = await res.json();

    //save the user in a local storage

    if(res.status === 200){
      const save = await localStorage.setItem('user', JSON.stringify(user))
      //push to protuos
      router.replace('/produtos')
    }

    setIsLoading(false)

    // if (res.status === 429) {
    //   throw new Error('Too Many Requests');
    // }

    // if (!res.ok) {
    //   return res.json();
    // }

    
    // if (res.ok && user) {
    //   user;

    //   return user;
    
    // }
    // router.replace('/home')
  }

  return (
    <main className="flex flex-col items-center justify-start gap-5 bg-white w-full h-screen">
      <header className="h-20 w-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-[#4de577] font-bold text-2xl">Delphos Automação</h1>
      </header>
      <main className="flex flex-col gap-5 justify-start align-center">
        <p className="text-center text-lg font-medium text-gray-900">Login - Treinamento API</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              className="w-full h-10 rounded-lg px-2 bg-gray-200 text-gray-900 placeholder:text-gray-900"
              type="text" placeholder="Login"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
            />
            <input
              className="w-full h-10 rounded-lg px-2 bg-gray-200 text-gray-900 placeholder:text-gray-900"
              type="password" placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading} className="bg-[hsl(137,75%,60%)] hover:brightness-90 rounded-lg h-10  disabled:bg-[hsl(137,75%,30%)] disabled:cursor-wait" type="submit">
              Log In
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </main>
    </main>
  );
}
