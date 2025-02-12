import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface BlogType {
  title: string,
  content: string,
  author: {
    name: string
  } 
}

export const useBlogs = () : {loading: boolean, blogs: BlogType[]} => {
  const [ loading, setLoading ] = useState(true)
  const [ blogs, setBlogs ] = useState([])

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