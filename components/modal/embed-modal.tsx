"use client";
import Image from "next/image";
import ModalCanvas from "@/components/modal/embed-modal-canvas";
import Background from "@/components/modal/background";
import { formatFullDate } from "@/lib/string";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";

export default function EmbedAvatarModal({
  avatar,
  modelUrl,
}: {
  avatar: any;
  modelUrl: any;
}) {
  return (
    <ModalCanvas modelUrl={modelUrl?.signedUrl} animation={avatar.animation} />
  );
}
