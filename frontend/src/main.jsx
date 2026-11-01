import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import SearchFriendsContext from './context/searchFriends.jsx'
import SocketContext from './context/SocketContext.jsx'


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <StrictMode>
      <AuthContext>
        <SocketContext>
          <SearchFriendsContext>
            <App />
          </SearchFriendsContext>
        </SocketContext>
      </AuthContext>
    </StrictMode>,
  </BrowserRouter>



)
