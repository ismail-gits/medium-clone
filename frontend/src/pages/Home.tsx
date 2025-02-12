import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Home() {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/blogs')
  }, [])

  return <div>
  </div>
}