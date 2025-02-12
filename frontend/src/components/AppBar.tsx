import { Avatar } from "./Avatar"
import { Link, useNavigate } from "react-router-dom"

export const AppBar = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/publish')
  }

  return <div className="fixed top-0 left-0 right-0 down-0 bg-white border-b flex justify-between items-center border-gray-200 py-3 px-16">
    <div className="cursor-pointer font-bold text-3xl">
      <Link to={'/blogs'}>Medium</Link>
    </div>
    <div className="cursor-pointer flex">
      <div>
        <button onClick={onClickHandler} type="button" className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full cursor-pointer">Write</button>
      </div>
      <div className="pl-10">
        <Avatar authorName="Peter V" size={10}/>
      </div>
    </div>
  </div>
}