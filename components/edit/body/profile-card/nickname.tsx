export default function Nickname() {
  return (
    <div className="flex items-center ph:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
      <input
        type="text"
        className="grow h-full outline-none text-sm"
        placeholder="닉네임을 입력해주세요."
      ></input>
    </div>
  );
}
