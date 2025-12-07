import { useEffect, useState } from "react"
import InputBox from "./InputBox"
import axios from "axios";
import User from "./User";

interface User{
  _id:string
    firstName:string,
    lastName:string,
    username:string,
    password:string

}

const Users =  () => {
  const [filter,setFilter]=useState("");
 const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // Define an async function inside the hook
    const fetchUsers = async () => {
      // Await the axios call
      const res = await axios.get(`htqtp://localhost:3000/api/v1/user/bulk?filter=${filter}`);
      // Set the state with the response data
      setUsers(res.data.user);
    };

    // Call the async function
    fetchUsers();
  }, [filter]);
 if(!users){
  return null;
 }

  return (
    <>
    <div className="flex flex-col gap-1">
        <div className="font-bold mt-6 text-lg px-2">
            Users
        </div>
        <div className="px-2 py-1">
        <InputBox onChange={(e)=>{setFilter(e.target.value)}} placeholder={"Search users"} />
        </div>
    </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
</>
  )

}

export default Users
