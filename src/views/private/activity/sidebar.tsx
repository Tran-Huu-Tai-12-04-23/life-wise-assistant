const teams = [
  {
    name: "Nha tro sach se",
    icon: "https://cdn.dribbble.com/userupload/6979073/file/original-700bc38bf1e23e9019dbc3e922fe7fc4.png?resize=1024x768",
    totalNotification: 10,
  },
  {
    name: "Van cong thanh",
    icon: "https://cdn.dribbble.com/userupload/6979073/file/original-700bc38bf1e23e9019dbc3e922fe7fc4.png?resize=1024x768",
    totalNotification: 2,
  },
  {
    name: "Ape BOT",
    icon: "https://cdn.dribbble.com/userupload/6979073/file/original-700bc38bf1e23e9019dbc3e922fe7fc4.png?resize=1024x768",
    totalNotification: 0,
  },
  {
    name: "Ape Grean leaf",
    totalNotification: 5,
    icon: "https://cdn.dribbble.com/userupload/6979073/file/original-700bc38bf1e23e9019dbc3e922fe7fc4.png?resize=1024x768",
  },
];
function SideBar() {
  return (
    <div className="w-1/4  h-full flex flex-col border-r">
      <div className="flex justify-between items-center border-b  p-4">
        <h6 className="font-bold">Teams</h6>
        <h6 className="text-sm text-primary/50">15 new activities</h6>
      </div>

      <div className="flex flex-col">
        {teams.map((team) => (
          <TeamItem key={team.name} data={team} />
        ))}
      </div>
    </div>
  );
}

function TeamItem({ data }: { data: (typeof teams)[0] }) {
  const { name, icon, totalNotification } = data;
  return (
    <div className="flex justify-between items-center border-b  p-4 hover:bg-primary/5 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
          <img className="bg-cover" src={icon} alt="" />
        </div>
        <h6 className="font-bold text-sm">{name}</h6>
      </div>
      {totalNotification !== 0 && (
        <h6 className="text-sm text-primary/50 font-bold justify-center items-center flex w-[2rem] h-[2rem] rounded-full bg-primary/10">
          {totalNotification}
        </h6>
      )}
    </div>
  );
}

export default SideBar;
