import { StrictMode } from 'react'
import React,{children} from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import LandingPage from './routes/LandingPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import SignupPage from './routes/SignUp.jsx'
import Profile from './routes/Profile.jsx'
import {Provider} from 'react-redux' ;
import ankiStore from './store/index.js'
import CardsOfDecks from './routes/cardsOfDecks.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<LandingPage/>
  },
  
  {
    path:"/Landingpage",element:<LandingPage/>
  },
  {
    path:"/Login",element:<LoginPage/>
  },
  {
    path:"/Signup",element:<SignupPage/>
  },
  {
    path:"/profile",element:<Profile/>
  },
  {
    path:"/cardsOfDeck",element:<CardsOfDecks/>
  }
  
  
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={ankiStore}>

    <RouterProvider router={router}>
    </RouterProvider>

    </Provider>
  </React.StrictMode>,
)
