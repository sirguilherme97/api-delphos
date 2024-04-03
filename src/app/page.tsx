'use client'
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(event:SyntheticEvent){
    event.preventDefault()
    
    const result = await signIn('credentials',{
      email:identity,
      password,
      redirect:false
    })

    if(result?.error){
      console.log(result)
      return
    }
    // router.replace('/home')
  }

  return (
    <main className="flex flex-col items-center justify-start gap-5 bg-white w-full h-screen">
      <header className="h-20 bg-gray-500 w-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-[#4de577] font-bold text-2xl">Delphos Automação</h1>
      </header>
      <main className="flex flex-col gap-5 justify-start align-center">
        <p className="text-center text-xl font-medium text-gray-900">Login - Treinamento API</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              className="w-full h-10 rounded-lg px-2 bg-gray-400 text-white placeholder:text-white"
              type="text" placeholder="Login"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
            />
            <input
              className="w-full h-10 rounded-lg px-2 bg-gray-400 text-white placeholder:text-white"
              type="password" placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#4de577] rounded-lg h-10" type="submit">
              Log In
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </main>
    </main>
  );
}
