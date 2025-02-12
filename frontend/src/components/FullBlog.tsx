import { BlogType } from "../hooks"
import { BigAvatar } from "./BigAvatar"


export const FullBlog = ({blog}: {blog: BlogType}) => {
  return <div className="grid lg:grid-cols-7 px-15 py-10 pr-10 pt-30">
    <div className=" col-span-5">
      <div className="text-3xl md:text-6xl font-extrabold">
        {blog.title}
      </div>
      <div className="text-gray-500 py-3">
        Posted on August 24, 2023
      </div>
      <div className="md:text-lg text-gray-700">
        {blog.content}
      </div>
    </div>

    <div className="col-span-2 pl-10 hidden lg:block">
      <div className="text-lg font-semibold">
        Author
      </div>

      <div className="pt-4 flex items-center">
        <div>
          <BigAvatar authorName={blog.author.name}/>
        </div>
        <div className="pl-4">
          <div className="text-2xl font-bold">
            {blog.author.name}
          </div>
          <div className="text-gray-700 pt-2">
            Master of mirth, purveyor of puns, and the funniest person in the kingdom.
          </div>
        </div>
      </div>
    </div>
  </div>
}