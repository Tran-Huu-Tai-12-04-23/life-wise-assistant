import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthAction } from "src/redux/features/auth/action";
import useQuery from "src/routes/hooks/use-query";

function LoginWithThirdPlatformCallBack() {
     const query = useQuery();
  const { onLoginWithThirdPlatform } = useAuthAction();

   useEffect(() => {
    const accessToken = query.get("accessToken");
    if (!accessToken) {
      toast.success("Login failed! Try again!");
      return;
    }
    onLoginWithThirdPlatform(accessToken);
  }, [query]);
    return ;
}

export default LoginWithThirdPlatformCallBack;