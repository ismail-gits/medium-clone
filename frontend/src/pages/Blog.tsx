import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { Skeleton } from "../components/Skeleton"
import { FullBlog } from "../components/FullBlog"
import { AppBar } from "../components/AppBar"

export function Blog() {

  const { id } = useParams<{ id: string}>()

  const { loading, blog } = useBlog({id: id ?? ""})

  if (loading) {
    return <div>
      <Skeleton/>
    </div>
  }

  return <div>
    <AppBar/>
    <FullBlog blog={blog}/>
  </div>
}