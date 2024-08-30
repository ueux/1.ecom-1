import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const AdminRoutes = () => {
    const {userInfo}=useSelector(state=>state.auth)
  return (userInfo && userInfo.data.user.isAdmin?(<Outlet/>):(<Navigate to={"/login"} replace/>)
  )
}

export default AdminRoutes
