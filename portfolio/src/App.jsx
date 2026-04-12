import React from 'react'
import 'remixicon/fonts/remixicon.css'
import MartketPlace from './pages/MartketPlace'

const App = () => {
  return (
    <div>
      <img src="/logo/image.png" alt="Logo" className="ml-4 mt-4 top-6 left-6 h-12 rounded-full z-50 shadow-md" />
      <MartketPlace/>
    </div>
  )
}

export default App