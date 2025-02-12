import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface BlogType {
  id: string,
  title: string,
  content: string,
  author: {
    name: string
  } 
}

export const useBlogs = () => {
  const [ loading, setLoading ] = useState(true)
  const [ blogs, setBlogs ] = useState<BlogType[]>([])

  useEffect(() => {
    try {
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((response) => {
        setBlogs(response.data)
        setLoading(false)
      })
    }
    catch(err) {
      console.log(err);
    }
  }, [])

  return {
    loading, 
    blogs
  }
}

export const useBlog = ({id}: {id: string}) => {
  const [ loading, setLoading ] = useState(true)
  const [ blog, setBlog ] = useState<BlogType>({
    id: "",
    title: "",
    author: {
      name: ""
    },
    content: ""
  })

  useEffect(() => {
    try {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((response) => {
        setBlog(response.data)
        setLoading(false)
      })
    }
    catch(err) {
      console.log(err);
    }
  }, [id])

  return {
    loading, 
    blog
  }
}