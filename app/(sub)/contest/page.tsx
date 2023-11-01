"use client";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
import redHeartImg from "@/app/assets/images/contest/red_heart.png";

import EventViewer from "@/components/modal/event-viewer";

export default function Page() {
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
              className="ph:absolute relative bottom-0 left-0 w-auto dt:h-auto ph:h-[617px] h-[322px] "
              alt=""
            />
            <div className="ph:absolute relative top-[40px] right-0 flex flex-col items-center flex-shrink-0 dt:w-[679px] ph:w-[525px] w-[324px] space-y-[32px]">
              <Image src={titleImg} className="dt:w-[648px] ph:w-[437px] w-[316px]" alt="" />
              <div className="flex justify-center items-center">
                <Image src={pinkLabelImg} className="w-full" alt="" />
                <p className="absolute dt:text-[40px] ph:text-[30px] text-[20px] text-[#FFFFFF] ">
                  10월 11일 ~ 10월 12일
                </p>
              </div>
              <p className="dt:text-[26px] ph:text-[24px] text-[16px] text-center text-[#FFFFFF] font-medium">
                For athletes, high altitude produces two contradictory effects
                on performance. For explosive events
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full dt:h-[390px] ph:h-[230px] bg-[#FFFFFF]">
        <div className="flex justify-center items-center dt:space-x-[64px] ph:space-x-[16px]">
          <div className="flex flex-col items-center w-[300px] space-y-[16px]">
            <p className="text-[18px] text-[#9D9D9D] font-semibold">기간</p>
            <p className="text-[24px] text-[#333333] font-semibold">
              10월 1일 ~ 11월 1일
            </p>
          </div>
          <div className="w-[8px] h-[8px] bg-[#333333] rounded-full" />
          <div className="flex flex-col items-center w-[300px] space-y-[16px]">
            <p className="text-[18px] text-[#9D9D9D] font-semibold">마감까지</p>
            <p className="text-[24px] text-[#333333] font-semibold">
              11일 : 9시간
            </p>
          </div>
          <div className="w-[8px] h-[8px] bg-[#333333] rounded-full" />
          <div className="flex flex-col items-center w-[300px] space-y-[16px]">
            <p className="text-[18px] text-[#9D9D9D] font-semibold">아바타</p>
            <p className="text-[24px] text-[#333333] font-semibold">158개</p>
          </div>
        </div>
      </div>
      {/* <div className="relative flex justify-center items-center">
        <Image
          src={background2Img}
          className="relative object-cover w-full max-h-[884px] aspect-[50/23]"
          alt=""
        />
        <div className="absolute flex flex-col justify-center items-center">
          <Image src={rewardTextImg} alt="" />
          <div className="flex justify-center items-center mt-[32px] px-[48px] py-[12px] bg-[#FFFFFF60] rounded-[8px]">
            <p className="text-[16px] text-[#333333] font-CoreGTD">
              콘테스트에 참여해서 성적내면 받아갈수 있다고 아 ㅋㅋㅋ
            </p>
          </div>
          <div className="flex mt-[105px] space-x-[60px]">
            <div className="relative flex flex-col items-center">
              <div className="absolute top-[-40px] flex justify-center items-center z-10">
                <Image src={goldLabelImg} alt="" />
                <p className="absolute top-[25px] text-[30px] text-[#FFFFFF] font-GmarketSans event-font-shadow">
                  최우수상
                </p>
              </div>
              <Image
                src={goldPrizeImg}
                className="w-[360px] h-[360px] rounded-full"
                alt=""
              />
              <p className="mt-[40px] text-[30px] font-CoreGTDBold">
                BOOTH 아이템
              </p>
              <p className="mt-[8px] text-[24px] text-[#9D9D9D]">
                {"(10만원 상당)"}
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute top-[-40px] flex justify-center items-center z-10">
                <Image src={silverLabelImg} alt="" />
                <p className="absolute top-[25px] text-[30px] text-[#FFFFFF] font-GmarketSans event-font-shadow">
                  우수상
                </p>
              </div>
              <Image
                src={silverPrizeImg}
                className="w-[360px] h-[360px] rounded-full"
                alt=""
              />
              <p className="mt-[40px] text-[30px] font-CoreGTDBold">BBQ</p>
              <p className="mt-[8px] text-[24px] text-[#9D9D9D]">
                황금올리브치킨+콜라1.25L
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="absolute top-[-40px] flex justify-center items-center z-10">
                <Image src={bronzeLabelImg} alt="" />
                <p className="absolute top-[25px] text-[30px] text-[#FFFFFF] font-GmarketSans event-font-shadow">
                  장려상
                </p>
              </div>
              <Image
                src={bronzePrizeImg}
                className="w-[360px] h-[360px] rounded-full"
                alt=""
              />
              <p className="mt-[40px] text-[30px] font-CoreGTDBold">스타벅스</p>
              <p className="mt-[8px] text-[24px] text-[#9D9D9D]">
                아이스 카페 아메리카노 T
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-[64px] py-[80px]">
        <Image src={eventTextImg} alt="" />
        <div className="flex flex-col space-y-[32px]">
          <div className="flex items-center w-[1200px] p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                1
              </p>
            </div>
            <p className="text-[20px] font-SegoeUI">
              For athletes, high altitude produces two contradictory effects on
              performance. For explosive events
            </p>
          </div>
          <div className="flex items-center w-[1200px] p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                2
              </p>
            </div>
            <p className="text-[20px] font-SegoeUI">
              In the eighteenth century the German philosopher Immanuel Kant
              developed a theory of knowledge in wh
            </p>
          </div>
          <div className="flex items-center w-[1200px] p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                3
              </p>
            </div>
            <p className="text-[20px] font-SegoeUI">
              Physical space is often conceived in three linear dimensions,
              although modern physicists usually con
            </p>
          </div>
          <div className="flex items-center w-[1200px] p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                4
              </p>
            </div>
            <p className="text-[20px] font-SegoeUI">
              The long barrow was built on land previously inhabited in the
              Mesolithic period. It consisted of a s
            </p>
          </div>
          <div className="flex items-center w-[1200px] p-[24px] space-x-[16px] bg-[#FFFFFF] rounded-[20px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)]">
            <div className="flex justify-center items-center">
              <Image src={blueHeartImg} alt="" />
              <p className="absolute translate-y-[-2px] text-[20px] text-[#FFFFFF] font-SegoeUIBold">
                5
              </p>
            </div>
            <p className="text-[20px] font-SegoeUI">
              Physiological respiration involves the mechanisms that ensure that
              the composition of the functional
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
        <div className="flex flex-col justify-center items-center my-[80px]">
          <Image src={rankingTextImg} alt="" />
          <div className="flex justify-center items-center mt-[32px] px-[48px] py-[12px] bg-[#FFFFFF60] rounded-[8px]">
            <p className="text-[16px] text-[#333333] font-CoreGTD">
              님들 화력 이거밖에 안됨?
            </p>
          </div>
          <div className="flex mt-[75px] space-x-[100px]">
            <div className="flex flex-col">
              <div className="relative flex justify-center">
                <Image
                  src={redHeartImg}
                  className="absolute top-[-8px]"
                  alt=""
                />
                <div className="flex justify-center items-center w-[209px] py-[10px] bg-[#FFFFFF] rounded-[200px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)] text-[24px] font-SegoeUI font-semibold">
                  {Number(33324).toLocaleString()}
                </div>
              </div>
              <div className="relative flex flex-col items-center w-[340px] h-[425px] my-[20px]">
                <EventViewer
                  modelUrl={"./hero.vrm"}
                  animation={"Idle"}
                  toolbarCss={"hidden"}
                />
              </div>
              <div className="relative flex items-center w-[340px] h-[64px]">
                <div className="absolute top-[23.5px] left-[2.5px] w-[58px] h-[36px] bg-[#C0A74B] rounded-[8px] rotate-[22.521deg]" />
                <div className="absolute right-0 flex justify-center items-center w-[311px] h-[64px] py-[bg-[#FFFFFF] bg-[#FFFFFF] rounded-[8px] shadow-[5px_5px_0px_rgba(84,87,167,1)] text-[24px] font-SegoeUI font-semibold z-10">
                  헤이즈
                </div>
                <div className="flex justify-center items-center w-[58px] h-[36px] bg-[#EDCB51] rounded-[8px] text-[20px] text-[#FFFFFF] font-SegoeUI font-semibold z-10">
                  1
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative flex justify-center">
                <Image
                  src={redHeartImg}
                  className="absolute top-[-8px]"
                  alt=""
                />
                <div className="flex justify-center items-center w-[209px] py-[10px] bg-[#FFFFFF] rounded-[200px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)] text-[24px] font-SegoeUI font-semibold">
                  {Number(1058).toLocaleString()}
                </div>
              </div>
              <div className="relative flex flex-col items-center w-[340px] h-[425px] my-[20px]">
                <EventViewer
                  modelUrl={"./hero.vrm"}
                  animation={"Idle"}
                  toolbarCss={"hidden"}
                />
              </div>
              <div className="relative flex items-center w-[340px] h-[64px]">
                <div className="absolute top-[23.5px] left-[2.5px] w-[58px] h-[36px] bg-[#808080] rounded-[8px] rotate-[22.521deg]" />
                <div className="absolute right-0 flex justify-center items-center w-[311px] h-[64px] py-[bg-[#FFFFFF] bg-[#FFFFFF] rounded-[8px] shadow-[5px_5px_0px_rgba(84,87,167,1)] text-[24px] font-SegoeUI font-semibold z-10">
                  미미짱짱세용
                </div>
                <div className="flex justify-center items-center w-[58px] h-[36px] bg-[#BDBDBD] rounded-[8px] text-[20px] text-[#FFFFFF] font-SegoeUI font-semibold z-10">
                  2
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative flex justify-center">
                <Image
                  src={redHeartImg}
                  className="absolute top-[-8px]"
                  alt=""
                />
                <div className="flex justify-center items-center w-[209px] py-[10px] bg-[#FFFFFF] rounded-[200px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)] text-[24px] font-SegoeUI font-semibold">
                  {Number(120).toLocaleString()}
                </div>
              </div>
              <div className="relative flex flex-col items-center w-[340px] h-[425px] my-[20px]">
                <EventViewer
                  modelUrl={"./hero.vrm"}
                  animation={"Idle"}
                  toolbarCss={"hidden"}
                />
              </div>
              <div className="relative flex items-center w-[340px] h-[64px]">
                <div className="absolute top-[23.5px] left-[2.5px] w-[58px] h-[36px] bg-[#9D6027] rounded-[8px] rotate-[22.521deg]" />
                <div className="absolute right-0 flex justify-center items-center w-[311px] h-[64px] py-[bg-[#FFFFFF] bg-[#FFFFFF] rounded-[8px] shadow-[5px_5px_0px_rgba(84,87,167,1)] text-[24px] font-SegoeUI font-semibold z-10">
                  혜진게이
                </div>
                <div className="flex justify-center items-center w-[58px] h-[36px] bg-[#C77D38] rounded-[8px] text-[20px] text-[#FFFFFF] font-SegoeUI font-semibold z-10">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-[120px] bg-[#313131] text-[#FFFFFF] font-SegoeUI">
        <div className="flex flex-col w-[1200px] space-y-[24px]">
          <div className="text-[18px] text-left font-bold">이벤트 유의사항</div>
          <div className="flex flex-col space-y-[3px]">
            <p className="leading-[25px]">
              ㆍPhysiological respiration involves the mechanisms that ensure
              that the composition of the functional
            </p>
            <p className="leading-[25px]">
              ㆍMaxwell's equations—the foundation of classical
              electromagnetism—describe light as a wave that moves
            </p>
            <p className="leading-[25px]">
              ㆍPhysical space is often conceived in three linear dimensions,
              although modern physicists usually con
            </p>
            <p className="leading-[25px]">
              ㆍThe long barrow was built on land previously inhabited in the
              Mesolithic period. It consisted of a s
            </p>
            <p className="leading-[25px]">
              ㆍFor athletes, high altitude produces two contradictory effects
              on performance. For explosive events
            </p>
            <p className="leading-[25px]">
              ㆍIn the eighteenth century the German philosopher Immanuel Kant
              developed a theory of knowledge in wh
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
