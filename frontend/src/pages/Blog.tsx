import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { Skeleton } from "../components/Skeleton"
import { FullBlog } from "../components/FullBlog"
import { AppBar } from "../components/AppBar"

export function Blog() {

  const { id = "" } = useParams()

  const { loading, blog } = useBlog({id})

  return <div>
    <AppBar/>
    {(loading) ? 
      <div className="pt-10 flex justify-between">
        <div><Skeleton/></div> 
        <div><Skeleton/></div>
      </div> :
      <FullBlog blog={blog}/>
    }
  </div>
}