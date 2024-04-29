import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SideBar from './SideBarModified';
import Posts from './Posts'
import Profile from './Profile'
import SideBarModified from './SideBarModified';
import MyPosts from './MyPosts'
import Users from './Users';
import AdminComments from './AdminComments';
import Analytics from './Analytics';
function DashBoard() {
  const location = useLocation();
  const [query,setquery] = useState('');
  useEffect(()=>{
      const urlquery = new URLSearchParams(location.search)
      console.log(urlquery)
      const queryfromurl = urlquery.get('tab')
      if(queryfromurl){
        setquery(queryfromurl)
      }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      
      <div className='md:w-56'>

        <SideBarModified/>
      </div>
          
          {query == 'profile' && <Profile/>}     
          {query == 'posts' && <MyPosts/>}
          {query == 'users' && <Users/>}
          {query == 'comments' && <AdminComments/>}
          {query == 'analytics' && <Analytics/>}
          
      </div>
  )
}

export default DashBoard
