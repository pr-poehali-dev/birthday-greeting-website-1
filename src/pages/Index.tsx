import { useState, useRef, useCallback } from "react";

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "circle" | "rect" | "star";
}

const CONFETTI_COLORS = [
  "#FF9B9B", "#FFB347", "#FFD700", "#FF69B4",
  "#87CEEB", "#98FB98", "#DDA0DD", "#F0E68C",
  "#FFA07A", "#E6E6FA", "#FFDAB9", "#B0E0E6",
];

function ConfettiParticle({ piece }: { piece: Confetti }) {
  const style: React.CSSProperties = {
    position: "fixed",
    left: `${piece.x}%`,
    top: "-20px",
    width: piece.shape === "rect" ? `${piece.size * 2}px` : `${piece.size}px`,
    height: `${piece.size}px`,
    backgroundColor: piece.color,
    borderRadius: piece.shape === "circle" ? "50%" : "2px",
    animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
    zIndex: 999,
    pointerEvents: "none",
  };
  return <div style={style} />;
}

function Cake({ onClick, clicked }: { onClick: () => void; clicked: boolean }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onClick();
  };

  return (
    <div
      className={`cursor-pointer select-none transition-transform duration-200 ${pressed ? "scale-95" : "hover:scale-105"}`}
      style={{
        animation: "float 3s ease-in-out infinite",
        filter: pressed ? "brightness(1.1)" : "none",
      }}
      onClick={handleClick}
      title="Нажми на тортик!"
    >
      <svg width="260" height="230" viewBox="0 0 260 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Candles */}
        {[58, 95, 130, 165, 200].map((cx, i) => (
          <g key={i}>
            {!clicked && (
              <ellipse
                cx={cx}
                cy={60}
                rx={6}
                ry={10}
                fill="url(#flame)"
                style={{
                  transformOrigin: `${cx}px 60px`,
                  animation: "flame 0.8s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            )}
            <rect
              x={cx - 5} y={68} width={10} height={28} rx={3}
              fill={["#FF6B9D","#FF9500","#FFD60A","#34C759","#5AC8FA"][i]}
            />
          </g>
        ))}

        {/* Top tier */}
        <ellipse cx="130" cy="98" rx="88" ry="14" fill="#FDECEA" />
        <rect x="42" y="96" width="176" height="38" fill="#FDECEA" />
        <ellipse cx="130" cy="134" rx="88" ry="14" fill="#F9C8C8" />
        {[55,82,108,138,164,192].map((x, i) => (
          <ellipse key={i} cx={x} cy={99} rx={9} ry={12} fill="white" opacity="0.85" />
        ))}
        {[68,108,148,188].map((x, i) => (
          <circle key={i} cx={x} cy={115} r={5} fill={["#FF9B9B","#FFD700","#FF69B4","#87CEEB"][i]} />
        ))}

        {/* Middle tier */}
        <ellipse cx="130" cy="134" rx="98" ry="15" fill="#FFF0F5" />
        <rect x="32" y="132" width="196" height="44" fill="#FFF0F5" />
        <ellipse cx="130" cy="176" rx="98" ry="15" fill="#FADADD" />
        {[42,70,98,128,158,186,216].map((x, i) => (
          <ellipse key={i} cx={x} cy={135} rx={10} ry={13} fill="white" opacity="0.8" />
        ))}
        {[68,130,192].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={154} r={8} fill="none" stroke="#FFAEC9" strokeWidth={2} opacity={0.7} />
            <circle cx={x} cy={154} r={3} fill="#FFAEC9" opacity={0.6} />
          </g>
        ))}

        {/* Bottom tier */}
        <ellipse cx="130" cy="176" rx="108" ry="16" fill="#FEF3E2" />
        <rect x="22" y="174" width="216" height="46" fill="#FEF3E2" />
        <ellipse cx="130" cy="220" rx="108" ry="16" fill="#FFE0B2" />
        {[35,62,90,118,145,173,200,220].map((x, i) => (
          <ellipse key={i} cx={x} cy={177} rx={11} ry={14} fill="white" opacity={0.75} />
        ))}
        {[55,100,160,205].map((x, i) => (
          <text key={i} x={x} y={203} fontSize={14} textAnchor="middle" fill={["#FF9B9B","#FFD700","#FF69B4","#87CEEB"][i]}>✿</text>
        ))}
        {Array.from({length: 17}).map((_, i) => (
          <circle key={i} cx={24 + i * 13} cy={219} r={5}
            fill={["#FF9B9B","#FFD700","#FF69B4","#87CEEB","#98FB98"][i % 5]}
          />
        ))}

        {/* Plate */}
        <ellipse cx="130" cy="220" rx="118" ry="10" fill="#F5E6D3" />
        <ellipse cx="130" cy="220" rx="110" ry="7" fill="#EDD9BD" />

        <defs>
          <radialGradient id="flame" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="40%" stopColor="#FFD60A" />
            <stop offset="70%" stopColor="#FF9500" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {!clicked && (
        <div className="text-center mt-2">
          <span
            style={{
              fontFamily: "Caveat, cursive",
              color: "#E8857A",
              fontSize: 20,
              letterSpacing: "0.02em",
            }}
          >
            Нажми, чтобы задуть свечи ✨
          </span>
        </div>
      )}
    </div>
  );
}

function Letter({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className="w-full max-w-lg mx-auto px-4 mt-8"
      style={{
        animation: "letter-open 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <div
        className="relative rounded-3xl p-8"
        style={{
          background: "linear-gradient(135deg, #fffdf9 0%, #fef6ee 50%, #fdf0f8 100%)",
          border: "2px solid rgba(255,180,150,0.3)",
          boxShadow: "0 20px 60px rgba(255,150,120,0.15), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <span className="absolute top-4 left-5 text-2xl opacity-50">🌸</span>
        <span className="absolute top-4 right-5 text-2xl opacity-50">🌸</span>
        <span className="absolute bottom-4 left-5 text-xl opacity-40">🌷</span>
        <span className="absolute bottom-4 right-5 text-xl opacity-40">🌷</span>

        <div className="text-center mb-5">
          <p
            style={{
              fontFamily: "Cormorant, serif",
              fontStyle: "italic",
              color: "#C97B6E",
              fontSize: 14,
              letterSpacing: "0.18em",
              marginBottom: 6,
            }}
          >
            — с особым теплом —
          </p>
          <h2
            style={{
              fontFamily: "Cormorant, serif",
              fontWeight: 600,
              color: "#5C2D2D",
              fontSize: 40,
              lineHeight: 1,
            }}
          >
            С Днём Рождения, Дима!
          </h2>
          <div className="flex justify-center gap-1 mt-3 text-xl">
            {"🎂🎁🥂🎉🌟".split("").map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `fade-up 0.4s ease-out ${0.1 + i * 0.08}s both`,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(201,123,110,0.3))" }} />
          <span style={{ color: "#C97B6E" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(201,123,110,0.3))" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p
            style={{
              fontFamily: "Caveat, cursive",
              textAlign: "center",
              color: "#1a1a1a",
              fontSize: 22,
              lineHeight: 1.5,
            }}
          >
            Дима, в этот особенный день желаю тебе
            всего самого светлого и радостного!
          </p>
          <p
            style={{
              fontFamily: "Caveat, cursive",
              textAlign: "center",
              color: "#222222",
              fontSize: 21,
              lineHeight: 1.5,
            }}
          >
            Пусть каждый день приносит улыбку,
            любовь окружает со всех сторон,
            а мечты сбываются одна за другой ✨
          </p>
          <p
            style={{
              fontFamily: "Caveat, cursive",
              textAlign: "center",
              color: "#2d2d2d",
              fontSize: 20,
              lineHeight: 1.5,
            }}
          >
            Ты заслуживаешь лучшего —
            пусть этот год станет самым счастливым!
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(201,123,110,0.3))" }} />
          <span style={{ color: "#C97B6E" }}>✦</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(201,123,110,0.3))" }} />
        </div>

        <div className="text-center">
          <p
            style={{
              fontFamily: "Caveat, cursive",
              color: "#C97B6E",
              fontSize: 26,
              letterSpacing: "0.02em",
            }}
          >
            С любовью и теплом 💝
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [cakeClicked, setCakeClicked] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showLetter, setShowLetter] = useState(false);
  const idRef = useRef(0);

  const spawnConfetti = useCallback(() => {
    const pieces: Confetti[] = Array.from({ length: 90 }, () => ({
      id: idRef.current++,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 9 + 6,
      duration: Math.random() * 2.5 + 2,
      delay: Math.random() * 1.8,
      shape: (["circle", "rect", "star"] as const)[Math.floor(Math.random() * 3)],
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 5500);
  }, []);

  const handleCakeClick = useCallback(() => {
    setCakeClicked(true);
    spawnConfetti();
    setTimeout(() => setShowLetter(true), 800);
  }, [spawnConfetti]);

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #FFF5F5 0%, #FFF9EE 35%, #FFF0F8 65%, #F5F0FF 100%)",
      }}
    >
      {/* Soft background blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,182,193,0.2) 0%, transparent 70%)",
          top: "-100px", left: "-100px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,220,150,0.15) 0%, transparent 70%)",
          bottom: "0px", right: "-50px",
        }}
      />

      {/* Floating dots */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${14 + (i % 4) * 10}px`,
            height: `${14 + (i % 4) * 10}px`,
            left: `${(i * 19 + 5) % 92}%`,
            top: `${(i * 16 + 8) % 88}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            opacity: 0.07 + (i % 3) * 0.025,
            animation: `float ${3.5 + (i % 3) * 0.8}s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <ConfettiParticle key={piece.id} piece={piece} />
      ))}

      <div className="relative z-10 flex flex-col items-center min-h-screen py-12 px-4">
        {/* Header */}
        <div
          className="text-center mb-8"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <p
            style={{
              fontFamily: "Cormorant, serif",
              fontStyle: "italic",
              color: "#C97B6E",
              fontSize: 15,
              letterSpacing: "0.22em",
              marginBottom: 8,
            }}
          >
            ✦ праздничное поздравление ✦
          </p>
          <h1
            style={{
              fontFamily: "Cormorant, serif",
              fontWeight: 600,
              color: "#3D1A1A",
              fontSize: "clamp(38px, 8vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            С Днём{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF8C7A 0%, #FF6B9D 50%, #C97B6E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Рождения,
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FF6B9D 0%, #FFB347 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Дима!
            </span>
          </h1>
          <div
            style={{
              width: 60, height: 3,
              background: "linear-gradient(to right, #FF9B9B, #FFD700, #FF69B4)",
              borderRadius: 99,
              margin: "12px auto 0",
            }}
          />
        </div>

        {/* Status badge */}
        {!cakeClicked && (
          <div
            style={{
              marginBottom: 24,
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255,155,155,0.12)",
              border: "1.5px solid rgba(255,155,155,0.35)",
              color: "#C97B6E",
              animation: "pulse-soft 2s ease-in-out infinite",
            }}
          >
            <span style={{ fontFamily: "Caveat, cursive", fontSize: 19 }}>
              🎂 Нажми на тортик — задуй свечи!
            </span>
          </div>
        )}

        {cakeClicked && !showLetter && (
          <div
            style={{
              marginBottom: 24,
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255,200,100,0.15)",
              border: "1.5px solid rgba(255,200,100,0.45)",
              color: "#B07A30",
              animation: "bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
            }}
          >
            <span style={{ fontFamily: "Caveat, cursive", fontSize: 19 }}>
              🎉 Загадывай желание...
            </span>
          </div>
        )}

        {/* Cake */}
        <Cake onClick={handleCakeClick} clicked={cakeClicked} />

        {/* Letter */}
        <Letter visible={showLetter} />

        {/* Footer */}
        <div
          className="mt-10 text-center"
          style={{
            fontFamily: "Cormorant, serif",
            color: "#D4A0A0",
            fontSize: 15,
            letterSpacing: "0.1em",
          }}
        >
          ✦ желаю счастья ✦
        </div>
      </div>
    </div>
  );
}