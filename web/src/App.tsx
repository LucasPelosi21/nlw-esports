import './styles/main.css'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from './assets/logo.svg'
import { GameBanner } from './components/GamerBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Game {
  id: number
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then((res) => setGames(res.data))
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='' />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui!
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((g) => (
          <GameBanner key={g.id} bannerUrl={g.bannerUrl} title={g.title} adsCount={g._count.ads} />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
