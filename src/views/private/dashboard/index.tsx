import Button from "@/components/UI/Button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

function Dashboard() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="">
      <Button
        type={"primary"}
        name="Logout"
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            logout();
            setIsLoading(false);
          }, 2000);
        }}
      />
    </div>
  );
}

export default Dashboard;
