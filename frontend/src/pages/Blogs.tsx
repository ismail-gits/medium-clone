import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function Blogs() {
  const navigate = useNavigate()

  const authorName = localStorage.getItem('name')

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin')
    }
  }, [])

  const { loading, blogs } = useBlogs()

  return <div>
    <div>
      <AppBar authorName={authorName || ""}/>
    </div>
    <div className="flex flex-col items-center pt-20">
      {(loading) ? 
        (Array.from({length: 5})).map(() => <div className="pt-10 pr-5"><Skeleton/></div>) : 
        blogs.map(blog => <BlogCard 
          id={blog.id}
          authorName={blog.author.name} 
          title={blog.title}
          content={blog.content}
          publishedDate="Dec 3, 2023"
        />)}
    </div>
  </div>
}