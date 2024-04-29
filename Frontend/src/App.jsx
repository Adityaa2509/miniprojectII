import React from 'react'
import { BrowserRouter,Routes,Route, useNavigate, Navigate } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import DashBoard from './components/DashBoard'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import SideBarModified from './components/SideBarModified'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'
import SinglePost from './components/SinglePost'
import Search from './components/Search'
function App() {
  const currentUser = useSelector((state)=>state.user.currentUser)
  console.log(currentUser)
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/search' element={<Search/>}/>
        
        <Route path='/post/:postSlug' element={<SinglePost/>}/>

        {currentUser &&
        <Route path='/dashboard' element={<DashBoard/>}/>
        }
        
        <Route path='/' element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create' element={<CreatePost/>} />
            <Route path='/update/:postId' element={<UpdatePost />} />
        </Route>

     </Routes> 
    </BrowserRouter>  

  )
}

export default App
