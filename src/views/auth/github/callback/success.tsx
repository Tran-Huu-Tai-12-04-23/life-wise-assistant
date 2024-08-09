/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthAction } from "@/redux/features/auth/action";
import useQuery from "@/routes/hooks/use-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

function GithubAuthSuccess() {
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
  return <></>;
}

export default GithubAuthSuccess;
