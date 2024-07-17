import IconFacebook from "@/components/Icons/SocialMedia/Facebook";
import IconGithub from "@/components/Icons/SocialMedia/Githug";
import IconGoogle from "@/components/Icons/SocialMedia/Google";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Input from "@/components/UI/Input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type IUserLogin = {
  email: string;
  password: string;
};
function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleChange = (key: string, value: string) => {
    setUserInput((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        email: "huutt201@gmail.com",
      });
    }, 3000);
  };

  return (
    <Container>
      <div className="flex_between w-full ">
        <div className="flex flex-col w-1/2 max-w-[40rem] m-auto p-20 min-h-[100vh] justify-center">
          <h1 className="font-bold">Login</h1>
          <h5>How do i get started lorem dolor at? test CICD</h5>
          <div className="flex items-center gap-2 justify-center pt-2 pb-2">
            <Button
              name=""
              type={"secondary"}
              rightIcon={<IconGoogle />}
              onClick={() => {}}
            />
            <Button
              name=""
              type={"secondary"}
              rightIcon={<IconFacebook />}
              onClick={() => {}}
            />
            <Button
              name=""
              type={"secondary"}
              rightIcon={<IconGithub />}
              onClick={() => {}}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="styled_line w-[40%]" />
            <h5>OR</h5>
            <div className="styled_line w-[40%]" />
          </div>

          <div className="flex flex-col gap-2">
            <Input
              value={userInput.email}
              label="Email"
              placeholder="Enter your email Ex:xxx@gmail.com"
              keyInput={"email"}
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

          <h5 className="font-bold text-xs p-10 text-center">
            @2024 All rights reserved by @GENNY{" "}
            <a
              className="btn_link italic"
              target="_blank"
              href="github:123123.com.github"
            >
              github:123123.com.github
            </a>
          </h5>
        </div>
        <div className="bg-[] w-1/2 min-h-[100vh] bg-primary rounded-l-[10rem] center ">
          <img src="https://www.techavidus.com/images/blogs/application-lifecycle-management.png" />
        </div>
      </div>
    </Container>
  );
}

export default Login;
