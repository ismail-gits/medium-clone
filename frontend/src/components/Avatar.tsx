
export const Avatar = ({authorName, size}: {authorName: string, size: number}) => {
  const names = authorName.split(" ")

  return <div className={`inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{names[0].charAt(0) + names[1]?.charAt(0)}</span>
  </div>
}