import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import jupiterLogo from "./assets/jupiter.svg";
import raydiumLogo from "./assets/raydium.svg";
import discordLogo from "./assets/discord.svg";
import xLogo from "./assets/x.svg";
import telegramLogo from "./assets/telegram.svg";
import fart1 from "./assets/fart1.wav";
import fart2 from "./assets/fart2.wav";
import fart3 from "./assets/fart3.wav";
import fart4 from "./assets/fart4.wav";
import fart5 from "./assets/fart5.wav";


const CONTRACT_ADDRESS = "BdPz9uXFfPgo8WD6M3qoZTFEAfUwhMyVrdF3jUwsYVTg";
const floatingWords = [
  "PRESS  F  TO  FART",
  "START FART",
  "START PUMP FART",
  "PUMP FART INITIALIZED",
  "RUNNING GAS.EXE",
  "SYSTEM FARTING...",
  "truth terminal",
  "HOLD TIGHT",
  "DEPLOYING FART",
  "CHECKSUM_OK",
  "01010000 01010101 01001101 01010000 01000110 01000001 01010010 01010100", // PUMPFART
  "01000110 01000001 01010010 01010100", // FART
  "01010000 01010101 01001101 01010000", // PUMP
  "01000110 01010101 01000011 01001011 00100000 01010000 01010101 01001101 01010000 01000110 01010101 01001110", 
  "01000110 01000001 01010010 01010100 00100000 01001111 01001110 00100000 01010000 01010101 01001101 01010000 01000110 01010101 01001110", 
  
];

const randomBinaryLine = (length = 80) => {
  let s = "";
  for (let i = 0; i < length; i++) {
    s += Math.random() > 0.5 ? "1" : "0";
  }
  return s;
};

const TARGET_DATE = new Date(Date.UTC(2025, 7, 23, 14, 0, 0));
const formatCountdown = (diffMs) => {
  if (diffMs <= 0) return "00d 00h 00m 00s";
  const totalSec = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(
    mins
  ).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
};

const randomFloatWord = () => ({
  text: floatingWords[Math.floor(Math.random() * floatingWords.length)],
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 12 + Math.random() * 14,
  opacity: 0.03 + Math.random() * 0.07,
  glow: false,
  key: crypto.randomUUID(),
  rotate: (Math.random() - 0.5) * 20,
});

