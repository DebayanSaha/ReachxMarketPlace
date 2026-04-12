import React from 'react'
import 'remixicon/fonts/remixicon.css'
import MartketPlace from './pages/MartketPlace'

const App = () => {
  return (
    <div>
      <a
  href="https://reachxgroup.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="/logo/image.png"
    alt="Logo"
    className="ml-4 mt-4 top-6 left-6 h-12 rounded-full z-50 shadow-md cursor-pointer"
  />
</a>
      <MartketPlace/>
    </div>
  )
}

export default App