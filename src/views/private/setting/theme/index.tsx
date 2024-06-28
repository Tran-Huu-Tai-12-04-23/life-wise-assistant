import { useTheme } from "@/context/ThemeContext";
import { themeData } from "./_theme";
import { HiCheckCircle } from "react-icons/hi";
function Theme() {
  const { theme, updateTheme } = useTheme();
  return (
    <div className="p-4 w-full grid grid-cols-4 gap-10 pt-10 pb-10">
      {Object.keys(themeData).map((key) => (
        <ThemeItem
          onChangeTheme={(theme) => updateTheme(theme)}
          key={key}
          isActive={theme === key}
          data={themeData[key as keyof unknown]}
          name={key}
        />
      ))}
    </div>
  );
}

const ThemeItem = ({
  data,
  name,
  isActive,
  onChangeTheme,
}: {
  data: {
    bg: string;
    primary: string;
    secondary: string;
    third: string;
    text: string;
  };
  name: string;
  isActive: boolean;
  onChangeTheme: (theme: string) => void;
}) => {
  return (
    <div
      onClick={() => onChangeTheme(name)}
      style={{ background: data.bg }}
      className="flex p-2 relative shadow-2xl hover:scale-105 transition-all cursor-pointer rounded-md hover:bg-primary-content/10 flex-col gap-2 justify-center items-center"
    >
      {isActive && (
        <HiCheckCircle className="text-blue-500 absolute top-2 right-2" />
      )}

      <h5 className="shadow-2xl text-sm font-bold">
        {name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase()}
      </h5>

      <div className="flex justify-between items-center gap-2">
        <div
          className="flex justify-center items-center h-[2rem] w-[2rem] rounded-md"
          style={{ background: data.primary }}
        >
          A
        </div>
        <div
          className="flex justify-center items-center h-[2rem] w-[2rem] rounded-md"
          style={{ background: data.secondary }}
        >
          A
        </div>
        <div
          className="flex justify-center items-center h-[2rem] w-[2rem] rounded-md"
          style={{ background: data.third }}
        >
          A
        </div>
        <div
          className="flex justify-center items-center h-[2rem] w-[2rem]  rounded-md"
          style={{ background: data.text }}
        >
          A
        </div>
      </div>
    </div>
  );
};

export default Theme;