const App = () => {
  const [bgLines, setBgLines] = useState(
    () => Array.from({ length: 30 }, () => randomBinaryLine())
  );
  const [headline, setHeadline] = useState("INITIALIZING PUMPF");
  const [secret, setSecret] = useState("");
  const [countdown, setCountdown] = useState(() => formatCountdown(TARGET_DATE - new Date()));
  const [floaters, setFloaters] = useState(() =>
    Array.from({ length: 25 }, () => randomFloatWord())
  );
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgLines((prev) => {
        const next = prev.slice(1);
        next.push(randomBinaryLine());
        return next;
      });
      setCountdown(formatCountdown(TARGET_DATE - new Date()));
      setFloaters((prev) =>
        prev.map((f) => {
          const shouldGlow = Math.random() < 0.05;
          return {
            ...f,
            glow: shouldGlow ? true : f.glow && Math.random() < 0.3 ? false : f.glow,
          };
        })
      );
      if (Math.random() < 0.1) {
        setFloaters((prev) => {
          const idx = Math.floor(Math.random() * prev.length);
          const copy = [...prev];
          copy[idx] = randomFloatWord();
          return copy;
        });
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (e.key.toLowerCase() === "f") {
        setSecret("💨 FART SEQUENCE ACTIVATED 💨");
        setHeadline("PUMPFART PROTOCOL ENGAGED");
        setTimeout(() => {
          setSecret("");
          setHeadline("INITIALIZING PUMPFART");
        }, 1800);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const onLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => (clickCount.current = 0), 1000);
    if (clickCount.current >= 5) {
      setSecret("🕵️‍♂️ SECRET MODE UNLOCKED: truth terminal active");
      clickCount.current = 0;
      setTimeout(() => setSecret(""), 3000);
    }
  };

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setSecret("✅ Contract copied");
      setTimeout(() => setSecret(""), 1500);
    } catch {
      setSecret("❌ Copy failed");
      setTimeout(() => setSecret(""), 1500);
    }
  };

  return (
    <div className="app">
      
      {/* mots flottants dispatchés */}
{floaters.map((f) => (
  <div
    key={f.key}
    className={`floater ${f.glow ? "glow" : ""}`}
    style={{
      top: `${f.top}%`,
      left: `${f.left}%`,
      opacity: f.opacity,
    }}
    aria-label={f.text}
  >
    {f.text}
        </div>
      ))}

      <div className="content">
        <header className="topbar">
          <div className="logo" onClick={onLogoClick}>
            <img src={logo} alt="Pump.fart logo" className="logo-img" />
            <div className="wordmark">Pump.Fart</div>
          </div>
          <div className="contract-box">
            <div className="label">Contract:</div>
            <div className="addr">{CONTRACT_ADDRESS}</div>
            <button className="copy-btn" onClick={copyContract}>
              Copy
            </button>
          </div>
        </header>

        {/* main card */}
        <div className="main-card">
          <div className="headline">
            <span className="prompt">&gt;</span> {headline}
            <span className="cursor" />
          </div>
          <div className="subline">
            &gt; Blowing up Web3, one fart at a time
          </div>

          <div className="countdown-box">
            <div className="countdown-label">Launch in:</div>
            <div className="countdown-value">{countdown}</div>
          </div>

          <div className="quote-box">
            <div className="quote">
              "OF = OnlyFart"
            </div>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="label">{">"} CIRCULATING SUPPLY:</div>
              <div className="value">998.84M</div>
            </div>
            <div className="metric">
              <div className="label">{">"} MARKET CAP:</div>
              <div className="value">Coming soon</div>
            </div>
          </div>
        </div>

        {/* > ABOUT PUMPF */}
        <div className="exchange-section">
          <div className="section-title">&gt; ABOUT PUMPF</div>
          <div className="about-text">
            $PUMPF is a community-driven meme coin on the Solana Blockchain. It has no association with Pump.fun.
            Pump.fart is not a suppository but literally a farting pill. This meme coin carries no intrinsic value or expectation of financial return. Trade Less. Fart More.
          </div>
        </div>


        {/* Community & Partners */}
<div className="exchange-section">
  <div className="section-title">&gt; COMMUNITY</div>
  <div className="cards-row">
    

    <div className="exchange-card">
      <div className="icon-svg">
        <img src={xLogo} alt="X" className="inline-logo" />
      </div>
      <div className="name">X</div>
      <div className="action">
        <a className="trade-btn" href="https://x.com/pumpfdotfart" target="_blank" rel="noopener noreferrer">
          Follow <span className="arrow">↗</span>
        </a>
      </div>
    </div>

    <div className="exchange-card">
      <div className="icon-svg">
        <img src={telegramLogo} alt="Telegram" className="inline-logo" />
      </div>
      <div className="name">Telegram</div>
      <div className="action">
        <a className="trade-btn" href="https://t.me/pumpfdotfart" target="_blank" rel="noopener noreferrer">
          Join <span className="arrow">↗</span>
        </a>
      </div>
    </div>
  </div>
  <div className="subnote">
    &gt; More community hubs coming soon. Stay tuned for updates.
  </div>
</div>


        {/* fart trigger */}
<div className="fart-button-wrapper">
  <div className="hint">
    PRESS <span className="key">F</span> TO <span className="key">FART</span>
  </div>
  <div
    className="fart-button"
    onClick={() => {
      // Liste des sons importés
      const sounds = [fart1, fart2, fart3, fart4, fart5];

      // Choisir un son au hasard
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      // Jouer le son
      const audio = new Audio(randomSound);
      audio.play();

      // Modifier le texte
      setSecret("💨 Manual fart triggered 💨");
      setHeadline("PUMPFART PROTOCOL ENGAGED");

      setTimeout(() => {
        setSecret("");
        setHeadline("INITIALIZING PUMPFART");
      }, 1800);
    }}
  >
            PRESS <span className="key-box">F</span> TO FART
          </div>
        </div>

        {secret && <div className="toast">{secret}</div>}
      </div>

      <footer className="footer">
  <div className="disclaimer">
    &gt; $PUMPF is a meme coin with no intrinsic value or financial return expectation.<br />
    &gt; This token exists purely for entertainment purposes.
  </div>
  <div className="tiny">
    © 2025 Pump.Fart. All rights reserved.
  </div>
</footer>

    </div>
  );
};

export default App;
