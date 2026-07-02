/**version 2*9*/
// Toast 컴포넌트 — 아래에서 48px 위로 슬라이드 인/아웃 애니메이션
import { useEffect, useState } from "react";
import imgCornerTR  from "../imports/Toast-1/0822a5f10b73dc979d5e92564a14862942fbd044.png";
import imgEdgeTop   from "../imports/Toast-1/b321ef3c3151c545a8fcdbf047f2ba3fd61dfda5.png";
import imgCornerTL  from "../imports/Toast-1/4e0e861acabda8229e55e797182b09307e56dc6e.png";
import imgEdgeRight from "../imports/Toast-1/181b455bf8f5f992540fdaa7fce4350c99c8a9c5.png";
import imgEdgeLeft  from "../imports/Toast-1/792071d6c4b5dc1d3d0eb3cdcda09f92f9b2f5bf.png";
import imgCornerBL  from "../imports/Toast-1/3d3a19f469d5ccfafe7c53f4a4b5e0c865b56008.png";
import imgEdgeBot   from "../imports/Toast-1/6926569723530d3fdc756de479deb7f28f8adf79.png";
import imgCornerBR  from "../imports/Toast-1/9d2ec45ebf0aaed1a10cd839dceee8529befd048.png";
import imgToastIcon from "../imports/Toast-1/ea70a7c1cf94ab3e6b6159076fc49393c1149eb2.png";

type Props = {
  visible: boolean;       // 바깥에서 show/hide 제어
  onHidden?: () => void;  // 슬라이드 아웃 완료 후 콜백
};

/* 추가된 부분 */
export default function ToastNotification({ visible, onHidden }: Props) {
  // enter: 슬라이드 인, exit: 슬라이드 아웃
  const [phase, setPhase] = useState<"hidden" | "enter" | "show" | "exit">("hidden");

  useEffect(() => {
    if (visible) {
      // 한 프레임 후 enter → 트랜지션 트리거
      setPhase("enter");
      const t1 = setTimeout(() => setPhase("show"), 20);
      // 2.5초 후 슬라이드 아웃 시작
      const t2 = setTimeout(() => setPhase("exit"), 2500);
      // 아웃 트랜지션 완료(500ms) 후 hidden + 콜백
      const t3 = setTimeout(() => {
        setPhase("hidden");
        onHidden?.();
      }, 3000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [visible, onHidden]);

  if (phase === "hidden") return null;

  // enter: 아직 아래(48px), show: 제자리, exit: 다시 아래
  const isVisible = phase === "show";
  const transform = isVisible ? "translateY(0)" : "translateY(48px)";

  return (
    <div
      className="fixed left-1/2 z-[200] pointer-events-none"
      style={{
        bottom: "48px",
        transform: `translateX(-50%) ${transform}`,
        width: "280px",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
      }}
    >
      {/* 9-slice 픽셀 테두리 — Figma Toast 컴포넌트 */}
      <div
        className="grid pb-[2px]"
        style={{ gridTemplateColumns: "12px 1fr 12px", gridTemplateRows: "12px 1fr 12px" }}
      >
        <div className="size-[12px] overflow-clip relative">
          <img src={imgCornerTL} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
        </div>
        <div className="h-[12px] overflow-clip relative"
          style={{ backgroundImage: `url("${imgEdgeTop}")`, backgroundSize: "12px 12px" }} />
        <div className="size-[12px] overflow-clip relative">
          <img src={imgCornerTR} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
        </div>

        <div className="w-[12px] overflow-clip relative"
          style={{ backgroundImage: `url("${imgEdgeLeft}")`, backgroundSize: "12px 12px" }} />
        <div className="bg-[#f2ebdd] flex items-center gap-2 px-2 py-3">
          <div className="relative shrink-0 size-[28px] overflow-hidden">
            <img
              src={imgToastIcon}
              alt=""
              className="absolute pointer-events-none"
              style={{ height: "202.74%", left: "-5.77%", top: "-28.58%", width: "405.47%", maxWidth: "none" }}
            />
          </div>
          <span
            className="text-[#45372a] text-[11px] tracking-[1.1px]"
            style={{ fontFamily: "Elice DX Neolli", fontWeight: 500 }}
          >
            링크가 복사되었습니다
          </span>
        </div>
        <div className="w-[12px] overflow-clip relative"
          style={{ backgroundImage: `url("${imgEdgeRight}")`, backgroundSize: "12px 12px" }} />

        <div className="size-[12px] overflow-clip relative">
          <img src={imgCornerBL} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
        </div>
        <div className="h-[12px] overflow-clip relative"
          style={{ backgroundImage: `url("${imgEdgeBot}")`, backgroundSize: "12px 12px" }} />
        <div className="size-[12px] overflow-clip relative">
          <img src={imgCornerBR} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
