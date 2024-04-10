import { useContext, useEffect} from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export const Header = () => {

  const {userInfo, setUserInfo} = useContext(UserContext)

  useEffect(() => {
    fetch("http://localhost:8080/profile", {
      credentials: "include",
      method: "GET",
    }).then((res) => {
      res.json().then((userData) => {
        // console.log(userData)
        setUserInfo(userData)
      })
    })
  }, [])

  function handleLogout() {
    fetch("http://localhost:8080/logout", {
      credentials: "include",
      method: "get",
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
      <Link
        to=""
        className="logo">
        BLOG
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create a new post</Link>
            <a onClick={handleLogout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
