import { Key, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import MainSchedule from "./main-schedule";
import { dayOfWeek } from "./data";

function Schedule() {
  const [date, setDate] = useState<DateValueType>(null);
  return (
    <div className="flex w-full flex-col gap-2 ">
      <div className="flex border-b mb-4 flex-col p-4 sticky top-0 left-0 right-0 backdrop-blur-3xl z-50">
        <div className="flex justify-between items-center">
          <h6 className="font-bold text-md">Every schedule</h6>
          <div className="flex justify-end items-center gap-4 ">
            <div className=" max-w-[20rem] bg-primary/10 border-[1px] border-primary/20 border-solid rounded-lg">
              <Datepicker
                value={date}
                asSingle={true}
                useRange={false}
                onChange={function (value: DateValueType): void {
                  setDate(value);
                }}
              />
            </div>
            <button className="btn scale-animation">
              <BsThreeDotsVertical />
            </button>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          {dayOfWeek.map((day: string, index: Key | null | undefined) => (
            <DayOfWeekItem
              key={index}
              name={day.substring(0, 3)}
              active={index === 2} // Adjust this logic as per your active day logic
            />
          ))}
        </div>
      </div>
      <MainSchedule />
    </div>
  );
}
// DayOfWeekItem component
const DayOfWeekItem = ({ name, active }: { name: string; active: boolean }) => {
  return (
    <div
      className={`${
        active
          ? "bg-primary hover:brightness-110 text-primary-content"
          : "bg-primary-content/10 hover:bg-primary-content/80"
      } min-h-[2rem] shadow-2xl cursor-pointer w-[3rem] rounded-xl justify-center items-center flex flex-col pl-4 pr-4 relative gap-2`}
    >
      <h6 className="font-bold inherit text-sm w-full h-[4rem] flex justify-center items-center">
        {name}
      </h6>
    </div>
  );
};

export default Schedule;
