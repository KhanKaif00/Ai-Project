import {Route,BrowserRouter,Routes} from 'react-router-dom'
import Register from '../screen/Register'
import Login from '../screen/login'
import Home from '../screen/Home'
const AppRoutes = () => {
  return (
   <BrowserRouter>
       <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
    
       </Routes>
   
   </BrowserRouter>
  )
}

export default AppRoutes