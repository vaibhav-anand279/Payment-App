import Headers from "../components/Headers"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import Button from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Signin = () => {
     const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (userToken) {
      navigate("/dashboard"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  from-indigo-50 to-blue-100">
   <div className="flex flex-col bg-white justify-center items-center w-[500px] h-[500px]">
     <Headers label={"Signin"} />
     <SubHeading label={"Enter Your Information here to signin"}/>
     <InputBox onChange={(e) => {setUsername(e.target.value)}} label={"Username"} />
      <InputBox onChange={(e) => {setPassword(e.target.value)}} label={"Password"}/>
      <Button onClick={async () => {
                const response = await axios.post(
                   "http://localhost:3000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }} text={"Sign in"} color={"primary"}/>
      
    </div>
    <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
    </div>
  )
}

export default Signin
