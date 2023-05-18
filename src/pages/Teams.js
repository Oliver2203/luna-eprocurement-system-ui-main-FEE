import ActionButton from '~/components/ActionButton';
import { DEPARTMENT_LIST, TEAM_LIST } from '~/components/Data';

function Teams() {
  const department_list = DEPARTMENT_LIST;

  return (
    <div className="mt-9 rounded-xl overflow-hidden sidebar-shadow">
      <div className="grid grid-cols-3 px-11 pr-56">
        <h3 className="font-inter font-medium text-[15px] leading-[26px] text-black py-4">DEPARTMENT</h3>
        <h3 className="font-inter font-medium text-[15px] leading-[26px] text-black py-4 flex justify-center">TEAMS</h3>
        <h3 className="font-inter font-medium text-[15px] leading-[26px] text-black py-4 flex justify-center">
          ACTION
        </h3>
      </div>
      <div className="line"></div>
      <div className="grid grid-cols-3 px-11 bg-white pr-56">
        {department_list.map((department, idx) => (
          <div key={idx} className="contents">
            <div className="flex items-center text-mainText text-sm font-inter h-20">{department}</div>
            <div className="flex flex-col gap-3 justify-center items-center text-mainText text-sm font-inter">
              {TEAM_LIST.map((team, idx) => (
                <div key={idx} className="">
                  {team}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-5">
              <ActionButton type="add team" onClick={() => {}} />
              <ActionButton type="delete" onClick={() => {}} />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-5 bg-white" />
    </div>
  );
}

export default Teams;
