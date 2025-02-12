import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function Blogs() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin')
    }
  }, [])

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
        id={blog.id}
        authorName={blog.author.name} 
        title={blog.title}
        content={blog.content}
        publishedDate="Dec 3, 2023"
      />)}
    </div>
  </div>
}