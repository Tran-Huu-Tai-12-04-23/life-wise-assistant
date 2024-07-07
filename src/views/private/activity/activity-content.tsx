import Avatar from "@/components/UI/Avatar";

const activitiesData = {
  Today: [
    {
      title: "Huutai updated his profile",
      user: null,
      time: new Date(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
    {
      title: "Huutai change task 1 to completed",
      user: null,
      time: new Date(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
    {
      title: "nguyen dang change task 12 assign to nguyen",
      user: null,
      time: new Date(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
  ],
  "12-04-2003": [
    {
      title: "Huutai done task today",
      user: null,
      time: new Date(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.asdasd asdasdajsdhkasdgkashdkasdhaskdhaskd \n asdlasdl \n \n\naasdhasdkahsdkjahsdkajhsdkajshdkasjhdkasdhjaksdhasdhsadashdgjhhasd zxnbcmuwdyqiuw  Lorem ipsum dolor sit amet consectetur adipisicing elit.asdasd asdasdajsdhkasdgkashdkasdhaskdhaskd \n asdlasdl \n \n\naasdhasdkahsdkjahsdkajhsdkajshdkasjhdkasdhjaksdhasdhsadashdgjhhasd zxnbcmuwdyqiuw  Lorem ipsum dolor sit amet consectetur adipisicing elit.asdasd asdasdajsdhkasdgkashdkasdhaskdhaskd \n asdlasdl \n \n\naasdhasdkahsdkjahsdkajhsdkajshdkasjhdkasdhjaksdhasdhsadashdgjhhasd zxnbcmuwdyqiuw  Lorem ipsum dolor sit amet consectetur adipisicing elit.asdasd asdasdajsdhkasdgkashdkasdhaskdhaskd \n asdlasdl \n \n\naasdhasdkahsdkjahsdkajhsdkajshdkasjhdkasdhjaksdhasdhsadashdgjhhasd zxnbcmuwdyqiuw  Lorem ipsum dolor sit amet consectetur adipisicing elit.asdasd asdasdajsdhkasdgkashdkasdhaskdhaskd \n asdlasdl \n \n\naasdhasdkahsdkjahsdkajhsdkajshdkasjhdkasdhjaksdhasdhsadashdgjhhasd zxnbcmuwdyqiuw ",
    },
    {
      title: "nguyen change task 111 assign to nguyen",
      user: null,
      time: new Date(),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
  ],
};
function ActivityContent() {
  return (
    <div className="w-3/4 flex flex-col p-4 ">
      {Object.keys(activitiesData).map((key) => (
        <LstActivityItem
          data={activitiesData[key as keyof unknown]}
          name={key}
        />
      ))}
    </div>
  );
}

const LstActivityItem = ({ data, name }: { data: never[]; name: string }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-10 w-full relative">
      <div className="flex mt-6  w-full justify-between items-center gap-2">
        <div className="w-[42%] h-[1px] bg-primary/5" />
        <h6 className="font-bold text-sm text-primary/50">{name}</h6>
        <div className="w-[42%] h-[1px] bg-primary/5" />
      </div>

      <div className="flex flex-col">
        {data.map((item, index) => (
          <ActivityItem
            key={index}
            data={item}
            isHasLine={index < data?.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const ActivityItem = ({
  data,
  isHasLine,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isHasLine: boolean;
}) => {
  return (
    <div className="flex justify-start items-start gap-4 w-full relative pb-10">
      {isHasLine && (
        <div className="absolute w-[2px] h-full left-[1.3rem] bg-primary/20 top-12" />
      )}
      <div className="flex justify-start gap-2 min-w-[14rem]">
        <Avatar isOnline isStatus url={data.user?.avatar} />
        <div className="flex flex-col gap-1">
          <h6 className="text-sm text-primary/50">
            {data.time.toLocaleString()}
          </h6>
          <h6 className="text-sm text-primary/50">{data.user?.name}</h6>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start">
        <h6 className="font-bold text-sm">{data.title}</h6>

        <p className="text-sm text-primary/50">{data.description}</p>
      </div>
    </div>
  );
};

export default ActivityContent;
