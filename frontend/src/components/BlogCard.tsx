import { SmallAvatar } from "./SmallAvatar"
import { Link } from "react-router-dom"

export interface BlogCardType {
  id: string,
  authorName: string,
  title: string,
  content: string,
  publishedDate: string
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardType) => {
  return <div className="border-b border-gray-300 pb-10 pt-8 w-screen md:w-xl text-left px-6 md:px-1">
    <div className="flex items-center space-x-1.5">
      <div>
        <SmallAvatar authorName={authorName}/> 
      </div>
      <div>
        {authorName}
      </div>
      <div id="dot" className="text-gray-500">{"\u2022"}</div>
      <div className="text-gray-500">
        {publishedDate}
      </div>
    </div>

    <div className="font-extrabold text-xl md:text-2xl pt-1 cursor-pointer">
      <Link to={`/blog/${id}`}>{title}</Link>
    </div>

    <div className="text-gray-600 pt-1">
      {content.slice(0, 150) + "..."}
    </div>
    <div className="text-gray-500 pt-6">
      {`${Math.ceil(content.length / 100)} min read`}
    </div>
  </div>
}