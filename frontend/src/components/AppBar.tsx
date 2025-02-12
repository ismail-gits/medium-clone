import { Avatar } from "./Avatar"

export const AppBar = () => {
  return <div className="border-b flex justify-between items-center border-gray-200 py-3 px-8">
    <div className="cursor-pointer font-bold text-2xl">
      Medium
    </div>
    <div className="cursor-pointer">
      <Avatar authorName="Peter V" size={10}/>
    </div>
  </div>
}