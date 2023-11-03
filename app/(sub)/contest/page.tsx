"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import background1Img from "@/app/assets/images/contest/background1.svg";
import background2Img from "@/app/assets/images/contest/background2.svg";
import background3Img from "@/app/assets/images/contest/background3.svg";
import avatarImg from "@/app/assets/images/contest/avatar.svg";
import titleImg from "@/app/assets/images/contest/title.svg";
import pinkLabelImg from "@/app/assets/images/contest/pink_label.svg";
import rewardTextImg from "@/app/assets/images/contest/reward_text.png";
import eventTextImg from "@/app/assets/images/contest/event_text.png";
import rankingTextImg from "@/app/assets/images/contest/ranking_text.png";
import goldLabelImg from "@/app/assets/images/contest/gold_label.png";
import silverLabelImg from "@/app/assets/images/contest/silver_label.png";
import bronzeLabelImg from "@/app/assets/images/contest/bronze_label.png";
import goldPrizeImg from "@/app/assets/images/contest/gold_prize.png";
import silverPrizeImg from "@/app/assets/images/contest/silver_prize.png";
import bronzePrizeImg from "@/app/assets/images/contest/bronze_prize.png";
import blueHeartImg from "@/app/assets/images/contest/blue_heart.png";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import RankingAvatar from "@/components/contest/ranking-avatar";

