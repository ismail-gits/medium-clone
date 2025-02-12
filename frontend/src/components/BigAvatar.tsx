
export const BigAvatar = ({authorName}: {authorName: string}) => {
  const names = authorName.split(" ")

  return <div className={`inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full`}>
    <span className="font-medium text-gray-600">{names[0].charAt(0) + names[1]?.charAt(0)}</span>
  </div>
}