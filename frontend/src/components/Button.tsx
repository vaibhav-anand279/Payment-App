

const colors=new Map<string,string>();
colors.set("primary","bg-purple-600 text-white px-4 py-2 m-4 rounded-md flex gap-12 items-center justify-center pr-2 w-[150px]");
colors.set("secondary","bg-purple-200 text-purple-400 px-4 py-2 rounded-md flex gap-6 pr-2");

interface buttonProps{
    color:"primary" | "secondary",
    text:"Sign in" | "Sign up" | "Sign out",
    onClick?: ()=>  void
}
const Button = (props:buttonProps) => {
  return (
    
      <button onClick={props.onClick} className={colors.get(props.color)}  >
         {props.text}
      </button>
   
  )
}

export default Button;


