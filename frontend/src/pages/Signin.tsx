import { Quote } from "../components/Quote"
import { AuthHeader } from "../components/AuthHeader"
import { SigninType } from '@ismaildevzone/medium-commons'
import { useState } from "react"
import { InputBox } from "../components/inputBox"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Signin() {
  const [ postInputs, setPostInputs ] = useState<SigninType>({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  async function onClickHandler() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
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
        <div className="px-5 lg:px-10">
          <AuthHeader title="Welcome back! Sign in" subTitle="Don't have an account?" to="signup" toText="Signup"/>
        </div>
        <div>
          <InputBox label="Email" placeholder="Enter your email" onChange={(e) => {
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }}/>

          <InputBox label="Password" placeholder="******" type="password" onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value
            })
          }}/>

          <button onClick={onClickHandler} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-6 w-full cursor-pointer">Sign in</button>
        </div>
      </div>
    </div>
    <div className="hidden lg:block">
      <Quote/>
    </div>
  </div>
}