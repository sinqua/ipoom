"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import menuImg from "@/app/assets/images/menu.svg";
import moopiLogo from "@/app/assets/logos/moopi.svg";

export default function MobileNavbar({
  children,
}: {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="dt:relative fixed top-[12px] left-[16px] dt:hidden flex justify-center items-center w-[40px] h-[40px] rounded-full z-10"
      >
        <Image src={menuImg} className="w-[20px] h-[20px]" alt="" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed inset-0 flex h-[100dvh] w-[280px] flex-col bg-white dark:bg-black">
              <div className="flex flex-col w-[280px] h-full bg-white border-r-[1px] border-[#D4D4D4] z-20 text-[#333333]">
                <div className="px-[32px] py-[24px]">
                  <Link href="/" title="Go to homepage">
                    <Image
                      src={moopiLogo}
                      className="w-auto ph:h-[40px] h-[30px]"
                      alt=""
                      priority
                    />
                  </Link>
                </div>
                {children[0]}
                {children[1]}
                {children[2]}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
