
import { useEffect,useState } from "react";
import {Appbar} from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
   const [bal, setBal] = useState(0);
  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  if(!token){
    navigate("/signin");
  }else{
  useEffect(
    ()=>{
      axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
          Authorization: token
        }
      }).then((response)=>{
        setBal(response.data.balance);
      }).catch((error) => {
          navigate("/signin");
        });
    },[navigate]
  )
}
  return (
    <div>
      <Appbar />
      <div className="ml-8 mt-6 flex flex-col gap-0">
        <Balance value={bal} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
