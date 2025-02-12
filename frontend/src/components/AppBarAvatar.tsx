import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AppBarAvatar = ({authorName}: {authorName: string}) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const names = authorName.split(" ")

  const navigate = useNavigate()
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return <div ref={divRef} className="relative inline-block">
    <div onClick={() => {
      setIsOpen(!isOpen)
    }} id="dropDownAvatar" className={`inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full cursor-pointer`}>
      <span className="font-medium text-gray-600">{names[0].charAt(0) + (names[1]?.charAt(0) ?? "")}</span>
    </div>

    <div className="absolute mt-4 right-0 translate-x-12">
      <div id="dropdownHover" className={`bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropDownAvatar">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Publish</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">My Blogs</a>
            </li>
            <li>
              <a onClick={() => {
                localStorage.removeItem("token")
                navigate('/signin')
              }} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign out</a>
            </li>
          </ul>
      </div>
    </div>
  </div>
}
