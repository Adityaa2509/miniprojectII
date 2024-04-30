import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
function SideBarModified() {
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
 const curruser =  useSelector((state)=>state.user.currentUser.userdata)
 //console.log(curruser.currentUser.userdata.isAdmin+ "inside sidebar")
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
            
            {curruser && curruser.isAdmin && (
            <Link to='/dashboard?tab=analytics'>
              <Sidebar.Item
                active={query === 'analytics' || !query }
                icon={HiChartPie}
                as='div'
                className='mb-2'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

            <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item active={query === 'profile'} 
                icon={HiUser} 
                label = {curruser.isAdmin?'Admin':'User'}
                 className='mb-2'
                 labelColor='dark'>
                 
                Profile
                </Sidebar.Item>
                </Link>
                {curruser.isAdmin &&<>
                <Link to={'/dashboard?tab=posts'}>
                    <Sidebar.Item active={query === 'posts'} 
                icon={HiDocumentText} 
                className='mb-2'
              as='div'>
                Posts
                </Sidebar.Item>
                </Link>
               <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={query === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                  className='mb-2'
                >
                  Comments
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={query === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                  className='mb-2'
                >
                  Users
                </Sidebar.Item>
              </Link>
</>
                }
                <Sidebar.Item  icon={HiArrowSmRight} >
                Logout
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default SideBarModified
