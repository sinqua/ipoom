import Carousel from "@/components/carousel";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `무피 - 개인정보처리방침`,
    openGraph: {
      title: `무피 - 개인정보처리방침`,
      description: `무피 개인정보처리방침 페이지입니다.`,
    },
  };
}

export default function Page() {
  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Carousel />
      <div className="relative flex justify-center w-full ph:h-[80px] h-[65px]">
        <div className="dt:relative fixed top-0 flex justify-center items-center w-full ph:h-[80px] h-[65px] bg-[#FFFFFF] border-b-[1px] border-[#D4D4D4]">
          <p className="ph:text-[24px] text-[20px] font-semibold">
            개인정보처리방침
          </p>
        </div>
      </div>
      <div className="flex justify-center py-[40px] pb-[80px]">
        <div className="flex flex-col dt:max-w-[1008px] w-full dt:px-0 px-[16px] space-y-[32px]">
          <p className="ph:text-[24px] text-[20px] font-semibold">
            개인정보처리방침
          </p>
          <div className="flex flex-col space-y-[40px]">
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">{`제1조(목적)`}</p>
              <p className="leading-[25px]">
                {`Offing(이하 '회사'라고 함)은 회사가 제공하고자 하는 서비스(이하
                '회사 서비스')를 이용하는 개인(이하 '이용자' 또는 '개인')의
                정보(이하 '개인정보')를 보호하기 위해, 개인정보보호법,
                정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하
                '정보통신망법')등 관련 법령을 준수하고, 서비스 이용자의 개인정보
                보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기
                위하여 다음과 같이 개인정보처리방침(이하 '본 방침')을
                수립합니다.`}
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제2조(개인정보 처리의 원칙)`}
              </p>
              <p className="leading-[25px]">
                {`개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를
                수집할 수 있으며, 수집된 개인정보는 개인의 동의가 있는 경우에
                한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해
                적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에
                개인의 동의 없이 제 3자에게 제공할 수도 있습니다.`}
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">{`제3조(본 방침의 공개)`}</p>
              <ol className="list-decimal pl-[35px] leading-[25px]">
                <li className="text-[14px] ">
                  {`회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사
                  홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을
                  공개하고 있습니다.`}
                </li>
                <li className="text-[14px]">
                  {`회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상
                  등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">{`제4조(본 방침의 변경)`}</p>
              <ol className="list-decimal pl-[35px] leading-[25px]">
                <li className="text-[14px] ">
                  {`회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나
                  이상의 방법으로 공지합니다.`}
                </li>
                <li className="text-[14px]">
                  {`회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상
                  등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.`}
                  <ol className="pl-[8px]">
                    <li className="text-[14px]">
                      {`가. 회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란
                      또는 별도의 창을 통하여 공지하는 방법`}
                    </li>
                    <li className="text-[14px]">
                      {`나. 서면·모사전송·전자우편 또는 이와 비슷한 방법으로
                      이용자에게 공지하는 방법`}
                    </li>
                  </ol>
                </li>
                <li className="text-[14px]">
                  {`회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일
                  이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을
                  경우에는 최소 30일 전에 공지합니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제5조(회원 가입을 위한 정보)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과 같은
                정보를 수집합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">
                    {`회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록
                    회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본
                    방침을 공개하고 있습니다.`}
                  </li>
                  <li className="text-[14px]">
                    {`회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상
                    등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록
                    합니다.`}
                  </li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제6조(본인 인증을 위한 정보)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 이용자의 본인인증을 위하여 다음과 같은 정보를 수집합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">{`필수 수집 정보: 이메일 주소`}</li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제7조(회사 서비스 제공을 위한 정보)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은
                정보를 수집합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">
                    {`필수 수집 정보: 아이디 및 이메일 주소`}
                  </li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제8조(서비스 이용 및 부정 이용 확인을 위한 정보)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 이용자의 서비스 이용 및 부정이용의 확인 및 분석을 위하여
                다음과 같은 정보를 수집합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">
                    {`필수 수집 정보: 서비스 이용기록, 쿠키, 접속지 정보 및
                    기기정보`}
                  </li>
                </ol>
                {`※ 부정이용 : 회원탈퇴 후 재가입, 상품구매 후 구매취소 등을
                반복적으로 행하는 등 회사가 제공하는 할인쿠폰, 이벤트 혜택 등의
                경제상 이익을 불·편법행위 등을 말합니다. 수집되는 정보는 회사
                서비스 이용에 따른 통계·분석에 이용될 수 있습니다.`}
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제9조(개인정보 수집 방법)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">
                    {`어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해
                    이용자가 자신의 개인정보를 입력하는 방식`}
                  </li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제10조(개인정보의 이용)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 개인정보를 다음 각 호의 경우에 이용합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">
                    {`공지사항의 전달 등 회사의 운영에 필요한 경우`}
                  </li>
                  <li className="text-[14px] ">
                    {`이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스
                    개선을 위한 경우`}
                  </li>
                  <li className="text-[14px] ">
                    {`회사의 서비스를 제공하기 위한 경우`}
                  </li>
                  <li className="text-[14px] ">{`신규 서비스 개발을 위한 경우`}</li>
                  <li className="text-[14px] ">
                    {`이벤트 및 행사 안내 등 마케팅을 위한 경우`}
                  </li>
                  <li className="text-[14px] ">
                    {`인구통계학적 분석, 서비스 방문 및 이용기록의 분석을 위한
                    경우`}
                  </li>
                  <li className="text-[14px] ">
                    {`개인정보 및 관심에 기반한 이용자간 관계의 형성을 위한 경우`}
                  </li>
                  <li className="text-[14px] ">
                    {`법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치,
                    부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는
                    행위에 대한 방지 및 제재를 위한 경우`}
                  </li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제11조(개인정보의 보유 및 이용기간)`}
              </p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px] ">
                  {`회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적이
                  달성을 위한 기간 동안 개인정보를 보유 및 이용합니다.`}
                </li>
                <li className="text-[14px] ">
                  {`전항에도 불구하고 회사는 내부 방침에 의해 서비스
                  부정이용기록은 부정 강입 및 이용 방지를 위하여 회원 탈퇴
                  시점으로부터 최대 1년간 보관합니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제12조(법령에 따른 개인정보의 보유 및 이용기간)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 관계볍령에 따라 다음과 같이 개인정보를 보유 및
                이용합니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px]">
                    {`전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유정보
                    및 보유기간`}
                    <ol className="pl-[8px]">
                      <li className="text-[14px]">
                        {`가. 계약 또는 청약철회 등에 관한 기록 : 5년`}
                      </li>
                      <li className="text-[14px]">
                        {`나. 대금결제 및 재화 등의 공급에 관한 기록 : 5년`}
                      </li>
                      <li className="text-[14px]">
                        {`다. 소비자의 불만 또는 분쟁처리에 관한 기록 : 5년`}
                      </li>
                      <li className="text-[14px]">
                        {`라. 표시·광고에 관한 기록 : 6개월`}
                      </li>
                    </ol>
                  </li>
                  <li className="text-[14px]">
                    {`통신비밀보호법에 따른 보유정보 및 보유기간`}
                    <ol className="pl-[8px]">
                      <li className="text-[14px]">
                        {`가. 웹사이트 로그 기록 자료 : 3개월`}
                      </li>
                    </ol>
                  </li>
                  <li className="text-[14px]">
                    {`전자금융거래법에 따른 보유정보 및 보유기간`}
                    <ol className="pl-[8px]">
                      <li className="text-[14px]">
                        {`가. 전자금융거래에 관한 기록 : 5년`}
                      </li>
                    </ol>
                  </li>
                  <li className="text-[14px]">
                    {`위치정보의 보호 및 이용 등에 관한 법률`}
                    <ol className="pl-[8px]">
                      <li className="text-[14px]">
                        {`가. 개인위치정보에 관한 기록 : 6개월`}
                      </li>
                    </ol>
                  </li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제13조(개인정보의 파기원칙)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성,
                보유·이용기간의 경과 등 개인정보가 필요하지 않을 경우에는 해당
                정보를 지체 없이 파기합니다.`}
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제14조(서비스 미이용자에 대한 개인정보처리)`}
              </p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px] ">
                  {`회사는 1년 동안 회사의 서비스를 이용하지 않은 이용자의
                  개인정보는 원칙적으로 이용자에게 사전통지하고 개인정보를
                  파기하거나 별도로 분리하여 저장합니다.`}
                </li>
                <li className="text-[14px] ">
                  {`회사는 장기 미이용 이용자의 개인정보는 별도로 분리되어
                  안전하게 보관하게 되며, 해당 이용자의 통지는 분리 보관 처리
                  일을 기준으로 최소 30일 이전에 전자우편주소로 전송됩니다.`}
                </li>
                <li className="text-[14px] ">
                  {`장기 미이용 이용자는 회사가 미이용자 DB를 별도로 분리하기 전에
                  계속 서비스를 이용하고자 하는 경우 웹사이트(이하 '모바일앱'
                  포함)에 로그인하시면 됩니다.`}
                </li>
                <li className="text-[14px] ">
                  {`장기 미이용 이용자는 웹사이트에 로그인할 경우 이용자의 동의에
                  따라 본인의 계정을 복원할 수 있습니다.`}
                </li>
                <li className="text-[14px] ">
                  {`회사는 분리 보관된 개인정보를 4년간 보관 후 지쳉없이
                  파기합니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제15조(개인정보파기절차)`}
              </p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px] ">
                  {`이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이
                  달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부
                  방침 및 기타 관련 법령에 의한 정보 보호 사유에 따라(보유 및
                  이용기간 참조) 일정 기간 저장된 후 파기 되어집니다.`}
                </li>
                <li className="text-[14px] ">
                  {`회사는 파기 사유가 발생한 개인정보를 개인정보보호 책임자의
                  승인절차를 거쳐 파기합니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제16조(개인정보파기방법)`}
              </p>
              <p className="leading-[25px]">
                {`회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는
                기술적 방법을 사용하여 삭제하며, 종이로 출력된 개인정보는
                분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.`}
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제17조(광고성 정보의 전송 조치)`}
              </p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px]">
                  {`회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를
                  전송하는 경우 이용자의 명시적인 사전동의를 받습니다. 다만,
                  다음 각호 어느 하나에 해당하는 경우에는 사전 동의를 받지
                  않습니다.`}
                  <ol className="pl-[8px]">
                    <li className="text-[14px]">
                      {`가. 회사가 재화 등의 거래관계를 통하여 수신자로부터 직접
                      연락처를 수집한 경우, 거래가 종료된 날로부터 6개월 이내에
                      회사가 처리하고 수신자와 거래한 것과 동종의 재화 등에
                      영리목적의 광고성 정보를 전송하려는 경우`}
                    </li>
                    <li className="text-[14px]">
                      {`나. 「방문판매 등에 관한 법률」 에 따른 전화권유판매자가
                      육성으로 수신자에게 개인정보의 수집출처를 고지하고
                      전화권유를 하는 경우`}
                    </li>
                  </ol>
                </li>
                <li className="text-[14px]">
                  {`회사는 전항에도 불구하고 수신자가 수신거붕의사를 표시하거나
                  사전 동의를 철회한 경우에는 영리목적의 광고성 정보를 전송하지
                  않으며 수신거부 및 수신동의 철회에 대한 처리 결과를 알립니다.`}
                </li>
                <li className="text-[14px]">
                  {`회사는 오후 9시부터 그다음 날 오전 8시까지의 시간에 전자적
                  전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우에는
                  제1항에도 불구하고 그 수신자로부터 별도의 사전 동의를
                  받습니다.`}
                </li>
                <li className="text-[14px]">
                  {`회사는 전자적 전송매체를 이용하여 영림목적의 광고성 정보를
                  전송하는 경우 다음의 사항 등을 광고성 정보에 구체적으로
                  밝힙니다.`}
                  <ol className="pl-[8px]">
                    <li className="text-[14px]">{`가. 회사명 및 연락처`}</li>
                    <li className="text-[14px]">
                      {`나. 수신 거부 또는 수신 동의의 철회 의사표시에 관한 사항의
                      표시`}
                    </li>
                  </ol>
                </li>
                <li className="text-[14px]">
                  {`회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를
                  전송하는 경우 다음 각 호의 어느 하나에 해당하는 조치를 하지
                  않습니다.`}
                  <ol className="pl-[8px]">
                    <li className="text-[14px]">
                      {`가. 광고성 정보 수신자의 수신거부 또는 수신동의의 철회를
                      회피·방해하는 조치`}
                    </li>
                    <li className="text-[14px]">
                      {`나. 숫자·부호 또는 문자를 조합하여 전화번호·전자우편주소
                      등 수신자의 연락처를 자동으로 만들어 내는 조치`}
                    </li>
                    <li className="text-[14px]">
                      {`다. 영리목적의 광고성 정보를 전송할 목적으로 전화번호 또는
                      전자우편주소를 자동으로 등록하는 조치`}
                    </li>
                    <li className="text-[14px]">
                      {`라. 광고성 정보 전송자의 신원이나 광고 전송 출처를 감추기
                      위한 각종 조치`}
                    </li>
                    <li className="text-[14px]">
                      {`마. 영리목적의 광고성 정보를 전송할 목적으로 수신자를
                      기망하여 회신을 유도하는 각종 조치`}
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">{`제18조(이용자의 의무)`}</p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px] ">
                  {`이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며,
                  이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자
                  자신에게 있습니다.`}
                </li>
                <li className="text-[14px] ">
                  {`타인의 개인정보를 도용한 회원가입의 경우 이용자 자격을
                  상실하거나 관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.`}
                </li>
                <li className="text-[14px] ">
                  {`이용자는 전자우편주소, 비빌번호 등에 대한 보안을 유지할 책임이
                  있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제19조(이용장의 쿠키 설치 선택권)`}
              </p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px] ">
                  {`이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서
                  이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를
                  허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든
                  쿠키의 저장을 거부할 수도 있습니다.`}
                </li>
                <li className="text-[14px] ">
                  {`다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 회사의
                  일부 서비스는 이용에 어려움이 있을 수 있습니다.`}
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제20조(쿠키 설치 허용 지정 방법)`}
              </p>
              <p className="leading-[25px]">
                {`쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의 경우)은
                다음과 같습니다.`}
                <ol className="list-decimal pl-[35px]">
                  <li className="text-[14px] ">
                    {`[도구] 메뉴에서 [인터넷 옵션]을 클릭합니다,`}
                  </li>
                  <li className="text-[14px] ">{`[개인정보 탭]을 클릭합니다.`}</li>
                  <li className="text-[14px] ">
                    {`[고급] 설정에서 설정하시면 됩니다.`}
                  </li>
                </ol>
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">
                {`제21조(회사의 개인정보 보호 책임자 지정)`}
              </p>
              <ol className="list-decimal leading-[25px] pl-[35px]">
                <li className="text-[14px] ">
                  {`회사는 이용자의 개인정보를 보호하고 갱인정보와 관련한 불만을
                  처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호
                  책임자를 지정하고 있습니다.`}
                  <ol className="pl-[8px]">
                    <li className="text-[14px]">
                      {`가. 개인정보 보호 책임자`}
                      <ol className="pl-[8px]">
                        <li className="text-[14px]">{`1) 성명: 고병국`}</li>
                        <li className="text-[14px]">
                          {`2) 전화번호: 010-4114-9352`}
                        </li>
                        <li className="text-[14px]">
                          {`3) 이메일: bkgo@offing.me`}
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[18px] font-semibold">{`부칙`}</p>
              <p className="leading-[25px">
                {`제1조 본 방침은 2023.09.23부터 시행됩니다.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
