import React, { useState } from 'react'
import {Label,TextInput,Button, Alert, Spinner} from 'flowbite-react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signInStart,signInSuccess,signInFailure} from '../Features/userSlice'
function SignIn() {
  const [formdata,setformdata] = useState({})
  const {loading,error} = useSelector(state=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechange = (e)=>{
     setformdata({...formdata,[e.target.id]:e.target.value}) 
    }
  const handleSubmit = async(e)=>{
     e.preventDefault();
     if(!formdata.password || !formdata.email ||formdata.password == '' || formdata.email == ''){
         dispatch(signInFailure('Please Fill all fields'))
     }
    try{
      dispatch(signInStart());
        const resp = await fetch('/api/auth/signin',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formdata)
        })
        const data = await resp.json();
       if(data.success === false){
        dispatch(signInFailure(data.msg));
       }
       if(resp.ok){
        dispatch(signInSuccess(data))
          navigate('/')
       }
       
    }catch(err){
        console.log(err)
        dispatch(signInFailure(err.msg))
    }
  }
  return (
    
    <div className='min-h-screen '>
      <div className='flex flex-col gap-2  items-center '>
          <div className='text-4xl font-bold mb-4 mt-10'>
            LOGIN
          </div>
          <form className='flex flex-col gap-5 justify-center items-center'>
            
            <div className=' w-[400px]'>
              <Label value='Email'/>
              <TextInput type='email' placeholder='Your Email...' id='email' onChange={handlechange}/>
            </div>

            <div className=' w-[400px]'>
              <Label value='Password'/>
              <TextInput type='password' placeholder='Your Password...' id='password' onChange={handlechange}/>
            </div>
            
            <Button type='submit' className='mt-4 w-[400px]' gradientDuoTone="greenToBlue" onClick={handleSubmit} disabled={loading}>
                {
                  loading?<>
                  <Spinner size='sm'>
                    <span className='pl-3'>Loading...</span>
                  </Spinner>
                  </>
                  :'Sign In'
                }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mr-28'>
            <span>Don't Have An Account?</span>
            <Link to='/signup' className='text-blue-500'>Register</Link>
          </div>
      {
        error?<Alert className='mt-5 w-[400px]' color='failure'>{error}</Alert>:<></>
      }
      </div>
      
    </div>
  )
}

export default SignIn
