import IconFacebook from "@/components/Icons/SocialMedia/Facebook";
import IconGithub from "@/components/Icons/SocialMedia/Githug";
import IconGoogle from "@/components/Icons/SocialMedia/Google";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Input from "@/components/UI/Input";
import { useState } from "react";
import { toast } from "sonner";
import Overlay from "./Overlay";
import { useAuthAction } from "@/redux/features/auth/action";
import { useAuthState } from "@/redux/features/auth/authSlice";

type IUserLogin = {
  username: string;
  password: string;
};
function Login() {
  const { login } = useAuthAction();
  const { isLoading } = useAuthState();
  const [userInput, setUserInput] = useState<IUserLogin>({
    username: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setUserInput((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleLogin = async () => {
    if (!userInput?.username || !userInput?.password) {
      return toast.warning("All fields are required");
    }
    login({
      username: userInput.username,
      password: userInput.password,
    },'default');
  };

  const handleLoginWithGoogle = async () => {
    login({
      username: userInput.username,
      password: userInput.password,
    }, 'google');
  };

  const handleLoginWithGithub = async () => {
    login({
      username: userInput.username,
      password: userInput.password,
    }, 'github');
  };

  return (
    <Container>
      <div className="flex_between h-screen w-screen bg-gradient-to-tr from-blue-500 to-green-500">
        <Overlay />
        <div className=" flex flex-col w-1/2 max-w-[40rem] m-auto p-20 min-h-[100vh] justify-center">
          <h1 className="font-bold text-white">Login</h1>
          <h6 className="text-white">How do i get started lorem dolor at?</h6>
          <div className="flex items-center gap-2 justify-center pt-2 pb-2">
            <Button
              name=""
              type={"link"}
              rightIcon={<IconGoogle />}
              className="bg-[rgba(0,0,0,0.1)] backdrop-blur-xl"
              onClick={handleLoginWithGoogle}
            />
            <Button
              name=""
              type={"link"}
              className="bg-[rgba(0,0,0,0.1)] backdrop-blur-xl"
              rightIcon={<IconFacebook />}
              onClick={() => toast.info("Facebook login is not implemented yet")}
            />
            <Button
              name=""
              type={"link"}
              className="bg-[rgba(0,0,0,0.1)] backdrop-blur-xl"
              rightIcon={<IconGithub />}
              onClick={handleLoginWithGithub}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="styled_line w-[40%]" />
            <h6>OR</h6>
            <div className="styled_line w-[40%]" />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              value={userInput.username}
              label="Username"
              placeholder="Enter your username"
              keyInput={"username"}
              onChange={handleChange}
            />
            <Input
              value={userInput.password}
              keyInput={"password"}
              onChange={handleChange}
              label="Password"
              isPassword
              placeholder="Enter your password"
            />

            <div className="flex justify-end items-start">
              <Button
                name="Forgot password?"
                type="link"
                onClick={function (): void {}}
              />
            </div>
            <Button
              isLoading={isLoading}
              name="Login"
              type={"primary"}
              onClick={handleLogin}
            />
          </div>

          <div className="flex absolute bottom-10 right-0 left-0 flex-col gap-2 mt-auto justify-center items-center">
            <h6 className="font-bold text-xs text-center text-white mt-2">
              @2024 All rights reserved by @GENNY{" "}
            </h6>
            <a
              target="_blank"
              className="font-bold text-xs"
              href="https://github.com/Tran-Huu-Tai-12-04-23"
            >
              https://github.com/Tran-Huu-Tai-12-04-23
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
