// import VideoThumb from "@/public/images/hero-image.png";
import VideoThumb from "@/public/hi.png";
import ModalVideo from "@/components/landing-page/modal-video";

export default function Hero() {
  return (
    <section className="grow relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            {/* <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              버츄얼 캐릭터   
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                포트폴리오
              </span>
            </h1> */}
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide mb-4"
              data-aos="zoom-y-out"
            >
              {/* 포트폴리오를 만드는 이유는 뭘까? 커미션을 하고 돈을 얻기 위해서 */}
              {/* 캐릭터,포트폴리오,수익화 */}
              {/* 어디서나 간단히 게시하는 */}
              {/* 더욱 즐거운 버츄얼 작업 */}
              {/* 어디서나 편하게 게시하는 */}
              {/* 즐거운 창작과 가치 있는 만남 */}
              {/* 창작을 즐겁고 가치 있게  */}
              {/* 보상 받는 창작, 편리한  */}
              {/* 창작을 더욱 자신있게 */}
              {/* 새로운 창작에 대한 자신감 */}
              
              한 곳에서 편하게 공유하는
              {/* 어디서나 그대로 보여지는 */}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                {/* 한 곳에서 */}
                3D 캐릭터
                {/* 무피 */}
              </span>
            </h1>

            <div className="max-w-3xl mx-auto">

              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                {/* 무피의 3D 포트폴리오는 당신이 만든 캐릭터를 더 많은 사람에게 보여줍니다. 
                <br />
                어떤 기기에서도 자연스러운 레이아웃까지 제공합니다. */}

                당신이 만든 캐릭터가 더 많은 사람을 만나는 무피.
                <br />
                어떤 기기에서도 생동감 있고 자연스러운 캐릭터를 보여줍니다.
                
                {/* 무피는 창작자의 노력을 응원하며, 다양한 최신기술로 당신의
                아이디어와 창작을 더욱 가치 있게 만들어나가는 데 도움을
                드립니다. 지금 바로 창작의 세계로 떠나보세요! */}
                {/* 무피는 다양한 최신기술로 당신의 아이디어와 창작이 더 많은 사람을 만나도록 도와드립니다. */}
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <a
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                    href="/login"
                  >
                    시작하기
                  </a>
                </div>
                <div>
                  <a
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    href="/6064c1dd-071b-42e4-92e4-d0989aed4ebc"
                  >
                    둘러보기
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
