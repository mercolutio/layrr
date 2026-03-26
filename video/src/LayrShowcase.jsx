import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";

const ACCENT = "#c8ff00";
const BG = "#050505";
const TEXT = "#ffffff";
const TEXT_SEC = "rgba(255,255,255,0.5)";
const BORDER = "rgba(255,255,255,0.08)";

// ---- Helpers ----
const fadeSlide = (frame, start, direction = "up") => {
  const opacity = interpolate(frame - start, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const y = direction === "up"
    ? interpolate(frame - start, [0, 20], [60, 0], { extrapolateRight: "clamp" })
    : interpolate(frame - start, [0, 20], [-40, 0], { extrapolateRight: "clamp" });
  return { opacity, transform: `translateY(${y}px)` };
};

const fadeOut = (frame, start, dur = 10) => {
  const opacity = interpolate(frame - start, [0, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return { opacity };
};

// ---- Scene 1: Logo Intro ----
const SceneLogo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const dotOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: "clamp" });
  const dotScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 8, stiffness: 200 } });
  const ringScale = interpolate(frame, [0, 40], [0.5, 1], { extrapolateRight: "clamp" });
  const ringOpacity = interpolate(frame, [0, 20], [0, 0.15], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const subY = interpolate(frame, [35, 50], [20, 0], { extrapolateRight: "clamp" });

  const exitOpacity = frame > 75 ? interpolate(frame, [75, 85], [1, 0], { extrapolateRight: "clamp" }) : 1;

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center", opacity: exitOpacity }}>
      {/* Rings */}
      <div style={{
        position: "absolute",
        width: 600, height: 600,
        borderRadius: "50%",
        border: `3px solid ${ACCENT}`,
        opacity: ringOpacity,
        transform: `scale(${ringScale})`,
      }} />
      <div style={{
        position: "absolute",
        width: 460, height: 460,
        borderRadius: "50%",
        border: `2px solid ${ACCENT}`,
        opacity: ringOpacity * 0.5,
        transform: `scale(${ringScale})`,
      }} />

      {/* Logo */}
      <div style={{ transform: `scale(${scale})`, display: "flex", alignItems: "baseline" }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 120,
          color: TEXT,
          letterSpacing: -4,
        }}>LAYRR</span>
        <div style={{
          width: 14, height: 14,
          borderRadius: "50%",
          background: ACCENT,
          marginLeft: 4,
          marginBottom: 8,
          opacity: dotOpacity,
          transform: `scale(${dotScale})`,
        }} />
      </div>

      {/* Tagline */}
      <div style={{
        position: "absolute",
        bottom: 700,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        fontFamily: "Helvetica Neue, Arial, sans-serif",
        fontSize: 32,
        color: TEXT_SEC,
        letterSpacing: 4,
        textTransform: "uppercase",
      }}>
        Webdesign-Agentur
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 2: Headline + Claim ----
const SceneClaim = () => {
  const frame = useCurrentFrame();
  const lineAnim = interpolate(frame, [0, 20], [0, 200], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Accent line */}
      <div style={{
        position: "absolute", top: 500, left: 80,
        width: lineAnim, height: 4,
        background: ACCENT, borderRadius: 2,
      }} />

      <div style={{ ...fadeSlide(frame, 5), textAlign: "center" }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 72,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.15,
          letterSpacing: -2,
        }}>
          Webdesign, das{"\n"}
          <span style={{ color: ACCENT }}>begeistert.</span>
        </span>
      </div>

      <div style={{ ...fadeSlide(frame, 25), position: "absolute", bottom: 650, textAlign: "center", padding: "0 60px" }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 34,
          color: TEXT_SEC,
          lineHeight: 1.5,
        }}>
          Moderne Websites für kleine Unternehmen.{"\n"}In 7 Tagen online.
        </span>
      </div>

      {frame > 70 && <div style={fadeOut(frame, 85, 10)}><AbsoluteFill /></div>}
    </AbsoluteFill>
  );
};

