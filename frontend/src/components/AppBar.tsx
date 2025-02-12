import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

export const AppBar = () => {
  return <div className="border-b flex justify-between items-center border-gray-200 py-3 px-8">
    <div className="cursor-pointer font-bold text-2xl">
      <Link to={'/blogs'}>Medium</Link>
    </div>
    <div className="cursor-pointer">
      <Avatar authorName="Peter V" size={10}/>
    </div>
  </div>
}