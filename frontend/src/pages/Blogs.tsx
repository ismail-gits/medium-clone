import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/useBlogs";
import { Skeleton } from "../components/Skeleton";


export function Blogs() {
  const { loading, blogs } = useBlogs()

  if (loading) {
    return <div>
      <Skeleton/>
    </div>
  }

  return <div className="">
    <div>
      <AppBar/>
    </div>
    <div className="flex flex-col items-center">
      {blogs.map(blog => <BlogCard 
        authorName={blog.author.name} 
        title={blog.title}
        content={blog.content}
        publishedDate="Dec 3, 2023"
      />)}
    </div>
  </div>
}