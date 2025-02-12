import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Skeleton } from "./components/Skeleton"

const Signin = lazy(() => import('./pages/Signin'))
const Signup = lazy(() => import('./pages/Signup'))
const Blog = lazy(() => import('./pages/Blog'))
const Blogs = lazy(() => import('./pages/Blogs'))
const Home = lazy(() => import('./pages/Home'))
const Publish = lazy(() => import('./pages/Publish'))

function App() {
  return <>
    <BrowserRouter>
      <Suspense fallback={<div className="flex justify-center"><Skeleton/></div>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
}

export default App