export default function Page() {
  const supabase = createClientComponentClient<Database>();

  const [diffDay, setDiffDay] = useState<any>(0);
  const [diffTime, setDiffTime] = useState<any>(0);
  const [avatarCount, setAvatarCount] = useState(0);
  const [rankingAvatars, setRankingAvatars] = useState<any>([]);

  const getAvatarCount = async () => {
    const { data: avatarCountData, error: avatarCountError } = await supabase
      .from("avatars")
      .select("*")
      .gte("created_at", "2023-11-03")
      .lte("created_at", "2023-11-13");

    setAvatarCount(avatarCountData!.length);
  };

  const getRankingAvatars = async () => {
    const { data: avatarsData, error: avatarsError } = await supabase
      .from("avatars")
      .select("*, likes (*)")
      .gte("created_at", "2023-11-03")
      .lte("created_at", "2023-11-13");

    if (avatarsData) {
      const sortedAvatars = avatarsData
        .sort((a: any, b: any) => {
          const timeA = a.likes.length > 0 ? a.likes[a.likes.length - 1].id : 0;
          const timeB = b.likes.length > 0 ? b.likes[b.likes.length - 1].id : 0;

          const diffLikeTime = timeB - timeA;

          return b.likes.length - a.likes.length || diffLikeTime;
        })
        .slice(0, 3);

      setRankingAvatars(sortedAvatars);
    }
  };

  useEffect(() => {
    var start = new Date();
    var end = new Date("2023-11-13 00:00:00");

    setDiffDay(
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    );
    setDiffTime(((end.getTime() - start.getTime()) / (1000 * 60 * 60)) % 24);

    getAvatarCount();
    getRankingAvatars();
  }, []);

  return (
    <div className="flex flex-col text-[14px] font-CoreGTD">
      <div className="relative flex justify-center w-full dt:h-[900px] ph:h-[684px] h-[824px] overflow-hidden">
        <Image
          src={background1Img}
          className="absolute object-cover w-full h-full z-[-10]"
          alt=""
        />
        <div className="flex ph:justify-start justify-center max-w-[1920px] w-full h-full">
          <div className="relative flex flex-col-reverse ph:items-stretch items-center justify-between max-w-[1724px] w-full h-full ph:mr-[60px] mr-0">
            <Image
              src={avatarImg}
              className="ph:absolute relative bottom-0 left-0 w-auto dt:h-auto ph:h-[617px] h-[322px]"
              quality={100}
              alt=""
            />
            <div className="ph:absolute relative top-[40px] right-0 flex flex-col items-center flex-shrink-0 dt:w-[679px] ph:w-[525px] w-[324px] space-y-[32px]">
              <Image
                src={titleImg}
                className="dt:w-[648px] ph:w-[437px] w-[316px]"
                quality={100}
                alt=""
              />
              <div className="flex justify-center items-center">
                <Image src={pinkLabelImg} className="w-full" alt="" />
                <p className="absolute dt:text-[40px] ph:text-[30px] text-[20px] text-[#FFFFFF] ">
                  11월 3일 ~ 11월 12일
                </p>
              </div>
              <p className="dt:text-[26px] ph:text-[24px] text-[16px] text-center text-[#FFFFFF] font-medium">
                당신의 디자인 능력을 뽐내보세요! 3D 아바타 대회에서 자신의
                아바타를 업로드하고, &apos;좋아요&apos;를 모아 순위를
                올려보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full dt:h-[390px] ph:h-[230px] bg-[#FFFFFF]">
        <div className="flex ph:flex-row flex-col justify-center items-center ph:py-0 py-[40px] dt:space-x-[64px] ph:space-x-[16px] space-x-0 ph:space-y-0 space-y-[32px]">
          <div className="flex flex-col justify-center items-center tb:w-[300px] w-[220px] h-[150px] space-y-[16px]">
            <p className="text-[18px] text-[#9D9D9D] font-semibold">기간</p>
            <p className="text-[24px] text-[#333333] font-semibold">
              11월 3일 ~ 11월 12일
            </p>
          </div>
          <div className="w-[8px] h-[8px] bg-[#333333] rounded-full" />
          <div className="flex flex-col justify-center items-center tb:w-[300px] w-[220px] h-[150px] space-y-[16px]">
            <p className="text-[18px] text-[#9D9D9D] font-semibold">마감까지</p>
            <p className="text-[24px] text-[#333333] font-semibold">
              {`${Math.floor(diffDay)}일 : ${Math.ceil(diffTime)}시간`}
            </p>
          </div>
          <div className="w-[8px] h-[8px] bg-[#333333] rounded-full" />
          <div className="flex flex-col justify-center items-center tb:w-[300px] w-[220px] h-[150px] space-y-[16px]">
            <p className="text-[18px] text-[#9D9D9D] font-semibold">아바타</p>
            <p className="text-[24px] text-[#333333] font-semibold">{`${avatarCount}개`}</p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <Image
          src={background2Img}
          className="relative object-cover w-full dt:h-[884px] tb:h-[665px] ph:h-[575px] h-[1474px]"
          alt=""
        />
        <div className="absolute flex flex-col justify-center items-center">
          <Image
            src={rewardTextImg}
            className="dt:w-[223px] ph:w-[192px] w-[161px]"
            alt=""
          />
          <div className="flex justify-center items-center mt-[32px] px-[48px] py-[12px] bg-[#FFFFFF60] rounded-[8px]">
            <p className="text-[16px] text-[#333333] font-CoreGTD">
              우승자에게는 특별한 보상이! 당신의 아바타가 최고가 될 수 있도록
              참여해보세요!
            </p>
          </div>
          <div className="flex ph:flex-row flex-col dt:mt-[105px] tb:mt-[75px] ph:mt-[68px] mt-[60px] dt:space-x-[120px] tb:space-x-[70px] ph:space-x-[60px] space-x-0 ph:space-y-0 space-y-[90px]">
            <div className="relative flex flex-col items-center">
              <div className="absolute dt:top-[-40px] tb:top-[-25px] ph:top-[-18px] top-[-25px] flex justify-center items-center w-max z-10">
                <Image
                  src={goldLabelImg}
                  className="dt:w-[419px] tb:w-[272px] ph:w-[200px] w-[281px]"
                  alt=""
                />
                <p className="absolute dt:top-[30px] tb:top-[17px] ph:top-[13px] top-[20px] dt:text-[30px] tb:text-[24px] ph:text-[18px] text-[20px] text-[#FFFFFF] font-GmarketSans event-font-shadow">
                  최우수상
                </p>
              </div>
              <Image
                src={goldPrizeImg}
                className="dt:w-[360px] tb:w-[234px] ph:w-[172px] w-[242px] rounded-full"
                alt=""
              />
              <p className="dt:mt-[40px] tb:mt-[32px] mt-[24px] dt:text-[30px] tb:text-[28px] ph:text-[24px] text-[26px] font-CoreGTDBold">
                BOOTH 아이템
              </p>
              <p className="mt-[8px] dt:text-[24px] tb:text-[22px] ph:text-[18px] text-[20px] text-[#9D9D9D]">
                {"(10만원 상당)"}
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute dt:top-[-40px] tb:top-[-25px] ph:top-[-18px] top-[-25px] flex justify-center items-center w-max z-10">
                <Image
                  src={silverLabelImg}
                  className="dt:w-[419px] tb:w-[272px] ph:w-[200px] w-[281px]"
                  alt=""
                />
                <p className="absolute dt:top-[30px] tb:top-[17px] ph:top-[13px] top-[20px] dt:text-[30px] tb:text-[24px] ph:text-[18px] text-[20px] text-[#FFFFFF] font-GmarketSans event-font-shadow">
                  우수상
                </p>
              </div>
              <Image
                src={silverPrizeImg}
                className="dt:w-[360px] tb:w-[234px] ph:w-[172px] w-[242px] rounded-full"
                alt=""
              />
              <p className="dt:mt-[40px] tb:mt-[32px] mt-[24px] dt:text-[30px] tb:text-[28px] ph:text-[24px] text-[26px] font-CoreGTDBold">
                BBQ
              </p>
              <p className="mt-[8px] dt:text-[24px] tb:text-[22px] ph:text-[18px] text-[20px] text-[#9D9D9D]">
                황금올리브치킨+콜라1.25L
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute dt:top-[-40px] tb:top-[-25px] ph:top-[-18px] top-[-25px] flex justify-center items-center w-max z-10">
                <Image
                  src={bronzeLabelImg}
                  className="dt:w-[419px] tb:w-[272px] ph:w-[200px] w-[281px]"
                  alt=""
                />
                <p className="absolute dt:top-[30px] tb:top-[17px] ph:top-[13px] top-[20px] dt:text-[30px] tb:text-[24px] ph:text-[18px] text-[20px] text-[#FFFFFF] font-GmarketSans event-font-shadow">
                  장려상
                </p>
              </div>
              <Image
                src={bronzePrizeImg}
                className="dt:w-[360px] tb:w-[234px] ph:w-[172px] w-[242px] rounded-full"
                alt=""
              />
              <p className="dt:mt-[40px] tb:mt-[32px] mt-[24px] dt:text-[30px] tb:text-[28px] ph:text-[24px] text-[26px] font-CoreGTDBold">
                스타벅스
              </p>
              <p className="mt-[8px] dt:text-[24px] tb:text-[22px] ph:text-[18px] text-[20px] text-[#9D9D9D]">
                아이스 카페 아메리카노 T
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center dt:space-y-[64px] ph:space-y-[45px] space-y-[38px] ph:px-[32px] px-[16px] dt:py-[80px] ph:py-[60px] py-[40px]">
        <Image
          src={eventTextImg}
          className="dt:w-[469px] ph:w-[389px] w-[309px]"
          alt=""
        />
        <div className="flex flex-col items-center w-full space-y-[32px]">
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                1
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              무피 사이트에 <span className="font-bold">회원가입</span>을
              합니다.
            </p>
          </div>
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                2
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              내비게이션 메뉴를 통해 <span className="font-bold">프로필</span>{" "}
              메뉴를 클릭합니다.
            </p>
          </div>
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                3
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              페이지 중앙의 <span className="font-bold">아바타 업로드</span>{" "}
              버튼을 클릭합니다.
            </p>
          </div>
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                4
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              양식에 맞추어 아바타 파일(<span className="font-bold">VRM</span>{" "}
              형식만 지원합니다!)을 업로드하고 설명을 작성합니다.
            </p>
          </div>
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                5
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              <span className="font-bold">저장하기</span> 버튼을 눌러 아바타를
              업로드합니다.
            </p>
          </div>
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                6
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              아바타 업로드가 마무리되기를 기다립니다. 업로드가 완료되면
              아바타가 게시됩니다.
            </p>
          </div>
          <div className="flex items-center max-w-[1200px] w-full p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex flex-shrink-0 justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                7
              </p>
            </div>
            <p className="dt:text-[20px] ph:text-[16px] text-[14px] font-SegoeUI">
              게시가 완료된 아바타를 공유하여{" "}
              <span className="font-bold">좋아요</span>를 모아보세요!
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center overflow-hidden">
        <Image
          src={background3Img}
          className="absolute object-cover w-full h-full z-[-10]"
          alt=""
        />
        <div className="flex flex-col justify-center items-center dt:my-[80px] ph:my-[60px] my-[40px]">
          <Image
            src={rankingTextImg}
            className="dt:w-[371px] ph:w-[310px] w-[250px]"
            alt=""
          />
          <div className="flex justify-center items-center ph:mt-[32px] mt-[24px] px-[48px] py-[12px] bg-[#FFFFFF60] rounded-[8px]">
            <p className="text-[16px] text-[#333333] font-CoreGTD">
              좋아요를 가장 많이 받은 아바타가 1등이 됩니다. 1등부터 3등까지의
              아바타는 특별한 보상을 받습니다.
            </p>
          </div>
          <div className="flex dt:flex-row flex-col mt-[75px] dt:space-x-[100px] space-x-0 dt:space-y-0 space-y-[129px]">
            {rankingAvatars.map((avatar: any, index: number) => {
              return (
                <RankingAvatar avatar={avatar} index={index} key={index} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center dt:py-[120px] ph:py-[64px] py-[40px] bg-[#313131] text-[#FFFFFF] font-SegoeUI">
        <div className="flex flex-col w-[1200px] space-y-[24px] ph:mx-[32px] mx-[23px]">
          <div className="text-[18px] text-left font-bold">이벤트 유의사항</div>
          <div className="flex flex-col space-y-[3px]">
            <p className="leading-[25px]">
              ㆍ이벤트 참여는 회원 가입이 완료된 사용자만 가능합니다.
            </p>
            <p className="leading-[25px]">
              ㆍ부적절한 내용의 아바타는 사전 통보 없이 삭제될 수 있습니다.
            </p>
            <p className="leading-[25px]">
              ㆍ이벤트의 일정 및 내용은 주최 측의 사정에 따라 변경될 수
              있습니다.
            </p>
            <p className="leading-[25px]">
              ㆍ이벤트에 참여함으로써 참가자는 이벤트의 모든 규칙을 이해하고
              동의한 것으로 간주됩니다.
            </p>
            <p className="leading-[25px]">
              ㆍ상품은 이벤트 종료 후 1주일 이내에 연락처를 통해 발송됩니다.
            </p>
            <p className="leading-[25px]">
              ㆍ부적절한 방법으로 이벤트에 참여한 경우 당첨이 취소될 수
              있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
