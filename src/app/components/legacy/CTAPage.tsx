/**version 2*9*/
// CTA 페이지 — Figma 2200Cta-2/index.tsx 기반
import { useState } from "react";
import imgWindowFrame  from "../imports/2200Cta-2/108ae8a314a7a2e9b63e414d76ece9745e28c566.png";
import imgBgPattern    from "../imports/2200Cta-2/4311a10c440eedcb0e4c56218bd12a85d491cf55.png";
import imgCornerTL     from "../imports/2200Cta-2/b2d3cdf139cdf00a3868ad4bf7ad407155c4e712.png";
import imgEdgeTop      from "../imports/2200Cta-2/2a37d1c8e1884edd8873126424b8e4896d3439be.png";
import imgCornerTR     from "../imports/2200Cta-2/a70d390cf0db9155695951c0746ffb2b5ab71f9e.png";
import imgEdgeLeft     from "../imports/2200Cta-2/6494727c53b0593f8a0217ff11bc3fbb2961f99d.png";
import imgCornerBLa    from "../imports/2200Cta-2/3d3a19f469d5ccfafe7c53f4a4b5e0c865b56008.png";
import imgCornerBLb    from "../imports/2200Cta-2/4e013676febbb1c8d774637eb5341c31077215e8.png";
import imgEdgeBot      from "../imports/2200Cta-2/1e2ded9ef440b7f889fcfee3c5936e0f36da63c2.png";
import imgCornerBR     from "../imports/2200Cta-2/38b961cc3cce7fcaa6c20191eb623633d23043b4.png";
import imgIllustration from "../imports/2200Cta-2/e46afc7f0029cbda19071cefeb773a81397c8587.png";
import imgRewardIcon   from "../imports/2200Cta-2/ece298d0ec2c16f10310d45724b276a6035cb503.png";
import EarlyRegistrationDialog from "../components/EarlyRegistrationDialog";
import ToastNotification from "../components/ToastNotification";

type Props = {
  characterName: string;
  onComplete: () => void; // 등록 완료 후 이동
};

// ── 윈도우 프레임 패널 ──
function WindowPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "330.944 / 80.4" }}>
        <img src={imgWindowFrame} alt="" className="absolute pointer-events-none max-w-none"
          style={{ height: "475.78%", left: "-0.71%", top: "-1.9%", width: "101.51%" }} />
      </div>
      <div className="relative w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src={imgWindowFrame} alt="" className="absolute max-w-none"
            style={{ height: "169.71%", left: "-0.71%", top: "-53.06%", width: "101.51%" }} />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
      <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "330.944 / 38.4" }}>
        <img src={imgWindowFrame} alt="" className="absolute pointer-events-none max-w-none"
          style={{ height: "996.16%", left: "-0.71%", top: "-896.16%", width: "101.51%" }} />
      </div>
    </div>
  );
}

// ── 초록 픽셀 버튼 ──
function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div onClick={onClick} className="grid w-[280px] h-[60px] cursor-pointer"
      style={{ gridTemplateColumns: "12px 1fr 12px", gridTemplateRows: "12px 1fr 12px" }}>
      <div className="overflow-clip relative size-[12px]"><img src={imgCornerTL} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" /></div>
      <div className="h-[12px] overflow-clip relative" style={{ backgroundImage: `url("${imgEdgeTop}")`, backgroundSize: "12px 12px", backgroundPosition: "top left" }} />
      <div className="overflow-clip relative size-[12px]"><img src={imgCornerTR} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" /></div>
      <div className="overflow-clip relative w-[12px]" style={{ backgroundImage: `url("${imgEdgeLeft}")`, backgroundSize: "12px 12px", backgroundPosition: "top left" }} />
      <div className="bg-[#36501e] flex items-center justify-center">
        <span className="text-white text-[16px] tracking-[1.6px] text-center" style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>{children}</span>
      </div>
      <div className="overflow-clip relative w-[12px]" style={{ backgroundImage: `url("${imgEdgeLeft}")`, backgroundSize: "12px 12px", backgroundPosition: "top left", transform: "scaleY(-1) rotate(180deg)" }} />
      <div className="overflow-clip relative size-[12px]">
        <img src={imgCornerBLb} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
        <img src={imgCornerBLa} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
      </div>
      <div className="h-[12px] overflow-clip relative" style={{ backgroundImage: `url("${imgEdgeBot}")`, backgroundSize: "12px 12px", backgroundPosition: "top left" }} />
      <div className="overflow-clip relative size-[12px]"><img src={imgCornerBR} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" /></div>
    </div>
  );
}

