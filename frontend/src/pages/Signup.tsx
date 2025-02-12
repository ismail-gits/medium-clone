import { Quote } from "../components/Quote"
import { AuthHeader } from "../components/AuthHeader"
import { SignupType } from '@ismaildevzone/medium-commons'
import { useState } from "react"
import { InputBox } from "../components/inputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
// import { BACKEND_URL } from "../config"

export function Signup() {
  const [ postInputs, setPostInputs ] = useState<SignupType>({
    email: "",
    name: "",
    password: ""
  })

  const navigate = useNavigate()

  async function onClickHandler() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
      const token = response.data.token
      const name = response.data.name
      localStorage.setItem('token', "Bearer " + token)
      localStorage.setItem('name', name)
      navigate('/blogs')
    }
    catch(err) {
      console.log(err);
    }
  }

  return <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="h-screen flex justify-center flex-col items-center">
      <div>
        <div className="px-8 lg:px-10">
          <AuthHeader title="Create an account" subTitle="Already have an account?" to="signin" toText="Signin"/>
        </div>
        <div>
          <InputBox label="Email" placeholder="Enter your email" onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }}/>

          <InputBox label="Name" placeholder="Enter your name" onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value
            })
          }}/>

          <InputBox label="Password" placeholder="******" type="password" onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }}/>

          <button onClick={onClickHandler} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-6 w-full cursor-pointer">Sign up</button>
        </div>
      </div>
    </div>
    <div className="hidden lg:block">
      <Quote/>
    </div>
  </div>
}