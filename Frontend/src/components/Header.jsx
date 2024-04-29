import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../Features/themeSlice';

function Header() {
  const dispatch = useDispatch()
  const curruser = useSelector((state) => state.user.currentUser)
  console.log(curruser)
  const theme = useSelector(state => state.theme)

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-md sm:text-xl font-semibold dark:text-white'>
        <span className='px-6 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 text-white rounded-xl'>Tech Bytes</span>
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline '
        />
      </form>
      <Button className='w-12 h-10 lg:hidden cursor-pointer' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill outline onClick={() => dispatch(toggleTheme())}>
          {theme.theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {curruser && curruser.userdata ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={curruser.userdata.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{curruser.userdata.username}</span>
              <span className='block text-sm font-medium truncate'>{curruser.userdata.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to={'/logout'}>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to='signin'>
            <Button gradientDuoTone="greenToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  )
}

export default Header
