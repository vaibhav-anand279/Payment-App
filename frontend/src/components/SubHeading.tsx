interface SubHeadingProps{
    label:string
}

const SubHeading = ({label}:SubHeadingProps) => {
  return (
    <div className="text-2xl text-gray-500 pt-1">
      {label}
    </div>
  )
}

export default SubHeading
