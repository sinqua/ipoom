import Menu from "./menu";
import Item from "./menu-item";

export default function Header() {
  return (
    <div className="flex justify-center w-full border-b-[1px] border-[#D4D4D4]">
      <div className="relative dt:max-w-[1008px] w-full ph:h-[115px] h-[110px] flex justify-between items-center dt:px-0 px-[16px] bg-white font-sm text-[14px]">
        <div className="grid w-full h-full">
          <div className="flex dt:justify-start justify-center items-center dt:h-[80px] h-[64px]">
            <p className="ph:text-[24px] text-[20px] font-bold">마이페이지</p>
          </div>
          <Menu>
            <Item>프로필카드</Item>
            <Item>작업</Item>
            <Item>커미션 안내</Item>
            <Item>비용 안내</Item>
          </Menu>
        </div>
      </div>
    </div>
  );
}
