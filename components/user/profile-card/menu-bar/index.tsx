import Menu from "./menu";
import Item from "./menu-item";

export default function MenuBar() {
  return (
    <div className="ph:hidden flex justify-center w-full !mt-[32px] border-b-[1px] border-[#D4D4D4]">
      <div className="relative grid dt:max-w-[1008px] w-full ph:h-[115px] h-auto justify-between items-center bg-white font-sm text-[14px]">
        <Menu>
          <Item>소개</Item>
          <Item>작업</Item>
          <Item>커미션 안내</Item>
          <Item>비용 안내</Item>
        </Menu>
      </div>
    </div>
  );
}
