/**version 2*9*/
// 얼리 농장주 등록 Dialog — Figma Dialog얼리농장주등록-1 기반
// 전화번호 입력 시 등록하기 버튼 활성화 (체크박스 필수 아님)
import { useState } from "react";

type Props = {
  onClose: () => void;
  onComplete: () => void;
};

/* 추가된 부분 */
export default function EarlyRegistrationDialog({ onClose, onComplete }: Props) {
  const [phone, setPhone]       = useState("");
  const [required, setRequired] = useState(false);
  const [optional, setOptional] = useState(false);

  const digits = phone.replace(/\D/g, "");
  // 전화번호가 9자리 이상이면 버튼 활성화
  const canSubmit = digits.length >= 9;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, "").slice(0, 11));
  };

  return (
    /* 추가된 부분 */
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[360px] rounded-t-[20px] sm:rounded-[16px] overflow-hidden shadow-2xl"
        style={{ background: "#faf5eb", border: "2px solid #cdb792" }}
      >
        {/* 헤더 */}
        <div className="relative px-6 pt-6 pb-4 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#8f7755] text-[18px]"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
          <h2
            className="text-[#32322d] text-[18px] tracking-[0.9px] leading-[1.4]"
            style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}
          >
            얼리 농장주 등록
          </h2>
          <p
            className="text-[#6a6a61] text-[10px] tracking-[0.4px] mt-2 leading-[1.6]"
            style={{ fontFamily: "Elice DX Neolli", fontWeight: 300 }}
          >
            앱이 출시되면 문자로 알려드려요<br />
            사전예약자에게는 특별한 보상을 드려요!
          </p>
        </div>

        {/* 전화번호 */}
        <div className="px-6 pb-4">
          <label
            className="block text-[#32322d] text-[11px] tracking-[0.5px] mb-2"
            style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}
          >
            전화번호
          </label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="010-0000-0000"
            className="w-full h-[48px] rounded-[8px] border px-4 text-[14px] tracking-[0.5px] text-[#32322d] placeholder:text-[#cdb792] focus:outline-none focus:border-[#628d38]"
            style={{
              fontFamily: "Elice DX Neolli",
              fontWeight: 300,
              borderColor: "#cdb792",
              background: "white",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        {/* 체크박스 */}
        <div className="px-6 pb-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRequired(!required)}>
            <div
              className="w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors"
              style={{ borderColor: required ? "#628d38" : "#cdb792", background: required ? "#628d38" : "white" }}
            >
              {required && <span className="text-white text-[12px] leading-none">✓</span>}
            </div>
            <span className="text-[#45372a] text-[10px] tracking-[0.4px] flex-1"
              style={{ fontFamily: "Elice DX Neolli", fontWeight: 300 }}>
              <span className="text-[#628d38]">[필수]</span> 개인정보 수집 및 이용 동의
            </span>
            <span className="text-[#628d38] text-[10px] shrink-0"
              style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>보기</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOptional(!optional)}>
            <div
              className="w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors"
              style={{ borderColor: optional ? "#628d38" : "#cdb792", background: optional ? "#628d38" : "white" }}
            >
              {optional && <span className="text-white text-[12px] leading-none">✓</span>}
            </div>
            <span className="text-[#a4a499] text-[10px] tracking-[0.4px] flex-1"
              style={{ fontFamily: "Elice DX Neolli", fontWeight: 300 }}>
              <span>[선택]</span> 이벤트/혜택알림 수신 동의
            </span>
            <span className="text-[#628d38] text-[10px] shrink-0"
              style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>보기</span>
          </div>

          <p className="text-[#a4a499] text-[9px] tracking-[0.3px] leading-[1.4]"
            style={{ fontFamily: "Elice DX Neolli", fontWeight: 300 }}>
            사전예약 보상은 알림 수신 동의를 진행해야만 제공이 가능합니다
          </p>
        </div>

        {/* 등록하기 버튼 — 전화번호 입력 시 활성화 */}
        <div className="px-6 pb-6">
          <button
            onClick={canSubmit ? onComplete : undefined}
            className="w-full h-[52px] rounded-[12px] flex items-center justify-center gap-2 transition-all"
            style={{
              background: canSubmit ? "#628d38" : "#cdb792",
              cursor: canSubmit ? "pointer" : "not-allowed",
              border: "none",
            }}
          >
            <span className="text-white text-[16px] tracking-[1.6px]"
              style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>
              등록하기
            </span>
            <span>🐾</span>
          </button>
        </div>
      </div>
    </div>
  );
}
