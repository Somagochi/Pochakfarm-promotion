import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

// ── Assets ───────────────────────────────────────────────────
// Window frame & background
import imgWindowFrame from "../imports/2200포착-7/108ae8a314a7a2e9b63e414d76ece9745e28c566.png";
import imgBgPattern from "../imports/2200포착-7/4311a10c440eedcb0e4c56218bd12a85d491cf55.png";

// Pixel button 9-slice
import imgCornerTL from "../imports/2200포착-7/b2d3cdf139cdf00a3868ad4bf7ad407155c4e712.png";
import imgEdgeTop from "../imports/2200포착-7/2a37d1c8e1884edd8873126424b8e4896d3439be.png";
import imgCornerTR from "../imports/2200포착-7/a70d390cf0db9155695951c0746ffb2b5ab71f9e.png";
import imgEdgeLeft from "../imports/2200포착-7/6494727c53b0593f8a0217ff11bc3fbb2961f99d.png";
import imgCornerBLa from "../imports/2200포착-7/3d3a19f469d5ccfafe7c53f4a4b5e0c865b56008.png";
import imgCornerBLb from "../imports/2200포착-7/4e013676febbb1c8d774637eb5341c31077215e8.png";
import imgEdgeBot from "../imports/2200포착-7/1e2ded9ef440b7f889fcfee3c5936e0f36da63c2.png";
import imgCornerBR from "../imports/2200포착-7/38b961cc3cce7fcaa6c20191eb623633d23043b4.png";

// Card pack (POCHAKPARM FARM green pack)
import imgCardPack from "../imports/image.png";

// Dog pixel-art SVG component (inline JSX — avoids SVG file import issues)
import FigmaDog from "../imports/Frame427322333/index";

// Card back (blue paw pattern) — 포착-15
import imgCardBack from "../imports/2200포착-15/821d88e38d85900010c4a712995d90bbfd340da7.png";
// Character card front
import imgCharFront from "../imports/image-2.png";

// Footer decoration — 포착-11
import imgFoot3 from "../imports/2200포착-11/083b0a224f1e9b9660edf055c3e923f3c96b2aac.png";
import imgFoot4 from "../imports/2200포착-11/275bb331fb3bee58e979e341b101d5d736367264.png";
import imgFoot5 from "../imports/2200포착-11/edb1471405b6ca6dffee78680c6cd49cbefde555.png";

// ── Constants ────────────────────────────────────────────────
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);
const NAME_FILTER = /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g;

const KEYFRAMES = `
  @keyframes float      { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
  @keyframes wobble     { 0%,100%{transform:rotate(-1.5deg)} 50%{transform:rotate(1.5deg)} }
  @keyframes spotlight  { 0%,100%{opacity:0.7}              50%{opacity:1} }
  @keyframes dogBreath  { 0%,100%{opacity:1}                50%{opacity:0.12} }
`;

type Phase = "idle" | "processing" | "pack" | "dim" | "result";

