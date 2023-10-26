import Menu from "./menu";
import Item from "./menu-item";

export default function Header() {
  return (
    <div className="relative flex justify-center w-full h-[115px] border-b-[1px] border-[#D4D4D4] z-20">
      <div className="fixed top-0 left-0 w-full h-[115px] bg-[#FFFFFF] border-b-[1px] border-[#D4D4D4]" />
      <div className="fixed top-0 dt:max-w-[1008px] w-full h-[115px] flex justify-between items-center dt:px-0 px-[16px] bg-white font-sm text-[14px] border-b-[1px] border-[#D4D4D4]">
        <div className="grid w-full h-full">
          <div className="flex dt:justify-start justify-center items-center dt:h-[80px] h-[64px]">
            <p className="ph:text-[24px] text-[20px] font-bold">프로필 수정</p>
          </div>
          <Menu>
            <Item>프로필 카드</Item>
            <Item>아바타</Item>
            {/* <Item>커미션 안내</Item>
            <Item>비용 안내</Item> */}
          </Menu>
        </div>
      </div>
    </div>
  );
}
