import Menu from "./menu";
import Item from "./menu-item";

export default function MenuBar() {
  return (
    <div className="flex justify-center w-full border-b-[1px] border-[#D4D4D4]">
      <div className="relative dt:max-w-[1008px] w-full ph:h-[115px] h-auto flex justify-between items-center dt:px-0 px-[16px] bg-white font-sm text-[14px]">
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