// ── 크림 픽셀 버튼 ──
function SecondaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div onClick={onClick} className="grid w-[280px] h-[60px] cursor-pointer"
      style={{ gridTemplateColumns: "12px 1fr 12px", gridTemplateRows: "12px 1fr 12px" }}>
      <div className="overflow-clip relative size-[12px]"><img src={imgCornerTL} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" /></div>
      <div className="h-[12px] overflow-clip relative" style={{ backgroundImage: `url("${imgEdgeTop}")`, backgroundSize: "12px 12px", backgroundPosition: "top left" }} />
      <div className="overflow-clip relative size-[12px]"><img src={imgCornerTR} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" /></div>
      <div className="overflow-clip relative w-[12px]" style={{ backgroundImage: `url("${imgEdgeLeft}")`, backgroundSize: "12px 12px", backgroundPosition: "top left" }} />
      <div className="bg-[#faf5eb] flex items-center justify-center">
        <span className="text-[#68553e] text-[16px] tracking-[1.6px] text-center" style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>{children}</span>
      </div>
      <div className="overflow-clip relative w-[12px]" style={{ backgroundImage: `url("${imgEdgeLeft}")`, backgroundSize: "12px 12px", backgroundPosition: "top left", transform: "scaleY(-1) rotate(180deg)" }} />
      <div className="overflow-clip relative size-[12px]">
        <img src={imgCornerBLb} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
        <img src={imgCornerBLa} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
      </div>
      <div className="h-[12px] overflow-clip relative" style={{ backgroundImage: `url("${imgEdgeBot}")`, backgroundSize: "12px 12px", backgroundPosition: "top left" }} />
      <div className="overflow-clip relative size-[12px]"><img src={imgCornerBR} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" /></div>
    </div>
  );
}

/* 추가된 부분 */
export default function CTAPage({ characterName, onComplete }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast]   = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setShowToast(true);
    // 토스트 onHidden 콜백에서 이동 — CTA 에서 공유 시 페이지 유지
  };

  return (
    <div className="min-h-screen w-full bg-[#628d38] flex justify-center relative">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url("${imgBgPattern}")`, backgroundRepeat: "repeat", backgroundSize: "361px", opacity: 0.3 }} />

      <div className="w-full max-w-[360px] flex flex-col relative pb-8 pt-[24px]">
        <div className="mx-[14px]">
          <WindowPanel>
            <div className="flex flex-col items-center pt-[27px] pb-6 px-6 gap-4">

              {/* 타이틀 */}
              <div className="text-center">
                <p className="text-[#32322d] text-[18px] tracking-[0.9px] leading-[1.4]"
                  style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>
                  {characterName}을<br />농장에 입주시킬 수 있어요
                </p>
                <p className="text-[#6a6a61] text-[10px] tracking-[0.4px] mt-1"
                  style={{ fontFamily: "Elice DX Neolli", fontWeight: 300 }}>
                  앱이 오픈되면 문자로 알려드릴게요
                </p>
              </div>

              {/* 캐릭터 일러스트 */}
              <div className="rounded-[8px] overflow-hidden border border-[#a4a499] shadow-md relative"
                style={{ width: "206px", height: "206px", background: "#fafaf8",
                  boxShadow: "0px 1px 0px 2px rgba(90,70,40,0.1)" }}>
                <div className="absolute m-[10px] inset-0 overflow-hidden rounded-[4px]">
                  <img src={imgIllustration} alt="포착팜"
                    className="absolute inset-0 size-full object-cover pointer-events-none rounded-[4px]" />
                  <div className="absolute inset-0 pointer-events-none rounded-[4px]"
                    style={{ boxShadow: "inset 0px -4px 0px 1px rgba(90,70,40,0.12)" }} />
                </div>
              </div>

              {/* 혜택 카드 */}
              <div className="w-full rounded-[4px] border border-[#cdb792] bg-[#fffdf8] px-3 py-3">
                <p className="text-[#68553e] text-[11px] tracking-[1.1px] mb-1 text-center"
                  style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>포착팜 오픈 알림 혜택</p>
                <p className="text-[#6a6a61] text-[10px] tracking-[0.4px] text-center mb-2"
                  style={{ fontFamily: "Elice DX Neolli", fontWeight: 300 }}>출시 소식과 사전예약 보상을 받아보세요!</p>
                <svg width="100%" height="12" viewBox="0 0 219 12" fill="none">
                  <path d="M8 6H211" stroke="#E9DFC8" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2" />
                </svg>
                {["보상 1", "보상 2", "보상 3"].map((r) => (
                  <div key={r} className="flex items-center gap-2 mt-2">
                    <img src={imgRewardIcon} alt="" className="w-4 h-4 object-contain pointer-events-none shrink-0" />
                    <span className="text-[#6a6a61] text-[10px] tracking-[0.4px]"
                      style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>

              {/* 오픈 알림 받기 → 다이얼로그 */}
              <PrimaryBtn onClick={() => setShowDialog(true)}>오픈 알림 받기</PrimaryBtn>

              {/* 친구에게 공유하기 → 토스트 */}
              <SecondaryBtn onClick={handleShare}>친구에게 공유하기</SecondaryBtn>
            </div>
          </WindowPanel>
        </div>
      </div>

      {/* 토스트 — CTA 페이지 유지 (onHidden 없음) */}
      <ToastNotification visible={showToast} onHidden={() => setShowToast(false)} />

      {/* 등록 다이얼로그 */}
      {showDialog && (
        <EarlyRegistrationDialog
          onClose={() => setShowDialog(false)}
          onComplete={() => { setShowDialog(false); onComplete(); }}
        />
      )}
    </div>
  );
}
