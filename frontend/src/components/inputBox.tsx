
interface inputBoxType {
  label: string,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type?: string
}

export const InputBox = ({label, placeholder, onChange, type}: inputBoxType) => {
  return <div>
    <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white pt-4">{label}</label>

    <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}