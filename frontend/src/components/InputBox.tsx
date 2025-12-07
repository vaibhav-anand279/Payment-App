interface InputBoxProps{
    placeholder?:string,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>)=>void,
    label?:string
}



const InputBox = ({placeholder,onChange,label}:InputBoxProps) => {
  return (
    <div>
        <div className="text-sm font-medium text-left ">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2  border  border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  
  )
}

export default InputBox
