import axios from "axios"
import { BACKEND_URL } from "../config"
import { BigAvatar } from "./BigAvatar"
import { Link, useNavigate } from "react-router-dom"

interface publishType {
  title: string,
  content: string
}

export const PublishAppBar = (props: publishType) => {
  const navigate = useNavigate()

  const onClickHandler = async () => {
    console.log(props);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, props, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })

      const id = response.data.id
      navigate(`/blog/${id}`)
    }
    catch(err) {
      console.log(err)
    }
  }

  return <div className="fixed top-0 left-0 right-0 down-0 bg-white border-b flex justify-between items-center border-gray-200 py-3 px-50">
    <div className="cursor-pointer font-bold text-3xl">
      <Link to={'/blogs'}>Medium</Link>
    </div>
    <div className="cursor-pointer flex">
      <div>
        <button onClick={onClickHandler} type="button" className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full cursor-pointer">Publish</button>
      </div>
      <div className="pl-10">
        <BigAvatar authorName="Peter V"/>
      </div>
    </div>
  </div>
}