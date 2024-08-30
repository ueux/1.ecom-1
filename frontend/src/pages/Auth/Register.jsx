import { useEffect, useState } from "react"
import  { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { useRegisterMutation } from "../../redux/api/useraApiSlice"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { setCredientials } from "../../redux/features/auth/authSlice"
 'react'

const Register = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const{userInfo}=useSelector(state=>state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  useEffect(()=> {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo])
  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password do not match')
    }
    else {
      try {
        const res = await register({ username, email, password }).unwrap()
        dispatch(setCredientials({ ...res }))
        navigate(redirect)
        toast.success('User Successfully registered')
      } catch (error) {
        console.log(error)
        toast.error(error.data.message)
      }
    }
  }
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
        <div className="my-[2rem] ">
                <lable htmlFor="name" className="text-black black text-sm font-medium ">
                    Name
                </lable>
                <input type="text" id="name" className="mt-1 p-2 border rounded w-full" value={username}  onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="my-[2rem] ">
                <lable htmlFor="email" className="text-black black text-sm font-medium ">
                    Email Address
                </lable>
                <input type="email" id="email" className="mt-1 p-2 border rounded w-full"  value={email}  onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="my-[2rem] ">
                <lable htmlFor="password" className="text-black black text-sm font-medium ">
                    Password
                </lable>
                <input type="password" id="password" className="mt-1 p-2 border rounded w-full" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="my-[2rem] ">
                <lable htmlFor="confirmPassword" className="text-black black text-sm font-medium ">
                    Confirm Password
                </lable>
                <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded w-full" value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <button disabled={isLoading} type="submit" className="bg-pink-500 text-black px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Registering..." : "Register"}</button>
            {isLoading&& <Loader/>}
        </form>
        <div className="mt-4">
                    <p className="text-black">
                        Already have an account ?{" "}
                        <Link to={redirect?`/login?redirect=${redirect}`:"/login"} className="text-pink-500 hover:underline">Login</Link>
                    </p>
                </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  )
}

export default Register
