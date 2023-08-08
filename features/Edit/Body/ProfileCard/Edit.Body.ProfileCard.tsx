import Card from "@/features/Edit/Body/Card/Edit.Body.Card";
import CardHeader from "@/features/Edit/Body/Card/Edit.Body.Card.Header";
import CardBody from "@/features/Edit/Body/Card/Edit.Body.Card.Body";
import Thumbnail from "@/features/Edit/Body/ProfileCard/Edit.Body.ProfileCard.Thumbnail";
import Nickname from "@/features/Edit/Body/ProfileCard/Edit.Body.ProfileCard.Nickname";
import Kakao from "@/features/Edit/Body/ProfileCard/Edit.Body.ProfileCard.Kakao";
import Toss from "@/features/Edit/Body/ProfileCard/Edit.Body.ProfileCard.Toss";
import Tag from "@/features/Edit/Body/ProfileCard/Edit.Body.ProfileCard.Tag";

export default function ProfileCard() {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"프로필 사진"}>
            최소 200 x 200 크기의 JPEG 또는 PNG 파일을 사용해주세요.
            <br />
            타인에게 불쾌감을 주는 프로필 사진은 고객지원센터에서 임의로 변경할
            수 있습니다.
          </CardHeader>
          <CardBody>
            <Thumbnail />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title={"닉네임"}>
            타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수
            있습니다.
            <br />
            닉네임 변경은 2달에 1회 진행할 수 있습니다.
          </CardHeader>
          <CardBody>
            <Nickname />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title={"오픈카톡 링크"}>
            사용중인 오픈카톡 전체 링크를 입력해주세요.
            <br />
            {"예시) https://open.kakao.com/o/s7l8njtf"}
          </CardHeader>
          <CardBody>
            <Kakao />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title={"토스아이디 링크"}>
            사용중인 토스 익명송금 전체 링크를 입력해주세요.
            <br />
            {"예시) https://toss.me/istick"}
          </CardHeader>
          <CardBody>
            <Toss />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title={"태그"}>
            한 눈에 알아보기 쉽도록 태그를 추가해보아요. (최대 5개)
          </CardHeader>
          <CardBody>
            <Tag />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
