"use client";
import { useState } from "react";


import Image from "next/image";
import Navbar from "@/components/basic-layout/Navbar";
import Header from "@/components/basic-layout/Header";
import Footer from "@/components/basic-layout/Footer";
import dynamic from "next/dynamic";

const Discord = dynamic(() => import("@/components/Discord"), { ssr: false });

export default function Home() {
  const [isActiveNavbar, setIsActiveNavbar] = useState(false);

  return (
    <div className="relative flex h-full min-h-full">
      <Navbar isActiveNavbar={isActiveNavbar} setIsActiveNavbar={setIsActiveNavbar} />
      <div className="relative flex flex-col grow h-auto min-h-full">
        <Header isActiveNavbar={isActiveNavbar} setIsActiveNavbar={setIsActiveNavbar} />
          {/* <div className="grow flex justify-center items-center md:px-0 px-[16px] py-[200px]">

            <WidgetBot server="1125351036740194336" channel="1125351038170443838" className="md:w-[1008px] w-full h-full"/>

          </div> */}
          <Discord />
        {/* <Footer /> */}
      </div>
    </div>


    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
    //   <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       무피는&nbsp;
    //       <code className="font-mono font-bold">3D 컨텐츠&nbsp;</code>
    //       중심의 크리에이터 플랫폼입니다.
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_self"
    //         rel="noopener noreferrer"
    //       >
    //         By{" "}
    //         <Image
    //           src={offingLogo}
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>
    //   <WidgetBot server="1125351036740194336" channel="1125351038170443838" className="w-full h-[650px]"/>
      
    //   {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src={moopiLogo}
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div> */}
      

    //   <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="/6064c1dd-071b-42e4-92e4-d0989aed4ebc"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_self"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         둘러보기{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         무피에서 제작된 3D 콘텐츠를 구경해보세요.
    //       </p>
    //     </a>
    //     <a
    //       href="/login"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_self"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         시작하기{" "}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         소셜 네트워크 계정으로 서비스를 시작하세요.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  );
}
