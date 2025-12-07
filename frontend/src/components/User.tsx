import { useNavigate } from "react-router-dom";


interface UserProps{
  user:{
  _id:string,
    firstName:string,
    lastName:string,
    username:string,
    password:string
  }

}
const User = ({user}:UserProps) => {
  const navigate=useNavigate();

  return (
    <div className="flex gap-4 justify-between items-center ">
        <div className="flex gap-4">
            <div className="rounded-full h-12 w-12 flex justify-center bg-slate-200 py-2.5 px-3 mt-2 ml-2">
        {user.firstName[0].toUpperCase()}
        </div>
        <div className="flex justify-center mt-5 font-bold text-md">
         {user.firstName} {user.lastName}
        </div>
        </div>
        
   <div>
    <button onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          } }className="bg-black text-white rounded-md shadow-md mr-2 p-2">Send Money</button>
   </div>
    </div>
  )
}

export default User