// ── PixelButton ──────────────────────────────────────────────
function PixelButton({
  onClick,
  disabled,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className="grid w-[280px] h-[60px] transition-opacity"
      style={{
        gridTemplateColumns: "12px 1fr 12px",
        gridTemplateRows: "12px 1fr 12px",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
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
        className="overflow-clip relative h-[12px]"
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
      <div className="bg-[#36501e] flex items-center justify-center">
        {children}
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
        className="overflow-clip relative h-[12px]"
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

// ── WindowPanel ──────────────────────────────────────────────
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

// ── AnimatedPanel ─────────────────────────────────────────────
function AnimatedPanel({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (visible && !mounted) {
      setMounted(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setReady(true)),
      );
    }
  }, [visible, mounted]);
  if (!mounted) return null;
  return (
    <div
      className="mx-[14px] overflow-hidden"
      style={{
        maxHeight: ready ? "800px" : "0px",
        opacity: ready ? 1 : 0,
        transition:
          "max-height 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
      }}
    >
      <div
        style={{
          transform: ready ? "scaleY(1)" : "scaleY(0.1)",
          transformOrigin: "top",
          transition:
            "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── ProcessingPanel — card pack inside window frame ───────────
function ProcessingPanel({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const DURATION = 2800;
    const start = Date.now();
    let rafId: number;
    let finished = false;
    const tick = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (!finished) {
        finished = true;
        setTimeout(onDone, 300);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onDone]);

  return (
    <WindowPanel>
      <div className="flex flex-col items-center pt-5 pb-6 px-8 gap-4">
        <p
          className="text-[#628d38] text-[11px] tracking-[1.1px]"
          style={{ fontFamily: "Galmuri11", fontWeight: 700 }}
        >
          STEP 03
        </p>
        <p
          className="text-[#32322d] text-[18px] tracking-[0.9px] leading-[1.4] text-center"
          style={{
            fontFamily: "Elice DX Neolli",
            fontWeight: 500,
          }}
        >
          변환되는 과정을
          <br />
          기다려주세요
        </p>
        <p
          className="text-[#6a6a61] text-[10px] tracking-[0.4px] text-center"
          style={{
            fontFamily: "Elice DX Neolli",
            fontWeight: 300,
          }}
        >
          웹사이트를 종료하더라도
          <br />
          변환 과정은 유지돼요
        </p>

        {/* Dog pixel-art — breath fade animation */}
        <div
          style={{
            width: "56px",
            height: "50px",
            position: "relative",
            animation: "dogBreath 1.8s ease-in-out infinite",
          }}
        >
          <FigmaDog />
        </div>

        {/* Progress bar */}
        <div className="w-[200px]">
          <div className="h-[7px] bg-[#e9dfc8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#628d38] rounded-full"
              style={{
                width: `${progress * 100}%`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <p
            className="text-[#a4a499] text-[9px] tracking-[0.3px] text-right mt-1"
            style={{ fontFamily: "Galmuri11", fontWeight: 700 }}
          >
            {Math.round(progress * 100)}%
          </p>
        </div>
      </div>
    </WindowPanel>
  );
}

// ── CardPackPanel — tap to open ───────────────────────────────
function CardPackPanel({ onOpen }: { onOpen: () => void }) {
  return (
    <WindowPanel>
      <div className="flex flex-col items-center py-8 px-6 gap-4">
        <p
          className="text-[#628d38] text-[11px] tracking-[1.1px]"
          style={{ fontFamily: "Galmuri11", fontWeight: 700 }}
        >
          CARD PACK READY!
        </p>
        <div
          className="cursor-pointer"
          onClick={onOpen}
          style={{
            animation: "float 1.8s ease-in-out infinite",
          }}
        >
          <img
            src={imgCardPack}
            alt="카드팩"
            className="drop-shadow-2xl"
            style={{
              width: "140px",
              animation: "wobble 2.2s ease-in-out infinite",
            }}
          />
        </div>
        <p
          className="text-[#8f7755] text-[10px] tracking-[0.4px] text-center"
          style={{
            fontFamily: "Elice DX Neolli",
            fontWeight: 300,
          }}
        >
          탭해서 카드팩을 열어보세요!
        </p>
      </div>
    </WindowPanel>
  );
}

// ── PackOpeningOverlay ────────────────────────────────────────
// Sequence: pack → cut → pack fades + card shoots up → card lands large → result
function PackOpeningOverlay({
  uploadedImage,
  characterName,
  onResult,
}: {
  uploadedImage: string;
  characterName: string;
  onResult: () => void;
}) {
  const [cut, setCut] = useState(false); // pack splits
  const [packGone, setPackGone] = useState(false); // pack fades out
  const [cardUp, setCardUp] = useState(false); // card shoots upward
  const [cardLand, setCardLand] = useState(false); // card lands from top, large
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCut(true), 1200), // pack splits
      setTimeout(() => {
        setPackGone(true);
        setCardUp(true);
      }, 2800), // pack fades, card shoots up
      setTimeout(() => setCardLand(true), 3500), // card comes back down
      setTimeout(() => {
        setShowResult(true);
        onResult();
      }, 5000), // show result
    ];
    return () => timers.forEach(clearTimeout);
  }, [onResult]);

  // Card Y position across phases:
  // before cut → hidden below
  // after cut  → peeking (translateY 60px, small)
  // cardUp     → shoot up off screen (translateY -120vh)
  // cardLand   → land from top, large then settles
  const cardTransform = (() => {
    if (cardLand) return "translateY(-72px) scale(1)";
    if (cardUp) return "translateY(-120vh) scale(0.8)";
    if (cut) return "translateY(60px) scale(0.75)";
    return "translateY(100px) scale(0.5)";
  })();

  const cardOpacity =
    cut && !cardLand && !cardUp
      ? 1
      : cardLand
        ? 1
        : cut
          ? 1
          : 0;

  const cardTransition = (() => {
    if (cardUp)
      return "transform 0.55s cubic-bezier(0.4,0,0.6,1), opacity 0.3s ease";
    if (cardLand)
      return "transform 0.65s cubic-bezier(0.34,1.4,0.64,1), opacity 0.4s ease";
    return "transform 0.8s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease";
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0.5"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(98,141,56,0.45) 0%, transparent 70%)",
          animation: "spotlight 2.4s ease-in-out infinite",
        }}
      />

      {!showResult ? (
        <div
          className="relative flex items-center justify-center"
          style={{ width: "280px", height: "400px" }}
        >
          {/* Card back — peeks, shoots up, lands large */}
          <div
            className="absolute z-0 flex justify-center"
            style={{ width: "260px" }}
          >
            <img
              src={imgCardBack}
              alt=""
              draggable={false}
              style={{
                width: cardLand ? "220px" : "160px",
                transition: cardTransition,
                transform: cardTransform,
                opacity: cardOpacity,
                filter:
                  "drop-shadow(0 12px 32px rgba(0,0,0,0.7))",
              }}
            />
          </div>

          {/* Pack top half — flies up on cut, fades when packGone */}
          <div
            className="absolute z-10"
            style={{
              top: "80px",
              transition:
                "transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease",
              transform: cut
                ? "translateY(-40px)"
                : "translateY(0px)",
              opacity: packGone ? 0 : 1,
            }}
          >
            <div style={{ overflow: "hidden", height: "48px" }}>
              <img
                src={imgCardPack}
                alt=""
                className="drop-shadow-2xl"
                style={{ width: "180px" }}
              />
            </div>
          </div>

          {/* Pack bottom half — slides down, fades when packGone */}
          <div
            className="absolute z-10"
            style={{
              bottom: "60px",
              transition:
                "transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease",
              transform: cut
                ? "translateY(80px)"
                : "translateY(0px)",
              opacity: packGone ? 0 : 1,
            }}
          >
            <div
              style={{
                overflow: "hidden",
                height: "212px",
                marginTop: "-48px",
              }}
            >
              <img
                src={imgCardPack}
                alt=""
                className="drop-shadow-2xl"
                style={{ width: "180px", marginTop: "-48px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <ResultOverlay
          uploadedImage={uploadedImage}
          characterName={characterName}
        />
      )}
    </div>
  );
}

// ── ResultOverlay — card back → flip → 360° spin + swipe ──────
function ResultOverlay({
  uploadedImage,
  characterName,
}: {
  uploadedImage: string;
  characterName: string;
}) {
  // angle in degrees — starts at 180 (back face showing)
  const [angle, setAngle] = useState(180);
  // 'initial' → CSS transition flip, 'spinning' → rAF auto-rotate
  const [mode, setMode] = useState<"initial" | "spinning">(
    "initial",
  );

  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAng = useRef(0);

  useEffect(() => {
    // 0.8s: flip card back → front (0 → 360 so front shows)
    const t1 = setTimeout(() => setAngle(360), 800);
    // 0.8s flip + 1s pause → start auto-spin
    const t2 = setTimeout(() => setMode("spinning"), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Auto-rotation loop (360°/2s speed)
  useEffect(() => {
    if (mode !== "spinning") return;
    const spin = (time: number) => {
      if (!isDragging.current) {
        if (lastTimeRef.current !== undefined) {
          setAngle(
            (prev) =>
              prev + (time - lastTimeRef.current!) * 0.05,
          );
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = undefined;
      }
      rafRef.current = requestAnimationFrame(spin);
    };
    rafRef.current = requestAnimationFrame(spin);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode]);

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (mode !== "spinning") return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartAng.current = angle;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    setAngle(dragStartAng.current + delta * 0.6);
  };
  const onTouchEnd = () => {
    isDragging.current = false;
  };

  // Mouse drag — global listeners so it works outside the element
  const onMouseDown = (e: React.MouseEvent) => {
    if (mode !== "spinning") return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartAng.current = angle;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - dragStartX.current;
      setAngle(dragStartAng.current + delta * 0.6);
    };
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleSave = useCallback(async () => {
    const W = 360,
      H = 480;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f2ebdd";
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 16);
    ctx.fill();

    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const drawH = W / (img.width / img.height);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(0, 0, W, Math.min(drawH, H - 80), 16);
        ctx.clip();
        ctx.drawImage(img, 0, 0, W, drawH);
        ctx.restore();
        resolve();
      };
      img.src = uploadedImage;
    });

    ctx.fillStyle = "#f2ebdd";
    ctx.fillRect(0, H - 70, W, 70);
    ctx.fillStyle = "#628d38";
    ctx.font = "bold 22px monospace";
    ctx.textAlign = "center";
    ctx.fillText(characterName, W / 2, H - 36);
    ctx.fillStyle = "#8f7755";
    ctx.font = "12px sans-serif";
    ctx.fillText("CHARACTER CARD", W / 2, H - 14);
    ctx.strokeStyle = "#e9dfc8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(1.5, 1.5, W - 3, H - 3, 15);
    ctx.stroke();

    const a = document.createElement("a");
    a.download = `${characterName || "character"}-card.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, [uploadedImage, characterName]);

  return (
    <div className="flex flex-col items-center w-full px-6 gap-6">
      {/* Spotlight bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0.1"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(98,141,56,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Card — initial CSS flip then rAF spin + swipe */}
      <div
        style={{
          perspective: "800px",
          cursor: mode === "spinning" ? "grab" : "default",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitUserDrag: "none",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <div
          style={{
            position: "relative",
            width: "220px",
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg)`,
            // CSS transition only during the initial flip; removed once spinning starts
            transition:
              mode === "initial"
                ? "transform 0.8s cubic-bezier(0.4,0,0.2,1)"
                : "none",
          }}
        >
          {/* Front face — visible at 0°/360° */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={imgCharFront}
              alt="캐릭터 카드"
              draggable={false}
              style={{
                width: "220px",
                filter:
                  "drop-shadow(0 12px 32px rgba(0,0,0,0.7))",
                display: "block",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Back face — rotated 180°, visible at 180° */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={imgCardBack}
              alt="카드 뒷면"
              draggable={false}
              style={{
                width: "220px",
                filter:
                  "drop-shadow(0 12px 32px rgba(0,0,0,0.7))",
                display: "block",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      <p
        className="relative text-white/70 text-[16px] pt-[24px] tracking-[0.4px] text-center"
        style={{
          fontFamily: "Elice DX Neolli",
          fontWeight: 300,
        }}
      >
        야생의 {characterName}(이)가 나타났다!!
      </p>

      <PixelButton onClick={handleSave}>
        <span
          className="text-[14px] tracking-[1.4px] text-white text-center w-full"
          style={{
            fontFamily: "Elice DX Neolli",
            fontWeight: 500,
          }}
        >
          이미지 저장하기
        </span>
      </PixelButton>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [uploadedImage, setUploadedImage] = useState<
    string | null
  >(null);
  const [characterName, setCharacterName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isButtonActive =
    !!uploadedImage && characterName.trim().length > 0;

  const readFile = useCallback((file: File) => {
    if (!ACCEPTED_TYPES.has(file.type)) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      setUploadedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) readFile(e.target.files[0]);
    },
    [readFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback(
    () => setIsDragging(false),
    [],
  );
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files[0])
        readFile(e.dataTransfer.files[0]);
    },
    [readFile],
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCharacterName(e.target.value.replace(NAME_FILTER, "")),
    [],
  );

  const handleConvert = useCallback(() => {
    if (!isButtonActive) return;
    setPhase("processing");
    setTimeout(
      () =>
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      100,
    );
  }, [isButtonActive]);

  const handleProcessingDone = useCallback(
    () => setPhase("pack"),
    [],
  );
  const handleOpenPack = useCallback(() => setPhase("dim"), []);
  const handleResult = useCallback(
    () => setPhase("result"),
    [],
  );

  return (
    <div className="min-h-screen w-full bg-[#628d38] flex justify-center relative">
      <style>{KEYFRAMES}</style>

      {/* Tiled background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${imgBgPattern}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "361px",
          opacity: 0.3,
        }}
      />

      <div className="w-full max-w-[360px] flex flex-col relative pb-16 pt-[24px]">
        {/* ── Form panel ──────────────────────────── */}
        <div className="mx-[14px]">
          <WindowPanel>
            {/* STEP 01 — Upload */}
            <div className="flex flex-col items-center pt-4 pb-5 px-10">
              <p
                className="text-[#628d38] text-[11px] tracking-[1.1px] mb-[10px] text-center"
                style={{
                  fontFamily: "Galmuri11",
                  fontWeight: 700,
                }}
              >
                STEP 01
              </p>
              <p
                className="text-[#32322d] text-[18px] tracking-[0.9px] leading-[1.4] mb-[6px] text-center"
                style={{
                  fontFamily: "Elice DX Neolli",
                  fontWeight: 500,
                }}
              >
                동물 사진을 업로드하면
                <br />
                캐릭터 카드를 발급해드려요
              </p>
              <p
                className="text-[#6a6a61] text-[10px] tracking-[0.4px] leading-[1.6] mb-4 text-center"
                style={{
                  fontFamily: "Elice DX Neolli",
                  fontWeight: 300,
                }}
              >
                최대한 얼굴과 몸이 잘 나온 사진을 올려주세요
                <br />
                저작권에 문제 없는 이미지를 사용해주세요
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/heic"
                onChange={handleFileInput}
                className="hidden"
              />

              <div
                className="relative w-[240px] h-[240px] rounded-[4px] overflow-hidden cursor-pointer"
                style={{
                  background: "#f2ebdd",
                  border: "1.5px dashed #e9dfc8",
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  !uploadedImage &&
                  fileInputRef.current?.click()
                }
              >
                {uploadedImage ? (
                  <>
                    <img
                      src={uploadedImage}
                      alt="업로드된 사진"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImage(null);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center z-10"
                      style={{
                        background: "rgba(26,29,35,0.7)",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M9 1L1 9M1 1L9 9"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <div className="absolute inset-0 border-[1.5px] border-dashed border-[#e9dfc8] rounded-[4px] pointer-events-none" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div
                      className={`transition-opacity ${isDragging ? "opacity-100" : "opacity-60"}`}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M16 8V24M8 16H24"
                          stroke="#8f7755"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-[10px] tracking-[0.4px] text-center leading-[1.5] text-[#8f7755]"
                      style={{
                        fontFamily: "Elice DX Neolli",
                        fontWeight: 500,
                      }}
                    >
                      사진을 드래그하거나
                      <br />
                      이미지 파일을 선택하세요
                    </p>
                    <p
                      className="text-[9px] tracking-[0.18px] text-[#cdb792]"
                      style={{
                        fontFamily: "Elice DX Neolli",
                        fontWeight: 300,
                      }}
                    >
                      JPG, PNG, HEIC 파일 지원
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center my-1">
              <svg
                width="280"
                height="12"
                viewBox="0 0 280 12"
                fill="none"
              >
                <path
                  d="M8 6H272"
                  stroke="#E9DFC8"
                  strokeDasharray="8 16"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* STEP 02 — Name */}
            <div className="flex flex-col items-center pt-4 pb-6 px-10">
              <p
                className="text-[#628d38] text-[11px] tracking-[1.1px] mb-[10px] text-center"
                style={{
                  fontFamily: "Galmuri11",
                  fontWeight: 700,
                }}
              >
                STEP 02
              </p>
              <p
                className="text-[#32322d] text-[18px] tracking-[0.9px] leading-[1.4] mb-[6px] text-center"
                style={{
                  fontFamily: "Elice DX Neolli",
                  fontWeight: 500,
                }}
              >
                이 캐릭터의 이름을
                <br />
                작성해주세요
              </p>
              <p
                className="text-[#6a6a61] text-[10px] tracking-[0.4px] mb-4 text-center"
                style={{
                  fontFamily: "Elice DX Neolli",
                  fontWeight: 300,
                }}
              >
                아쉽게도 특수문자는 사용할 수 없어요
              </p>
              <div className="w-[240px] mb-5">
                <input
                  type="text"
                  value={characterName}
                  onChange={handleNameChange}
                  placeholder="이름을 작성해주세요"
                  className="h-[56px] w-full rounded-[12px] bg-white px-4 text-[14px] tracking-[0.84px] text-[#32322d] placeholder:text-[#a4a499] focus:outline-none focus:ring-2 focus:ring-[#628d38]"
                  style={{
                    fontFamily: "Elice DX Neolli",
                    fontWeight: 300,
                    border: "1px solid #e9dfc8",
                  }}
                />
              </div>
              <PixelButton
                onClick={handleConvert}
                disabled={!isButtonActive}
              >
                <span
                  className="text-[16px] tracking-[1.6px] text-white text-center w-full"
                  style={{
                    fontFamily: "Elice DX Neolli",
                    fontWeight: 500,
                  }}
                >
                  변환하기
                </span>
              </PixelButton>
            </div>
          </WindowPanel>
        </div>

        {/* ── Below-fold panels ───────────────────── */}
        <div
          ref={bottomRef}
          className="mt-4 flex flex-col gap-4"
        >
          <AnimatedPanel visible={phase === "processing"}>
            <ProcessingPanel onDone={handleProcessingDone} />
          </AnimatedPanel>

          <AnimatedPanel
            visible={["pack", "dim", "result"].includes(phase)}
          >
            <CardPackPanel onOpen={handleOpenPack} />
          </AnimatedPanel>
        </div>
      </div>

      {/* ── Full-screen pack-opening overlay ──── */}
      {(phase === "dim" || phase === "result") &&
        uploadedImage && (
          <PackOpeningOverlay
            uploadedImage={uploadedImage}
            characterName={characterName}
            onResult={handleResult}
          />
        )}
    </div>
  );
}