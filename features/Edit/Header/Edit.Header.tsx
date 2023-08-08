import Image from "next/image";

import uploadImg from "@/app/assets/images2/upload.svg";
import Button from "./Edit.Header.Button";
import Menu from "./Edit.Header.Menu";
import Item from "./Edit.Header.Menu.Item";

export default function Header() {
  return (
    <div className="flex justify-center w-full border-b-[1px] border-[#D4D4D4]">
      <div className="relative dt:max-w-[1008px] w-full h-[115px] flex justify-between items-center dt:px-0 px-[16px] bg-white font-sm text-[14px]">
        <div className="grid w-full h-full">
          <div className="flex dt:justify-start justify-center items-center h-[80px]">
            <p className="ph:text-[24px] text-[20px] font-bold">프로필 수정</p>
            <Button style="absolute right-[16px] ph:hidden flex">저장</Button>
          </div>
          <Menu>
            <Item>프로필 카드</Item>
            <Item>대표 아바타</Item>
            <Item>설명</Item>
            <Item>포트폴리오</Item>
            <Item>가격정보</Item>
            <Item>결제수단</Item>
          </Menu>
        </div>
        <Button style="ph:flex hidden">저장하기</Button>
      </div>
    </div>
  );
}
