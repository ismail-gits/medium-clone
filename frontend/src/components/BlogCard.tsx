import { Avatar } from "./Avatar"

interface BlogCardType {
  authorName: string,
  title: string,
  content: string,
  publishedDate: string
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate
}: BlogCardType) => {
  return <div className="border-b border-gray-300 pb-10 pt-8 max-w-xl">
    <div className="flex items-center space-x-1.5">
      <div>
        <Avatar authorName={authorName} size={8}/> 
      </div>
      <div className="">
        {authorName}
      </div>
      <div id="dot" className="text-gray-500">{"\u2022"}</div>
      <div className="text-gray-500">
        {publishedDate}
      </div>
    </div>

    <div className="font-extrabold text-2xl pt-1 cursor-pointer">
      {title}
    </div>

    <div className="text-gray-600 pt-1">
      {content.slice(0, 150) + "..."}
    </div>
    <div className="text-gray-500 pt-6">
      {`${Math.ceil(content.length / 100)} min read`}
    </div>
  </div>
}