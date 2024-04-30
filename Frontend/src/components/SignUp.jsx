import React, { useState } from 'react'
import {Label,TextInput,Button, Alert, Spinner} from 'flowbite-react'
import { Link,useNavigate } from 'react-router-dom'

function SignUp() {
  const [formdata,setformdata] = useState({})
  const [loading,setloading] = useState(false);
  const [error,seterror] = useState(null);
  const navigate = useNavigate();
  const handlechange = (e)=>{
    seterror(null)
     setformdata({...formdata,[e.target.id]:e.target.value}) 
    }
  const handleSubmit = async(e)=>{
     e.preventDefault();
     if(!formdata.username || !formdata.password || !formdata.email || formdata.username == '' || formdata.password == '' || formdata.email == ''){
          seterror('Please Fill out All the Fields');
     }
    try{
      setloading(true);
      seterror(null)
        const resp = await fetch('/api/auth/signup',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(formdata)
        })
        const data = await resp.json();
       if(data.success === false){
        seterror(data.msg);
       }
       if(resp.ok){
          navigate('/signin')
       }
       setloading(false);
    }catch(err){
        console.log(err)
        seterror(err.msg)
        setloading(false)
    }
  }
  return (
    
    <div className='min-h-screen '>
      <div className='flex flex-col gap-2  items-center '>
          <div className='text-4xl font-bold mb-4 mt-10'>
            REGISTER
          </div>
          <form className='flex flex-col gap-5 justify-center items-center'>
            
            <div className=' w-[400px]'>
              <Label value='Username'/>
              <TextInput type='text' placeholder='Your Username...' id='username'
                onChange={handlechange}
              />
            </div>
            
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
                  :'Sign Up'
                }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mr-36'>
            <span>Have an Account?</span>
            <Link to='/signin' className='text-blue-500'>Sign In</Link>
          </div>
      {
        error?<Alert className='mt-5 w-[400px]' color='failure'>{error}</Alert>:<></>
      }
      </div>
      
    </div>
  )
}

export default SignUp
