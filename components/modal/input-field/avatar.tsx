interface AvatarProps {
  avatarFileNameInputRef: any;
  avatarFileName?: any;
  avatarFileInputRef: any;
  loadAvatarFile: any;
  isEmpty: boolean;
}

export default function Avatar({
  avatarFileNameInputRef,
  avatarFileName,
  avatarFileInputRef,
  loadAvatarFile,
  isEmpty,
}: AvatarProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">파일</p>
      <div className="flex space-x-[16px]">
        <input
          type="text"
          ref={avatarFileNameInputRef}
          disabled
          className="w-full h-[35px] rounded-[10px] bg-[#FFFFFF] border-[1px] border-[#CCCCCC] border-solid px-[14px] outline-none"
          placeholder="VRM 파일을 등록해주세요"
          defaultValue={avatarFileName}
        />
        <form>
          <label htmlFor="avatarFile">
            <div className="flex justify-center items-center w-[56px] h-[35px] bg-[#368ADC] rounded-[10px] text-[#FFFFFF] cursor-pointer">
              변경
            </div>
          </label>
          <input
            ref={avatarFileInputRef}
            className="hidden"
            type="file"
            id="avatarFile"
            accept=".vrm"
            onChange={loadAvatarFile}
          />
        </form>
      </div>
      <div className="!mt-[5px] pl-[5px] text-red-500">
        {isEmpty ? "아바타 파일이 필요합니다" : ""}
      </div>
    </div>
  );
}
