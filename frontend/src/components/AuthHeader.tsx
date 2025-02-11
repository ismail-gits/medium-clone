import { Link } from "react-router-dom"

interface authHeaderType {
  title: string,
  subTitle: string,
  to: string,
  toText: string
}

export const AuthHeader = ({title, subTitle, to, toText}: authHeaderType) => {
  return <div className="">
  <div className="font-extrabold text-4xl">
    {title}
  </div>

  <div className="flex justify-center text-gray-500 pt-1 font-medium">
    <div>
      {subTitle}
      <Link className="underline ml-1" to={`/${to}`}>{toText}</Link>
    </div>
  </div>
</div>
}