// ---- Scene 3: Services ----
const SceneServices = () => {
  const frame = useCurrentFrame();
  const services = [
    { num: "01", title: "Webdesign", desc: "Atemberaubend & mobilfreundlich" },
    { num: "02", title: "SEO", desc: "Lokal gefunden werden" },
    { num: "03", title: "Branding", desc: "Einzigartige Identität" },
    { num: "04", title: "Wartung", desc: "Sorglos-Paket ab 29€/Monat" },
  ];

  return (
    <AbsoluteFill style={{ background: BG, padding: 80, justifyContent: "center" }}>
      <div style={{ ...fadeSlide(frame, 0, "down") }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 24,
          fontWeight: 600,
          color: ACCENT,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}>Leistungen</span>
      </div>

      <div style={{ marginTop: 50 }}>
        {services.map((s, i) => {
          const delay = 10 + i * 12;
          return (
            <div key={i} style={{
              ...fadeSlide(frame, delay),
              display: "flex",
              alignItems: "center",
              padding: "36px 0",
              borderBottom: `1px solid ${BORDER}`,
            }}>
              <span style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontSize: 28,
                color: ACCENT,
                fontWeight: 700,
                width: 80,
                fontVariantNumeric: "tabular-nums",
              }}>{s.num}</span>
              <div>
                <div style={{
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                  fontSize: 42,
                  fontWeight: 700,
                  color: TEXT,
                }}>{s.title}</div>
                <div style={{
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                  fontSize: 26,
                  color: TEXT_SEC,
                  marginTop: 6,
                }}>{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 4: Branchen ----
const SceneBranchen = () => {
  const frame = useCurrentFrame();
  const branchen = [
    "Solarfirmen",
    "Wärmepumpenfirmen",
    "SHK-Betriebe",
    "Lokale Firmen",
    "Werkstätten",
    "KFZ-Gutachter",
  ];

  return (
    <AbsoluteFill style={{ background: BG, padding: 80, justifyContent: "center" }}>
      <div style={{ ...fadeSlide(frame, 0, "down") }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 24,
          fontWeight: 600,
          color: ACCENT,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}>Branchen</span>
      </div>

      <div style={{ ...fadeSlide(frame, 8), marginTop: 30 }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 44,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.2,
        }}>Spezialisiert auf Ihre Branche.</span>
      </div>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        {branchen.map((b, i) => {
          const delay = 18 + i * 8;
          const s = spring({ frame: Math.max(0, frame - delay), fps: 30, config: { damping: 12 } });
          return (
            <div key={i} style={{
              opacity: interpolate(frame - delay, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `scale(${s})`,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${BORDER}`,
              borderRadius: 14,
              padding: "22px 36px",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontSize: 30,
              fontWeight: 600,
              color: TEXT,
            }}>{b}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---- Scene 5: Stats ----
const SceneStats = () => {
  const frame = useCurrentFrame();
  const stats = [
    { value: "7", label: "Tage bis online" },
    { value: "33", label: "Städte in Niedersachsen" },
    { value: "198", label: "Landing Pages" },
  ];

  return (
    <AbsoluteFill style={{ background: BG, padding: 80, justifyContent: "center", alignItems: "center" }}>
      {stats.map((s, i) => {
        const delay = 5 + i * 18;
        const numScale = spring({ frame: Math.max(0, frame - delay), fps: 30, config: { damping: 10, stiffness: 100 } });
        return (
          <div key={i} style={{
            ...fadeSlide(frame, delay),
            textAlign: "center",
            marginBottom: 70,
          }}>
            <div style={{
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontSize: 110,
              fontWeight: 800,
              color: ACCENT,
              transform: `scale(${numScale})`,
              lineHeight: 1,
            }}>{s.value}</div>
            <div style={{
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontSize: 30,
              color: TEXT_SEC,
              marginTop: 10,
              letterSpacing: 1,
            }}>{s.label}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---- Scene 6: CTA ----
const SceneCTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btnScale = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 10, stiffness: 120 } });
  const pulseOpacity = interpolate(Math.sin((frame - 40) * 0.12), [-1, 1], [0.3, 0.8]);

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Glow */}
      <div style={{
        position: "absolute",
        width: 500, height: 500,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(200,255,0,0.12) 0%, transparent 70%)`,
        opacity: pulseOpacity,
      }} />

      <div style={{ ...fadeSlide(frame, 0), textAlign: "center" }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 60,
          fontWeight: 800,
          color: TEXT,
          lineHeight: 1.2,
        }}>
          Bereit für Ihre{"\n"}neue Website?
        </span>
      </div>

      <div style={{
        ...fadeSlide(frame, 15),
        marginTop: 40,
        textAlign: "center",
      }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 28,
          color: TEXT_SEC,
        }}>Kostenloses Erstgespräch — unverbindlich.</span>
      </div>

      {/* Button */}
      <div style={{
        marginTop: 60,
        transform: `scale(${btnScale})`,
        background: ACCENT,
        borderRadius: 60,
        padding: "26px 64px",
      }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: 30,
          fontWeight: 700,
          color: BG,
        }}>layrr.de</span>
      </div>

      {/* Logo bottom */}
      <div style={{
        position: "absolute",
        bottom: 120,
        ...fadeSlide(frame, 35),
        display: "flex",
        alignItems: "baseline",
      }}>
        <span style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 36,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: -1,
        }}>LAYRR</span>
        <div style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: ACCENT,
          marginLeft: 2,
          marginBottom: 3,
          opacity: 0.5,
        }} />
      </div>
    </AbsoluteFill>
  );
};

// ---- Main Composition ----
export const LayrShowcase = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Sequence from={0} durationInFrames={90}>
        <SceneLogo />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <SceneClaim />
      </Sequence>
      <Sequence from={180} durationInFrames={80}>
        <SceneServices />
      </Sequence>
      <Sequence from={260} durationInFrames={80}>
        <SceneBranchen />
      </Sequence>
      <Sequence from={340} durationInFrames={70}>
        <SceneStats />
      </Sequence>
      <Sequence from={410} durationInFrames={40}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
