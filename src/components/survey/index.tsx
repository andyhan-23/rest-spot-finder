import { useState } from "react";
import { usePostSurvey } from "@/hooks";

const Survey = () => {
  const [email, setEmail] = useState<string>("");
  const [text, setText] = useState<string>("");

  const clickSurveyBtn = async () => {
    if (text.length != 0) {
      try {
        window.alert("의견 보내주셔서 감사합니다.");
        await usePostSurvey({ email, text });
      } catch (error) {
        window.alert("의견 제출에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setEmail("");
        setText("");
      }
    } else {
      window.alert("의견을 작성해주세요.");
    }
  };

  return (
    <div className="absolute bottom-0 left-0 box-border flex w-full flex-col bg-white p-4 shadow-md">
      <input
        type="email"
        placeholder="Email (선택)"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="m-2 cursor-pointer rounded border border-gray-200 p-2 text-sm"
      />
      <textarea
        placeholder="서비스를 사용하면서 불편한 점이나 개선 사항을 보내주세요. 이메일을 작성해주시면 수정 여부 및 적용 일자를 공유해드립니다."
        value={text}
        onChange={e => setText(e.target.value)}
        className="resize-vertical m-2 h-24 cursor-pointer rounded border border-gray-200 p-2 text-sm"
      ></textarea>
      <button
        onClick={clickSurveyBtn}
        className="mt-4 cursor-pointer rounded bg-blue-600 p-2 text-white hover:bg-blue-500"
      >
        보내기
      </button>
    </div>
  );
};

export default Survey;
