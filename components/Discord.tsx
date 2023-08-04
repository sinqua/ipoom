"use client";
import WidgetBot from "@widgetbot/react-embed";

export default function Discord() {
  return (
    <div className="grow flex flex-col justify-center items-center md:px-0 px-[16px] p-[16px] space-y-4">
      <a
        href="/6064c1dd-071b-42e4-92e4-d0989aed4ebc"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_self"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          둘러보기{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          무피에서 제작된 3D 콘텐츠를 구경해보세요.
        </p>
      </a>
      <WidgetBot
        server="1125351036740194336"
        channel="1125351038170443838"
        className="md:w-[1008px] w-full h-full"
      />
    </div>
  );
}
