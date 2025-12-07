import Headers from "../components/Headers"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import Button from "../components/Button"
import { useEffect,useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
  
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const navigate=useNavigate();
useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (userToken) {
      navigate("/dashboard"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

  return (
    <>
    <div className="flex justify-center min-h-screen  items-center  bg-gradient-to-br from-indigo-50 to-blue-100">
    <div className="flex flex-col bg-white shadow-xl rounded-2xl border border-gray-200 justify-center items-center w-[500px] h-[500px]">
     <Headers label={"Signup"} />
     <SubHeading label={"Enter Your Information here to signup"}/>
     <InputBox  onChange={(e)=>{setFirstName(e.target.value)}} label={"First Name"} />
     <InputBox onChange={(e)=>{setLastName(e.target.value)}} label={"Last Name"} />
     <InputBox onChange={(e)=>{setUsername(e.target.value)}} label={"Username"}/>
      <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"}/>
      <Button onClick={async()=>{
        const res=await axios.post(`http://localhost:3000/api/v1/user/signup`,{
            firstName,
            lastName,
            username,
            password
        });
        localStorage.setItem("token",res.data.token);
        navigate("/dashboard");
      }} text={"Sign up"} color={"primary"}/>
    </div>
  
    </div>
      <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
          </>
  )
}

export default Signup
