import notFoundImg from "../assets/notfound.svg";
import { useRouter } from "./hooks";
function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="center w-screen flex-col gap-10 h-screen flex justify-center items-center">
      <img src={notFoundImg} className="w-[300px] h-[300px]" />

      <button className="btn btn-primary" onClick={() => router.replace("/")}>
        Return previous page
      </button>
    </div>
  );
}

export default NotFoundPage;
