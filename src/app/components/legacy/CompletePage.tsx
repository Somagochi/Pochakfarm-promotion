// 등록 완료 페이지 — Figma 2200Cta-3/index.tsx 기반
import { useState } from "react";
import imgWindowFrame from "../imports/2200Cta-3/108ae8a314a7a2e9b63e414d76ece9745e28c566.png";
import imgBgPattern from "../imports/2200Cta-3/4311a10c440eedcb0e4c56218bd12a85d491cf55.png";
import imgCornerTL from "../imports/2200Cta-3/3d3a19f469d5ccfafe7c53f4a4b5e0c865b56008.png";
import imgEdgeTop from "../imports/2200Cta-3/e8f12942b4b56bbc622d5c080b5ffa874fba5c0f.png";
import imgCornerTR from "../imports/2200Cta-3/6f4b194710c7894240169b002b2e53d9d40cf5b6.png";
import imgEdgeLeft from "../imports/2200Cta-3/ab8e04476b7d80271cc07b71f815858bb6e7568b.png";
import imgCornerBLa from "../imports/2200Cta-3/bc6a098a4b15fb73830b14df56f3186233089f85.png";
import imgCornerBLb from "../imports/2200Cta-3/8163eb2784e9ddd768ac19ae5d0f7b693b93ecfb.png";
import imgEdgeBot from "../imports/2200Cta-3/c0a5b0bd8bcb13d73ff77ebed6bb0f3067f86960.png";
import imgCornerBR from "../imports/2200Cta-3/a61805166b75b9cc41e13f96119e41d67dd79b8e.png";
import ToastNotification from "../components/ToastNotification";

// ── 윈도우 프레임 패널 ──
function WindowPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <div
        className="relative w-full shrink-0 overflow-hidden"
        style={{ aspectRatio: "330.944 / 80.4" }}
      >
        <img
          src={imgWindowFrame}
          alt=""
          className="absolute pointer-events-none max-w-none"
          style={{
            height: "475.78%",
            left: "-0.71%",
            top: "-1.9%",
            width: "101.51%",
          }}
        />
      </div>
      <div className="relative w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={imgWindowFrame}
            alt=""
            className="absolute max-w-none"
            style={{
              height: "169.71%",
              left: "-0.71%",
              top: "-53.06%",
              width: "101.51%",
            }}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
      <div
        className="relative w-full shrink-0 overflow-hidden"
        style={{ aspectRatio: "330.944 / 38.4" }}
      >
        <img
          src={imgWindowFrame}
          alt=""
          className="absolute pointer-events-none max-w-none"
          style={{
            height: "996.16%",
            left: "-0.71%",
            top: "-896.16%",
            width: "101.51%",
          }}
        />
      </div>
    </div>
  );
}

// ── 크림 픽셀 버튼 ──
function SecondaryBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className="grid w-[280px] h-[60px] cursor-pointer"
      style={{
        gridTemplateColumns: "12px 1fr 12px",
        gridTemplateRows: "12px 1fr 12px",
      }}
    >
      <div className="overflow-clip relative size-[12px]">
        <img
          src={imgCornerTL}
          alt=""
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="h-[12px] overflow-clip relative"
        style={{
          backgroundImage: `url("${imgEdgeTop}")`,
          backgroundSize: "12px 12px",
          backgroundPosition: "top left",
        }}
      />
      <div className="overflow-clip relative size-[12px]">
        <img
          src={imgCornerTR}
          alt=""
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="overflow-clip relative w-[12px]"
        style={{
          backgroundImage: `url("${imgEdgeLeft}")`,
          backgroundSize: "12px 12px",
          backgroundPosition: "top left",
        }}
      />
      <div className="bg-[#faf5eb] flex items-center justify-center">
        <span
          className="text-[#68553e] text-[16px] tracking-[1.6px] text-center"
          style={{
            fontFamily: "Elice DX Neolli",
            fontWeight: 500,
          }}
        >
          {children}
        </span>
      </div>
      <div
        className="overflow-clip relative w-[12px]"
        style={{
          backgroundImage: `url("${imgEdgeLeft}")`,
          backgroundSize: "12px 12px",
          backgroundPosition: "top left",
          transform: "scaleY(-1) rotate(180deg)",
        }}
      />
      <div className="overflow-clip relative size-[12px]">
        <img
          src={imgCornerBLb}
          alt=""
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
        <img
          src={imgCornerBLa}
          alt=""
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="h-[12px] overflow-clip relative"
        style={{
          backgroundImage: `url("${imgEdgeBot}")`,
          backgroundSize: "12px 12px",
          backgroundPosition: "top left",
        }}
      />
      <div className="overflow-clip relative size-[12px]">
        <img
          src={imgCornerBR}
          alt=""
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </div>
    </div>
  );
}

/* 추가된 부분 */
export default function CompletePage() {
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard
      ?.writeText(window.location.href)
      .catch(() => {});
    setShowToast(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#628d38] flex justify-center relative">
      {/* 배경 패턴 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${imgBgPattern}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "361px",
          opacity: 0.3,
        }}
      />

      <div className="w-full max-w-[360px] flex flex-col relative pb-8 pt-[24px]">
        <div className="mx-[14px]">
          <WindowPanel>
            <div className="flex flex-col items-center pt-[30px] pb-6 px-6 gap-4">
              {/* 타이틀 */}
              <div className="text-center">
                <p
                  className="text-[#32322d] text-[18px] tracking-[0.9px] leading-[1.4]"
                  style={{
                    fontFamily: "Elice DX Neolli",
                    fontWeight: 500,
                  }}
                >
                  등록 완료
                </p>
                <p
                  className="text-[#6a6a61] text-[10px] tracking-[0.4px] mt-1"
                  style={{
                    fontFamily: "Elice DX Neolli",
                    fontWeight: 300,
                  }}
                >
                  앱이 오픈되면 문자로 알려드릴게요
                </p>
              </div>

              {/* 안내사항 카드 */}
              <div className="w-full rounded-[4px] border border-[#cdb792] bg-[#fffdf8] px-3 py-3">
                <p
                  className="text-[#68553e] text-[11px] tracking-[1.1px] mb-3 text-center"
                  style={{
                    fontFamily: "Elice DX Neolli",
                    fontWeight: 500,
                  }}
                >
                  안내사항
                </p>
                <ul
                  className="flex flex-col gap-[6px]"
                  style={{
                    listStyle: "disc",
                    paddingLeft: "13.5px",
                  }}
                >
                  {[
                    "출시 알림은 문자로 발송됩니다",
                    "사전예약 보상은 앱 출시 후 계정당 1회 지급됩니다",
                    "이벤트/혜택 알림 수신 동의를 하지 않은 경우 보상 제공 대상자에서 제외됩니다. 변경을 원하시는 경우 아래 연락처로 문의 부탁드립니다.",
                  ].map((text, i) => (
                    <li
                      key={i}
                      className="text-[#a4a499] text-[9px] tracking-[0.36px] leading-[1.4]"
                      style={{
                        fontFamily: "Elice DX Neolli",
                        fontWeight: 300,
                      }}
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 친구에게 공유하기 → 토스트 */}
              <SecondaryBtn onClick={handleShare}>
                친구에게 공유하기
              </SecondaryBtn>
            </div>
          </WindowPanel>
        </div>
      </div>

      {/* 토스트 — 완료 페이지 유지 */}
      <ToastNotification
        visible={showToast}
        onHidden={() => setShowToast(false)}
      />
    </div>
  );
}