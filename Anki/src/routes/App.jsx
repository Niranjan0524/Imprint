
import '../App.css'
import LoginPage from './LoginPage'
import SignupPage from './SignUp'
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AddCard from '../components/AddCard';
import { Outlet } from 'react-router-dom'

function App() {
  

  return <>
    {/* <LoginPage/> */}
    {/* <SignupPage/> */}
    {/* <LandingPage/>   */}
    <Outlet/>
    {/* <AddCard/> */}
  </>
 
  
}

export default App
