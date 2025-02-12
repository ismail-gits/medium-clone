import { useRef, useState } from "react"
import { PublishAppBar } from "../components/PublishAppBar";

export function Publish() {
  const [ title, setTitle ] = useState("")
  const [ content, setContent ] = useState("")

  const titleRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  return <div>
    <div>
      <PublishAppBar title={title} content={content}/>
      <div className="flex flex-col items-center">
        <div className="w-screen lg:w-4xl px-10 py-6">
          <textarea 
            id="titleArea"
            ref={titleRef}
            className="resize-none block w-full text-5xl font-semibold text-gray-900 dark:placeholder-gray-400 dark:text-white focus:outline-none overflow-hidden" 
            rows={1} 
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value)

              if (titleRef.current) {
                titleRef.current.style.height = "auto"
                titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
              }
            }}
          />

          <textarea 
            id="contentArea"
            ref={contentRef}
            className="resize-none block w-full text-xl text-gray-900 dark:placeholder-gray-400 dark:text-white focus:outline-none overflow-hidden pt-5" 
            rows={1} 
            placeholder="Tell your story..."
            onChange={(e) => {
              setContent(e.target.value)
              if (contentRef.current) {
                contentRef.current.style.height = "auto"
                contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
              }
            }}
          />
        </div>
      </div>
    </div>
  </div>
}