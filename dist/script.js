import $ from "https://esm.sh/jquery";
import "https://esm.sh/bootstrap";
import Plotly from "https://esm.sh/plotly.js-dist";

// =============================
// 首頁放大鏡效果
// =============================
document.addEventListener("mousemove", (e) => {
  const magnifier = document.querySelector(".magnifier");
  const truthLayer = document.querySelector(".truth-layer");

  if (!magnifier || !truthLayer) return;

  magnifier.style.display = "block";

  const x = e.clientX;
  const y = e.clientY;

  magnifier.style.left = `${x}px`;
  magnifier.style.top = `${y}px`;

  truthLayer.style.clipPath = `circle(150px at ${x}px ${y}px)`;
});

// =============================
// Clippy 圖片 hover
// =============================
const img2 = new Image();
img2.src =
  "https://raw.githubusercontent.com/ChewyChloe/web_design/main/img/paperclip2.png";

const paperClip = document.querySelector(".paperClip");

if (paperClip) {
  paperClip.addEventListener("mouseover", function () {
    this.setAttribute("src", img2.src);
  });

  paperClip.addEventListener("mouseout", function () {
    this.setAttribute(
      "src",
      "https://raw.githubusercontent.com/ChewyChloe/web_design/main/img/paperClip.png"
    );
  });
}

// =============================
// Skrollr 初始化
// =============================
if (typeof skrollr !== "undefined") {
  const s = skrollr.init();

  if (s.isMobile()) {
    s.destroy();
  }
}

// =============================
// 案例區圖片 hover
// =============================
$(document).ready(function () {
  $("#section_case img").hover(
    function () {
      $(this).css({
        transform: "scale(1.1) translateY(0px)",
        transition: "transform 0.3s ease",
        "z-index": "100"
      });
    },
    function () {
      $(this).css({
        transform: "",
        "z-index": ""
      });
    }
  );
});

// =============================
// 快時尚診斷動畫
// =============================
const fashionReportObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const report = entry.target;
        const dataResults = document.querySelector(
          "#case_fashion .data-results"
        );
        const fashionContent = document.querySelector(
          "#case_fashion .fashion-content-layer"
        );

        report.classList.add("is-active");

        if (dataResults) {
          dataResults.classList.add("is-active");
        }

        if (fashionContent) {
          fashionContent.classList.add("is-active");
        }

        fashionReportObserver.unobserve(report);
      }
    });
  },
  {
    threshold: 0.2
  }
);

const report = document.querySelector("#case_fashion .system-report");

if (report) {
  fashionReportObserver.observe(report);
}

// =============================
// Plotly 快時尚圖表
// =============================
function renderPlotlyCharts() {
  const marketSizeChart = document.getElementById("marketSizeChart");
  const marketShareChart = document.getElementById("marketShareChart");

  if (!marketSizeChart || !marketShareChart) return;

  const trace1 = {
    x: ["2021", "2022", "2023", "2024", "2025", "2026", "2027"],
    y: [91.23, 106.42, 122.98, 136.19, 150.82, 167.02, 184.96],
    type: "bar",
    marker: {
      color: [
        "#4f6848",
        "#5b7a54",
        "#7a9e73",
        "#99b489",
        "#b8c9a0",
        "#d1d99e",
        "#e0ca7d"
      ]
    },
    hovertemplate: "$%{y} Billion<extra></extra>"
  };

  const layout1 = {
    title: {
      text: "Fast Fashion Market Size Over The Years",
      font: { color: "#fff", size: 14 }
    },
    paper_bgcolor: "#1a1a1a",
    plot_bgcolor: "#1a1a1a",
    margin: { t: 40, b: 40, l: 50, r: 20 },
    font: { color: "#99b489", family: "Courier New" }
  };

  const trace2 = {
    values: [50, 13, 16, 11, 6, 4],
    labels: ["SHEIN", "ZARA", "H&M", "Fashion Nova", "Forever 21", "others"],
    type: "pie",
    marker: {
      colors: ["#5b7a54", "#7a9e73", "#99b489", "#b8c9a0", "#e0ca7d", "#d1d99e"]
    },
    hoverinfo: "label+percent",
    textinfo: "label"
  };

  const layout2 = {
    title: {
      text: "Leading Fast Fashion Brands As per Market Share",
      font: { color: "#fff", size: 14 }
    },
    paper_bgcolor: "#1a1a1a",
    font: { color: "#fff", family: "Courier New" },
    showlegend: false,
    margin: { t: 40, b: 20, l: 20, r: 20 }
  };

  Plotly.newPlot("marketSizeChart", [trace1], layout1, {
    responsive: true,
    displayModeBar: false
  });

  Plotly.newPlot("marketShareChart", [trace2], layout2, {
    responsive: true,
    displayModeBar: false
  });
}

const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
        setTimeout(renderPlotlyCharts, 4500);
        chartObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const chartResults = document.querySelector("#case_fashion .data-results");

if (chartResults) {
  chartObserver.observe(chartResults);
}

// =============================
// 快時尚：拆穿濾鏡按鈕
// =============================
document.querySelectorAll(".reveal-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".method-card");
    if (!card) return;

    card.classList.toggle("is-revealed");

    if (card.classList.contains("is-revealed")) {
      btn.textContent = "收起濾鏡";
    } else {
      btn.textContent = "拆穿濾鏡";
    }
  });
});

// =============================
// 快時尚：品牌案例 tabs
// =============================
document.querySelectorAll(".case-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.case;

    document.querySelectorAll(".case-tab").forEach((item) => {
      item.classList.remove("is-active");
    });

    document.querySelectorAll(".case-panel").forEach((panel) => {
      panel.classList.remove("is-active");
    });

    tab.classList.add("is-active");

    const activePanel = document.querySelector(`[data-panel="${target}"]`);

    if (activePanel) {
      activePanel.classList.add("is-active");
    }
  });
});

// =============================
// 快時尚：收據時間線列印動畫
// =============================
const receiptObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rows = entry.target.querySelectorAll(".receipt-row");

        rows.forEach((row, index) => {
          setTimeout(() => {
            row.classList.add("is-printed");
          }, index * 280);
        });

        receiptObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3
  }
);

document.querySelectorAll(".receipt-timeline").forEach((receiptTimeline) => {
  receiptObserver.observe(receiptTimeline);
});

// =============================
// 化石燃料 × 漂綠
// =============================

(() => {
  const fuelSection = document.querySelector("#case_fuel");
  const fuelHero = document.querySelector("#fuelMotionHero");
  const fuelCanvas = document.querySelector("#fuelMatrixCanvas");
  const fuelMagneticCards = document.querySelectorAll(
    "#case_fuel [data-magnetic]"
  );
  const fuelJumpLinks = document.querySelectorAll(
    "#case_fuel [data-fuel-jump]"
  );
  const fuelToggleButtons = document.querySelectorAll(
    "#case_fuel .fuel-toggle"
  );

  if (!fuelSection) return;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const lerp = (start, end, amount) => start + (end - start) * amount;

  function getPageOffsetTop(target, offset = 24) {
    return target.getBoundingClientRect().top + window.pageYOffset - offset;
  }

  const fuelMotionState = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.5,
    velocityX: 0,
    velocityY: 0,
    normalizedX: 0,
    normalizedY: 0,
    tiltX: 0,
    tiltY: 0,
    isInside: false
  };

  function updateFuelPointer(event) {
    const sectionRect = fuelSection.getBoundingClientRect();

    fuelMotionState.isInside = true;
    fuelMotionState.targetX = event.clientX;
    fuelMotionState.targetY = event.clientY;

    fuelMotionState.normalizedX =
      ((event.clientX - sectionRect.left) / sectionRect.width - 0.5) * 2;

    fuelMotionState.normalizedY =
      ((event.clientY - sectionRect.top) / sectionRect.height - 0.5) * 2;

    if (fuelHero) {
      const heroRect = fuelHero.getBoundingClientRect();

      const localX = (event.clientX - heroRect.left) / heroRect.width - 0.5;
      const localY = (event.clientY - heroRect.top) / heroRect.height - 0.5;

      fuelMotionState.tiltX = clamp(localX * 8, -8, 8);
      fuelMotionState.tiltY = clamp(localY * -7, -7, 7);
    }
  }

  function resetFuelPointer() {
    fuelMotionState.isInside = false;
    fuelMotionState.normalizedX = 0;
    fuelMotionState.normalizedY = 0;
    fuelMotionState.tiltX = 0;
    fuelMotionState.tiltY = 0;
  }

  function animateFuelMotion() {
    const previousX = fuelMotionState.x;
    const previousY = fuelMotionState.y;

    fuelMotionState.x = lerp(fuelMotionState.x, fuelMotionState.targetX, 0.18);
    fuelMotionState.y = lerp(fuelMotionState.y, fuelMotionState.targetY, 0.18);

    fuelMotionState.velocityX = fuelMotionState.x - previousX;
    fuelMotionState.velocityY = fuelMotionState.y - previousY;

    const mx = lerp(
      Number(fuelSection.style.getPropertyValue("--mx")) || 0,
      fuelMotionState.normalizedX,
      0.12
    );

    const my = lerp(
      Number(fuelSection.style.getPropertyValue("--my")) || 0,
      fuelMotionState.normalizedY,
      0.12
    );

    fuelSection.style.setProperty("--x", `${fuelMotionState.x}px`);
    fuelSection.style.setProperty("--y", `${fuelMotionState.y}px`);
    fuelSection.style.setProperty("--mx", mx.toFixed(4));
    fuelSection.style.setProperty("--my", my.toFixed(4));
    fuelSection.style.setProperty("--vx", fuelMotionState.velocityX.toFixed(4));
    fuelSection.style.setProperty("--vy", fuelMotionState.velocityY.toFixed(4));
    fuelSection.style.setProperty(
      "--tilt-x",
      `${fuelMotionState.tiltX.toFixed(3)}deg`
    );
    fuelSection.style.setProperty(
      "--tilt-y",
      `${fuelMotionState.tiltY.toFixed(3)}deg`
    );

    requestAnimationFrame(animateFuelMotion);
  }

  fuelSection.addEventListener("pointerenter", () => {
    fuelSection.classList.add("is-cursor-active");
  });

  fuelSection.addEventListener("pointermove", updateFuelPointer);

  fuelSection.addEventListener("pointerleave", () => {
    fuelSection.classList.remove("is-cursor-active");
    resetFuelPointer();
  });

  animateFuelMotion();

  fuelMagneticCards.forEach((card) => {
    let magneticFrameId = null;

    function resetMagneticCard() {
      card.style.setProperty("--mag-x", "0");
      card.style.setProperty("--mag-y", "0");
    }

    card.addEventListener("pointermove", (event) => {
      if (magneticFrameId) cancelAnimationFrame(magneticFrameId);

      magneticFrameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        const strength = clamp(1 - distance / 260, 0, 1);
        const magneticX = distanceX * 0.08 * strength;
        const magneticY = distanceY * 0.08 * strength;

        card.style.setProperty("--mag-x", magneticX.toFixed(2));
        card.style.setProperty("--mag-y", magneticY.toFixed(2));
      });
    });

    card.addEventListener("pointerleave", resetMagneticCard);
  });

  // =============================
  // Archive Nav Smooth Jump
  // =============================

  fuelJumpLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const selector = link.dataset.fuelJump;
      const target = document.querySelector(selector);

      if (!target) return;

      window.scrollTo({
        top: getPageOffsetTop(target, 24),
        behavior: "smooth"
      });
    });
  });

  fuelToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentItem = button.closest(".fuel-toggle-item");

      if (!currentItem) return;

      currentItem.classList.toggle("is-open");
    });
  });

  if (fuelCanvas) {
    const ctx = fuelCanvas.getContext("2d");

    const binaryCharacters = "01";
    const fontSize = 13;
    const rowGap = 26;
    const letterGap = 13;

    let rows = [];
    let animationId = null;
    let frame = 0;

    const pointerInfluence = {
      x: 0,
      y: 0
    };

    function randomBinaryLine(length) {
      let line = "";

      for (let i = 0; i < length; i += 1) {
        line += binaryCharacters.charAt(
          Math.floor(Math.random() * binaryCharacters.length)
        );
      }

      return line;
    }

    function resizeFuelBinaryWall() {
      fuelCanvas.width = fuelSection.offsetWidth;
      fuelCanvas.height = fuelSection.offsetHeight;

      const rowCount = Math.ceil(fuelCanvas.height / rowGap) + 2;
      const charsPerRow = Math.ceil(fuelCanvas.width / letterGap) + 18;

      rows = [];

      for (let y = 0; y < rowCount; y += 1) {
        rows.push({
          y: y * rowGap,
          xOffset: Math.random() * -120,
          text: randomBinaryLine(charsPerRow),
          speed: 0.012 + Math.random() * 0.028,
          opacity: 0.08 + Math.random() * 0.18,
          wave: Math.random() * Math.PI * 2,
          phase: Math.random() * 100
        });
      }
    }

    function mutateBinaryLine(line) {
      const characters = line.split("");
      const changeCount = Math.max(1, Math.floor(characters.length * 0.02));

      for (let i = 0; i < changeCount; i += 1) {
        const index = Math.floor(Math.random() * characters.length);

        characters[index] = binaryCharacters.charAt(
          Math.floor(Math.random() * binaryCharacters.length)
        );
      }

      return characters.join("");
    }

    function drawFuelBinaryWall() {
      frame += 1;

      ctx.clearRect(0, 0, fuelCanvas.width, fuelCanvas.height);

      ctx.fillStyle = "rgba(3, 6, 4, 0.72)";
      ctx.fillRect(0, 0, fuelCanvas.width, fuelCanvas.height);

      ctx.font = `${fontSize}px Courier New`;
      ctx.textBaseline = "top";

      rows.forEach((row, index) => {
        if (frame % 9 === 0) {
          row.text = mutateBinaryLine(row.text);
        }

        const wave = Math.sin(frame * 0.018 + row.wave) * 3;
        const drift = pointerInfluence.x * (index % 2 === 0 ? 10 : -8);
        const verticalDrift = pointerInfluence.y * (index % 3 === 0 ? 4 : -3);

        row.xOffset -= row.speed;

        if (row.xOffset < -letterGap * 12) {
          row.xOffset = 0;
        }

        ctx.fillStyle = `rgba(124, 255, 178, ${row.opacity})`;

        ctx.fillText(
          row.text,
          row.xOffset + drift,
          row.y + wave + verticalDrift
        );

        ctx.fillText(
          row.text,
          row.xOffset + row.text.length * letterGap * 0.58 + drift,
          row.y + wave + verticalDrift
        );

        if (frame % 42 === 0 && Math.random() > 0.64) {
          const glitchStart = Math.floor(
            Math.random() * Math.max(1, row.text.length - 16)
          );

          const glitchText = row.text.slice(glitchStart, glitchStart + 16);
          const glitchX = glitchStart * letterGap + row.xOffset + drift;

          ctx.fillStyle = "rgba(224, 202, 125, 0.36)";
          ctx.fillText(glitchText, glitchX, row.y + wave + verticalDrift);
        }

        if (frame % 66 === 0 && Math.random() > 0.76) {
          const warningStart = Math.floor(
            Math.random() * Math.max(1, row.text.length - 8)
          );

          const warningText = row.text.slice(warningStart, warningStart + 8);
          const warningX = warningStart * letterGap + row.xOffset + drift;

          ctx.fillStyle = "rgba(255, 77, 77, 0.38)";
          ctx.fillText(warningText, warningX, row.y + wave + verticalDrift);
        }
      });

      animationId = requestAnimationFrame(drawFuelBinaryWall);
    }

    function updateCanvasPointerInfluence(event) {
      const rect = fuelSection.getBoundingClientRect();

      pointerInfluence.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      pointerInfluence.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function resetCanvasPointerInfluence() {
      pointerInfluence.x = 0;
      pointerInfluence.y = 0;
    }

    fuelSection.addEventListener("pointermove", updateCanvasPointerInfluence);
    fuelSection.addEventListener("pointerleave", resetCanvasPointerInfluence);

    resizeFuelBinaryWall();
    drawFuelBinaryWall();

    window.addEventListener("resize", () => {
      if (animationId) cancelAnimationFrame(animationId);

      resizeFuelBinaryWall();
      drawFuelBinaryWall();
    });
  }
})();

// =============================
// Action 區：資料夾 tabs
// =============================
document.querySelectorAll(".folder-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.folder;

    document.querySelectorAll(".folder-tab").forEach((item) => {
      item.classList.remove("is-active");
    });

    document.querySelectorAll(".folder-panel").forEach((panel) => {
      panel.classList.remove("is-active");
    });

    tab.classList.add("is-active");

    const activePanel = document.querySelector(
      `[data-folder-panel="${target}"]`
    );

    if (activePanel) {
      activePanel.classList.add("is-active");
    }

    const folderPath = document.querySelector("#folderPath");

    const pathMap = {
      gov: "government_rules",
      consumer: "consumer_scan",
      company: "company_proof",
      other: "public_action"
    };

    if (folderPath && pathMap[target]) {
      folderPath.textContent = pathMap[target];
    }
  });
});
// =============================
// Fossil Fuel Scramble Terminal
// =============================

(() => {
  const terminal = document.querySelector("#fuelScrambleTerminal");

  if (!terminal) return;

  const scrambleElements = Array.from(
    terminal.querySelectorAll("[data-scramble]")
  );

  const glyphs = "01█▓▒░<>/\\|#$%&?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let hasPlayed = false;

  function randomGlyph() {
    return glyphs[Math.floor(Math.random() * glyphs.length)];
  }

  function scrambleText(element, options = {}) {
    const finalText = element.dataset.text || element.textContent.trim();

    const duration = options.duration || 900;
    const fps = options.fps || 34;
    const stagger = options.stagger || 18;

    const originalLength = finalText.length;
    const frameInterval = 1000 / fps;
    const totalFrames = Math.max(1, Math.floor(duration / frameInterval));

    let frame = 0;
    let lastTime = performance.now();

    element.classList.remove("is-decoded");
    element.classList.add("is-scrambling");

    return new Promise((resolve) => {
      function tick(now) {
        if (now - lastTime < frameInterval) {
          requestAnimationFrame(tick);
          return;
        }

        lastTime = now;
        frame += 1;

        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3);
        const revealCount = Math.floor(eased * originalLength);

        let output = "";

        for (let i = 0; i < originalLength; i += 1) {
          const char = finalText[i];

          if (char === " ") {
            output += " ";
          } else if (i < revealCount) {
            output += char;
          } else {
            const shouldFlicker = Math.random() > (i / originalLength) * 0.18;
            output += shouldFlicker ? randomGlyph() : char;
          }
        }

        element.textContent = output;

        if (frame < totalFrames) {
          requestAnimationFrame(tick);
        } else {
          element.textContent = finalText;
          element.classList.remove("is-scrambling");
          element.classList.add("is-decoded");
          resolve();
        }
      }

      setTimeout(() => {
        requestAnimationFrame(tick);
      }, stagger);
    });
  }

  async function playTerminalDecode() {
    if (hasPlayed) return;

    hasPlayed = true;
    terminal.classList.add("is-decoding");

    scrambleElements.forEach((element) => {
      element.textContent = "";
      element.classList.remove("is-decoded");
    });

    for (let i = 0; i < scrambleElements.length; i += 1) {
      const element = scrambleElements[i];

      await scrambleText(element, {
        duration: element.classList.contains("warning-text") ? 1150 : 780,
        stagger: i * 35
      });
    }

    setTimeout(() => {
      terminal.classList.remove("is-decoding");
    }, 400);
  }

  function replayTerminalDecode() {
    hasPlayed = false;
    playTerminalDecode();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playTerminalDecode();
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  observer.observe(terminal);

  terminal.addEventListener("click", () => {
    replayTerminalDecode();
  });
})();

// =============================
// Action 區：最終掃描
// =============================

document.querySelectorAll(".folder-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.folder;

    document.querySelectorAll(".folder-tab").forEach((item) => {
      item.classList.remove("is-active");
    });

    document.querySelectorAll(".folder-panel").forEach((panel) => {
      panel.classList.remove("is-active");
    });

    tab.classList.add("is-active");

    const panel = document.querySelector(`[data-folder-panel="${target}"]`);
    if (panel) panel.classList.add("is-active");

    const folderPath = document.querySelector("#folderPath");
    const pathMap = {
      gov: "government_rules",
      consumer: "consumer_scan",
      company: "company_compliance",
      other: "social_actions",
      compare: "strategy_compare"
    };

    if (folderPath && pathMap[target]) {
      folderPath.textContent = pathMap[target];
    }
  });
});

document.querySelectorAll(".claim-choice").forEach((btn) => {
  btn.addEventListener("click", () => {
    const feedback = document.querySelector("#claimFeedback");
    const correct = btn.dataset.correct === "true";

    document.querySelectorAll(".claim-choice").forEach((item) => {
      item.classList.remove("is-selected");
    });

    btn.classList.add("is-selected");

    if (!feedback) return;

    if (correct) {
      feedback.textContent =
        "答對了！這句話沒有說明比例、範圍與證據，因此需要進一步查證。";
      feedback.style.color = "#2a8352";
    } else {
      feedback.textContent =
        "再想想：出現永續字樣不代表可信，重點是有沒有具體資料支持。";
      feedback.style.color = "#d63031";
    }
  });
});

const runActionScan = document.querySelector("#runActionScan");

if (runActionScan) {
  runActionScan.addEventListener("click", () => {
    const items = document.querySelectorAll("[data-action-scan]");
    const result = document.querySelector("#actionScanResult");

    items.forEach((item) => {
      item.classList.remove("is-checked");
      const box = item.querySelector(".scan-box");
      if (box) box.textContent = "□";
    });

    if (result) {
      result.textContent = "檢查中...";
    }

    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("is-checked");
        const box = item.querySelector(".scan-box");
        if (box) box.textContent = "✅";

        if (index === items.length - 1 && result) {
          result.textContent =
            "檢查完成：看到綠色標籤時，請一起檢查數據、比例、方法、證據與現在的行動。";
        }
      }, index * 360);
    });
  });
}

const greenSearchInput = document.querySelector("#greenSearchInput");
const greenSearchBtn = document.querySelector("#greenSearchBtn");
const greenSearchCards = document.querySelectorAll(".search-result-card");
const greenSearchCount = document.querySelector("#greenSearchCount");
const noGreenSearchResult = document.querySelector("#noGreenSearchResult");

function runGreenSearch(queryText) {
  const query = queryText.trim().toLowerCase();
  let visibleCount = 0;

  greenSearchCards.forEach((card) => {
    const keywords = card.dataset.keywords.toLowerCase();
    const text = card.textContent.toLowerCase();

    const isMatch =
      query === "" ||
      keywords.includes(query) ||
      text.includes(query) ||
      query
        .split(/\s+/)
        .some((word) => keywords.includes(word) || text.includes(word));

    if (isMatch) {
      card.classList.remove("is-hidden");
      visibleCount++;
    } else {
      card.classList.add("is-hidden");
    }
  });

  if (greenSearchCount) {
    greenSearchCount.textContent = `約 ${visibleCount} 筆推薦結果，搜尋時間 0.${Math.floor(
      Math.random() * 60 + 20
    )} 秒`;
  }

  if (noGreenSearchResult) {
    if (visibleCount === 0) {
      noGreenSearchResult.classList.add("is-active");
    } else {
      noGreenSearchResult.classList.remove("is-active");
    }
  }
}

if (greenSearchBtn && greenSearchInput) {
  greenSearchBtn.addEventListener("click", () => {
    runGreenSearch(greenSearchInput.value);
  });

  greenSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runGreenSearch(greenSearchInput.value);
    }
  });
}

document.querySelectorAll(".search-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const query = chip.dataset.query;

    if (greenSearchInput) {
      greenSearchInput.value = query;
    }

    runGreenSearch(query);
  });
});

// =============================
// Greenwash Quiz 測驗：四角色差異化版本
// =============================

const greenwashQuestions = [
  {
    type: "single",
    label: "單選題",
    question:
      "看到商品寫著「天然、環保、永續」，但沒有任何比例或證明，你應該怎麼判斷？",
    options: [
      "很可信，因為文字看起來很環保",
      "有漂綠風險，需要查證資料",
      "只要包裝是綠色就沒問題",
      "只要品牌有名就不用懷疑"
    ],
    answer: [1],
    explanation: "模糊的環保詞彙若沒有數據、範圍或認證，很容易造成誤導。"
  },
  {
    type: "multiple",
    label: "多選題",
    question: "以下哪些是常見漂綠訊號？",
    options: [
      "只說地球友善，沒有說明方法",
      "清楚標示含 30% 再生材料",
      "使用大量森林與葉子圖片，但沒有證據",
      "公開第三方認證與認證範圍"
    ],
    answer: [0, 2],
    explanation: "漂綠常透過模糊詞與自然圖像製造環保感，但缺少可查證資訊。"
  },
  {
    type: "single",
    label: "單選題",
    question:
      "快時尚品牌推出一小系列「永續商品」，但整體仍大量生產，問題在哪裡？",
    options: [
      "完全沒有問題",
      "小部分綠色行動可能遮住整體大量生產問題",
      "只要有一件商品環保，品牌就一定永續",
      "價格便宜就代表環保"
    ],
    answer: [1],
    explanation:
      "如果沒有改善整體商業模式，只強調小部分商品，容易形成綠色濾鏡。"
  },
  {
    type: "single",
    label: "單選題",
    question: "看到「碳中和」宣稱時，最應該追問什麼？",
    options: [
      "是不是只靠碳抵換，而沒有實際減排",
      "廣告是不是很好看",
      "Logo 有沒有變綠",
      "商品是不是比較便宜"
    ],
    answer: [0],
    explanation:
      "碳抵換若沒有搭配實際減排與完整揭露，可能讓消費者高估環境效益。"
  },
  {
    type: "single",
    label: "單選題",
    question: "ESG 基金看起來很永續，最應該檢查哪件事？",
    options: [
      "名稱是否有 ESG 三個字",
      "App 介面是否漂亮",
      "評分方法、持股內容與資金流向",
      "廣告是不是使用綠色背景"
    ],
    answer: [2],
    explanation:
      "ESG 產品不能只看名稱，還要看評分方法、持股與資金是否仍流向高碳產業。"
  },
  {
    type: "multiple",
    label: "多選題",
    question: "可信的綠色宣稱通常需要哪些資訊？",
    options: [
      "具體數據或比例",
      "認證名稱與認證範圍",
      "企業自己說很環保",
      "可查證的方法或報告"
    ],
    answer: [0, 1, 3],
    explanation: "可信宣稱通常要具體、可查、可驗證，而不是只有形容詞。"
  },
  {
    type: "single",
    label: "單選題",
    question: "「本產品不含 CFC」一定代表它特別環保嗎？",
    options: [
      "一定，因為看起來很專業",
      "不一定，若 CFC 本來就被禁用，這可能只是轉移焦點",
      "一定，因為有英文縮寫",
      "只要不含 CFC 就零污染"
    ],
    answer: [1],
    explanation: "若某物質本來就被法規禁止，品牌拿來當賣點可能會誤導消費者。"
  },
  {
    type: "single",
    label: "單選題",
    question: "看到網店有「環保商品」篩選功能，最合理的檢查方式是？",
    options: [
      "直接相信平台",
      "查看篩選標準是否公開且具體",
      "只看商品照片",
      "只買排序第一名"
    ],
    answer: [1],
    explanation: "綠色篩選需要公開標準，否則消費者不知道商品為何被歸類為環保。"
  }
];

const greenwashRoles = [
  {
    key: "novice",
    min: 0,
    max: 40,
    name: "綠霧新手",
    subtitle: "剛進入綠鏡實驗室",
    desc:
      "你已經開始注意漂綠了，但目前仍可能被綠色包裝、自然圖像與漂亮詞彙吸引。",
    advice: "下次看到環保宣稱時，先問：有沒有數據？有沒有比例？有沒有證據？",
    tags: ["#剛開始覺醒", "#綠色濾鏡警報", "#需要證據雷達"],
    color: "#edc96d",
    accent: "#d63031"
  },
  {
    key: "detective",
    min: 41,
    max: 70,
    name: "標籤偵探",
    subtitle: "模糊宣稱追蹤員",
    desc:
      "你已經能看出不少漂綠訊號，像是模糊詞、自然圖像、沒有比例的材料宣稱。",
    advice: "接下來可以練習查第三方認證、品牌永續報告與外部調查資料。",
    tags: ["#標籤追蹤", "#模糊詞辨識", "#開始查證"],
    color: "#00aaa2",
    accent: "#10251f"
  },
  {
    key: "analyst",
    min: 71,
    max: 90,
    name: "證據拆解師",
    subtitle: "綠色宣稱分析高手",
    desc:
      "你不只看品牌說了什麼，也會看品牌沒有說什麼。你已經懂得檢查比例、範圍、認證與方法。",
    advice: "可以開始比較不同品牌的供應鏈透明度、減排路徑與實際行動。",
    tags: ["#數據查核", "#認證範圍", "#拆穿濾鏡"],
    color: "#7cce56",
    accent: "#008080"
  },
  {
    key: "doctor",
    min: 91,
    max: 100,
    name: "反漂綠博士",
    subtitle: "Green Claims Lab 最高研究員",
    desc:
      "你幾乎能看穿所有綠色濾鏡，包含快時尚、化石燃料、ESG、碳抵換與模糊宣稱。",
    advice:
      "你可以把判斷方法分享給身邊的人，協助更多人看懂綠色宣稱背後的證據。",
    tags: ["#濾鏡破壞者", "#證據博士", "#反漂綠守門員"],
    color: "#10251f",
    accent: "#00ff7f"
  }
];

let greenwashIndex = 0;
let greenwashScore = 0;
let greenwashSelected = [];
let greenwashSubmitted = false;

const greenwashCover = document.querySelector("#greenwashQuizCover");
const greenwashQuestionPage = document.querySelector("#greenwashQuestionPage");
const greenwashResultPage = document.querySelector("#greenwashResultPage");

const greenwashStartBtn = document.querySelector("#greenwashStartBtn");
const greenwashSubmitBtn = document.querySelector("#greenwashSubmitBtn");
const greenwashNextBtn = document.querySelector("#greenwashNextBtn");
const greenwashRestartBtn = document.querySelector("#greenwashRestartBtn");
const greenwashDownloadBtn = document.querySelector("#greenwashDownloadBtn");

const greenwashQuestionCount = document.querySelector(
  "#greenwashQuestionCount"
);
const greenwashProgressFill = document.querySelector("#greenwashProgressFill");
const greenwashQuestionType = document.querySelector("#greenwashQuestionType");
const greenwashQuestionText = document.querySelector("#greenwashQuestionText");
const greenwashOptions = document.querySelector("#greenwashOptions");
const greenwashFeedback = document.querySelector("#greenwashFeedback");

const greenwashRoleName = document.querySelector("#greenwashRoleName");
const greenwashScoreText = document.querySelector("#greenwashScoreText");
const greenwashRoleDesc = document.querySelector("#greenwashRoleDesc");
const greenwashAdvice = document.querySelector("#greenwashAdvice");
const greenwashRoleTags = document.querySelector("#greenwashRoleTags");
const greenwashCertificate = document.querySelector("#greenwashCertificate");

function greenwashStartQuiz() {
  greenwashIndex = 0;
  greenwashScore = 0;
  greenwashSelected = [];
  greenwashSubmitted = false;

  greenwashCover.classList.add("is-hidden");
  greenwashResultPage.classList.remove("is-active");
  greenwashQuestionPage.classList.add("is-active");

  greenwashRenderQuestion();
}

function greenwashRenderQuestion() {
  const question = greenwashQuestions[greenwashIndex];

  greenwashSelected = [];
  greenwashSubmitted = false;

  greenwashQuestionCount.textContent = `Q${greenwashIndex + 1} / ${
    greenwashQuestions.length
  }`;
  greenwashProgressFill.style.width = `${
    (greenwashIndex / greenwashQuestions.length) * 100
  }%`;
  greenwashQuestionType.textContent = question.label;
  greenwashQuestionText.textContent = question.question;

  greenwashFeedback.textContent =
    question.type === "multiple"
      ? "這題可複選。選好後按下「確認答案」。"
      : "選擇答案後，按下「確認答案」。";

  greenwashFeedback.classList.remove("is-wrong");

  greenwashSubmitBtn.disabled = false;
  greenwashNextBtn.disabled = true;
  greenwashNextBtn.textContent =
    greenwashIndex === greenwashQuestions.length - 1 ? "查看結果" : "下一題";

  greenwashOptions.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "quiz-option";
    optionButton.dataset.index = index;

    optionButton.innerHTML = `
      <span class="quiz-option-marker">${String.fromCharCode(65 + index)}</span>
      <span>${option}</span>
    `;

    optionButton.addEventListener("click", () => {
      if (greenwashSubmitted) return;

      if (question.type === "multiple") {
        if (greenwashSelected.includes(index)) {
          greenwashSelected = greenwashSelected.filter(
            (item) => item !== index
          );
          optionButton.classList.remove("is-selected");
        } else {
          greenwashSelected.push(index);
          optionButton.classList.add("is-selected");
        }
      } else {
        greenwashSelected = [index];

        document
          .querySelectorAll("#greenwashQuiz .quiz-option")
          .forEach((item) => {
            item.classList.remove("is-selected");
          });

        optionButton.classList.add("is-selected");
      }
    });

    greenwashOptions.appendChild(optionButton);
  });
}

function greenwashSameAnswer(a, b) {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);

  return sortedA.every((value, index) => value === sortedB[index]);
}

function greenwashSubmitAnswer() {
  if (greenwashSubmitted) return;

  const question = greenwashQuestions[greenwashIndex];

  if (greenwashSelected.length === 0) {
    greenwashFeedback.textContent = "請先選擇答案。";
    greenwashFeedback.classList.add("is-wrong");
    return;
  }

  greenwashSubmitted = true;

  const isCorrect = greenwashSameAnswer(greenwashSelected, question.answer);

  if (isCorrect) {
    greenwashScore += 1;
  }

  document.querySelectorAll("#greenwashQuiz .quiz-option").forEach((button) => {
    const index = Number(button.dataset.index);

    if (question.answer.includes(index)) {
      button.classList.add("is-correct");
    }

    if (greenwashSelected.includes(index) && !question.answer.includes(index)) {
      button.classList.add("is-wrong");
    }
  });

  greenwashFeedback.textContent = `${isCorrect ? "答對了！" : "還差一點！"} ${
    question.explanation
  }`;
  greenwashFeedback.classList.toggle("is-wrong", !isCorrect);

  greenwashSubmitBtn.disabled = true;
  greenwashNextBtn.disabled = false;
}

function greenwashNextQuestion() {
  if (greenwashIndex < greenwashQuestions.length - 1) {
    greenwashIndex += 1;
    greenwashRenderQuestion();
  } else {
    greenwashShowResult();
  }
}

function greenwashGetRole(percent) {
  return (
    greenwashRoles.find((role) => percent >= role.min && percent <= role.max) ||
    greenwashRoles[0]
  );
}

function greenwashShowResult() {
  const percent = Math.round(
    (greenwashScore / greenwashQuestions.length) * 100
  );
  const role = greenwashGetRole(percent);

  greenwashProgressFill.style.width = "100%";

  greenwashQuestionPage.classList.remove("is-active");
  greenwashResultPage.classList.add("is-active");

  greenwashRoleName.textContent = role.name;
  greenwashScoreText.textContent = `正確率 ${percent}%｜答對 ${greenwashScore} / ${greenwashQuestions.length} 題`;
  greenwashRoleDesc.textContent = role.desc;
  greenwashAdvice.textContent = role.advice;

  greenwashRoleTags.innerHTML = "";

  role.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    greenwashRoleTags.appendChild(span);
  });

  greenwashDrawCertificate(role, percent);
}

// =============================
// Canvas：角色背景裝飾
// =============================

function greenwashDrawRoleBackground(ctx, x, y, scale, role) {
  const s = scale;

  ctx.save();
  ctx.translate(x, y);

  if (role.key === "novice") {
    // 飄霧
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fillRect(-42 * s, 38 * s, 34 * s, 10 * s);
    ctx.fillRect(-30 * s, 52 * s, 44 * s, 10 * s);
    ctx.fillRect(130 * s, 36 * s, 42 * s, 10 * s);
    ctx.fillRect(118 * s, 54 * s, 34 * s, 10 * s);
  }

  if (role.key === "detective") {
    // 搜尋框
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-36 * s, 24 * s, 74 * s, 28 * s);
    ctx.fillStyle = "#10251f";
    ctx.fillRect(-36 * s, 24 * s, 74 * s, 5 * s);
    ctx.fillRect(-36 * s, 47 * s, 74 * s, 5 * s);
    ctx.fillRect(-36 * s, 24 * s, 5 * s, 28 * s);
    ctx.fillRect(33 * s, 24 * s, 5 * s, 28 * s);

    ctx.fillStyle = "#00aaa2";
    ctx.fillRect(-22 * s, 35 * s, 32 * s, 5 * s);
  }

  if (role.key === "analyst") {
    // 分析 grid
    ctx.fillStyle = "rgba(16, 37, 31, 0.2)";
    for (let i = 0; i < 5; i++) {
      ctx.fillRect((-32 + i * 18) * s, 20 * s, 3 * s, 92 * s);
      ctx.fillRect(-34 * s, (24 + i * 18) * s, 92 * s, 3 * s);
    }
  }

  if (role.key === "doctor") {
    // 光芒
    ctx.fillStyle = "#00ff7f";
    ctx.fillRect(-28 * s, 18 * s, 10 * s, 28 * s);
    ctx.fillRect(-37 * s, 27 * s, 28 * s, 10 * s);

    ctx.fillRect(136 * s, 18 * s, 10 * s, 28 * s);
    ctx.fillRect(127 * s, 27 * s, 28 * s, 10 * s);

    ctx.fillStyle = "#fff8dc";
    ctx.fillRect(150 * s, 72 * s, 8 * s, 20 * s);
    ctx.fillRect(144 * s, 78 * s, 20 * s, 8 * s);
  }

  ctx.restore();
}

// =============================
// Canvas：不同角色配件
// =============================

function greenwashDrawRoleAccessory(ctx, s, role) {
  if (role.key === "novice") {
    // 頭上小芽
    ctx.fillStyle = "#7cce56";
    ctx.fillRect(74 * s, -12 * s, 10 * s, 18 * s);
    ctx.fillRect(60 * s, -4 * s, 22 * s, 10 * s);
    ctx.fillRect(80 * s, -4 * s, 22 * s, 10 * s);

    ctx.fillStyle = "#10251f";
    ctx.fillRect(74 * s, -12 * s, 10 * s, 6 * s);

    // 問號
    ctx.fillStyle = "#10251f";
    ctx.fillRect(126 * s, 10 * s, 18 * s, 6 * s);
    ctx.fillRect(138 * s, 16 * s, 6 * s, 18 * s);
    ctx.fillRect(132 * s, 28 * s, 12 * s, 6 * s);
    ctx.fillRect(132 * s, 40 * s, 6 * s, 6 * s);
  }

  if (role.key === "detective") {
    // 放大鏡：圈
    ctx.strokeStyle = "#10251f";
    ctx.lineWidth = 6 * s;
    ctx.beginPath();
    ctx.arc(118 * s, 88 * s, 20 * s, 0, Math.PI * 2);
    ctx.stroke();

    // 放大鏡：鏡片淡色
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillRect(106 * s, 76 * s, 24 * s, 24 * s);

    // 放大鏡：手柄
    ctx.fillStyle = "#10251f";
    ctx.fillRect(132 * s, 102 * s, 8 * s, 30 * s);
    ctx.fillRect(138 * s, 126 * s, 10 * s, 8 * s);

    // 標籤 icon
    ctx.fillStyle = "#fff8dc";
    ctx.fillRect(22 * s, 18 * s, 34 * s, 24 * s);
    ctx.fillStyle = "#10251f";
    ctx.fillRect(22 * s, 18 * s, 34 * s, 5 * s);
    ctx.fillRect(22 * s, 37 * s, 34 * s, 5 * s);
    ctx.fillRect(22 * s, 18 * s, 5 * s, 24 * s);
    ctx.fillRect(51 * s, 18 * s, 5 * s, 24 * s);
    ctx.fillStyle = "#00aaa2";
    ctx.fillRect(32 * s, 28 * s, 14 * s, 5 * s);
  }

  if (role.key === "analyst") {
    // 文件板
    ctx.fillStyle = "#fff8dc";
    ctx.fillRect(18 * s, 80 * s, 44 * s, 60 * s);

    ctx.fillStyle = "#10251f";
    ctx.fillRect(18 * s, 80 * s, 44 * s, 6 * s);
    ctx.fillRect(18 * s, 134 * s, 44 * s, 6 * s);
    ctx.fillRect(18 * s, 80 * s, 6 * s, 60 * s);
    ctx.fillRect(56 * s, 80 * s, 6 * s, 60 * s);

    // checklist
    ctx.fillStyle = "#00aa55";
    ctx.fillRect(28 * s, 94 * s, 6 * s, 6 * s);
    ctx.fillRect(34 * s, 100 * s, 6 * s, 6 * s);
    ctx.fillRect(40 * s, 88 * s, 6 * s, 18 * s);

    ctx.fillStyle = "#10251f";
    ctx.fillRect(28 * s, 114 * s, 24 * s, 5 * s);
    ctx.fillRect(28 * s, 126 * s, 18 * s, 5 * s);

    // 小圖表
    ctx.fillStyle = "#008080";
    ctx.fillRect(116 * s, 94 * s, 8 * s, 36 * s);
    ctx.fillRect(128 * s, 106 * s, 8 * s, 24 * s);
    ctx.fillRect(140 * s, 84 * s, 8 * s, 46 * s);
  }

  if (role.key === "doctor") {
    // 博士帽上方平板
    ctx.fillStyle = "#10251f";
    ctx.fillRect(34 * s, -20 * s, 104 * s, 12 * s);

    // 博士帽底部
    ctx.fillStyle = role.color;
    ctx.fillRect(48 * s, -8 * s, 76 * s, 16 * s);

    ctx.fillStyle = "#10251f";
    ctx.fillRect(48 * s, -8 * s, 76 * s, 5 * s);
    ctx.fillRect(48 * s, 3 * s, 76 * s, 5 * s);

    // 流蘇
    ctx.fillStyle = "#00ff7f";
    ctx.fillRect(126 * s, -8 * s, 5 * s, 30 * s);
    ctx.fillRect(120 * s, 20 * s, 17 * s, 8 * s);

    // 認證徽章
    ctx.fillStyle = "#e0ca7d";
    ctx.fillRect(112 * s, 126 * s, 26 * s, 26 * s);
    ctx.fillStyle = "#10251f";
    ctx.fillRect(112 * s, 126 * s, 26 * s, 5 * s);
    ctx.fillRect(112 * s, 147 * s, 26 * s, 5 * s);
    ctx.fillRect(112 * s, 126 * s, 5 * s, 26 * s);
    ctx.fillRect(133 * s, 126 * s, 5 * s, 26 * s);

    ctx.fillStyle = "#10251f";
    ctx.fillRect(121 * s, 135 * s, 8 * s, 8 * s);
  }
}

// =============================
// Canvas：像素角色主體
// =============================

function greenwashDrawCharacter(ctx, x, y, scale, role) {
  const s = scale;
  const characterWidth = 168 * s;

  ctx.save();
  ctx.translate(x - characterWidth / 2, y);

  // 背景裝飾
  greenwashDrawRoleBackground(ctx, 0, 0, s, role);

  // 陰影
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(28 * s, 180 * s, 118 * s, 14 * s);

  // 頭套主體
  ctx.fillStyle = role.color;
  ctx.fillRect(24 * s, 0, 120 * s, 82 * s);
  ctx.fillRect(10 * s, 34 * s, 148 * s, 52 * s);

  // 頭套描邊
  ctx.fillStyle = "#10251f";
  ctx.fillRect(24 * s, 0, 120 * s, 8 * s);
  ctx.fillRect(10 * s, 34 * s, 8 * s, 52 * s);
  ctx.fillRect(150 * s, 34 * s, 8 * s, 52 * s);
  ctx.fillRect(24 * s, 82 * s, 120 * s, 8 * s);

  // 臉
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(52 * s, 48 * s, 66 * s, 62 * s);

  // 角色表情
  ctx.fillStyle = "#10251f";

  if (role.key === "novice") {
    // 單純小點眼
    ctx.fillRect(66 * s, 70 * s, 8 * s, 10 * s);
    ctx.fillRect(96 * s, 70 * s, 8 * s, 10 * s);
    ctx.fillRect(80 * s, 92 * s, 12 * s, 5 * s);
  } else if (role.key === "detective") {
    // 一大一小眼
    ctx.fillRect(64 * s, 68 * s, 8 * s, 10 * s);
    ctx.fillRect(92 * s, 64 * s, 14 * s, 16 * s);
    ctx.fillRect(78 * s, 92 * s, 24 * s, 6 * s);
  } else if (role.key === "analyst") {
    // 平行線眼
    ctx.fillRect(62 * s, 70 * s, 16 * s, 5 * s);
    ctx.fillRect(92 * s, 70 * s, 16 * s, 5 * s);
    ctx.fillRect(78 * s, 92 * s, 24 * s, 6 * s);
  } else {
    // 博士微笑
    ctx.fillRect(64 * s, 68 * s, 10 * s, 12 * s);
    ctx.fillRect(96 * s, 68 * s, 10 * s, 12 * s);
    ctx.fillRect(76 * s, 90 * s, 8 * s, 6 * s);
    ctx.fillRect(84 * s, 96 * s, 18 * s, 6 * s);
    ctx.fillRect(102 * s, 90 * s, 8 * s, 6 * s);
  }

  // 身體
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(58 * s, 116 * s, 56 * s, 66 * s);

  // 身體描邊
  ctx.fillStyle = "#10251f";
  ctx.fillRect(50 * s, 116 * s, 8 * s, 66 * s);
  ctx.fillRect(114 * s, 116 * s, 8 * s, 66 * s);
  ctx.fillRect(58 * s, 182 * s, 56 * s, 8 * s);

  // 腳
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(58 * s, 180 * s, 22 * s, 34 * s);
  ctx.fillRect(92 * s, 180 * s, 22 * s, 34 * s);

  ctx.fillStyle = "#10251f";
  ctx.fillRect(58 * s, 208 * s, 22 * s, 8 * s);
  ctx.fillRect(92 * s, 208 * s, 22 * s, 8 * s);

  // 手部姿勢
  ctx.fillStyle = "#ffffff";

  if (role.key === "detective") {
    // 偵探：右手舉起拿放大鏡
    ctx.fillRect(30 * s, 128 * s, 28 * s, 40 * s);
    ctx.fillRect(112 * s, 104 * s, 24 * s, 38 * s);
  } else if (role.key === "analyst") {
    // 分析師：左手拿文件
    ctx.fillRect(30 * s, 122 * s, 26 * s, 42 * s);
    ctx.fillRect(114 * s, 128 * s, 28 * s, 40 * s);
  } else if (role.key === "doctor") {
    // 博士：一手指向前
    ctx.fillRect(30 * s, 126 * s, 26 * s, 42 * s);
    ctx.fillRect(112 * s, 118 * s, 44 * s, 20 * s);
  } else {
    // 新手：雙手垂下
    ctx.fillRect(30 * s, 130 * s, 26 * s, 46 * s);
    ctx.fillRect(114 * s, 130 * s, 26 * s, 46 * s);
  }

  // 手描邊
  ctx.fillStyle = "#10251f";

  if (role.key === "detective") {
    ctx.fillRect(30 * s, 128 * s, 6 * s, 40 * s);
    ctx.fillRect(130 * s, 104 * s, 6 * s, 38 * s);
  } else if (role.key === "analyst") {
    ctx.fillRect(30 * s, 122 * s, 6 * s, 42 * s);
    ctx.fillRect(136 * s, 128 * s, 6 * s, 40 * s);
  } else if (role.key === "doctor") {
    ctx.fillRect(30 * s, 126 * s, 6 * s, 42 * s);
    ctx.fillRect(150 * s, 118 * s, 6 * s, 20 * s);
  } else {
    ctx.fillRect(30 * s, 130 * s, 6 * s, 46 * s);
    ctx.fillRect(134 * s, 130 * s, 6 * s, 46 * s);
  }

  // 角色專屬配件
  greenwashDrawRoleAccessory(ctx, s, role);

  ctx.restore();
}

// =============================
// Canvas：文字換行
// =============================

function greenwashWrapText(ctx, text, maxWidth) {
  const chars = text.split("");
  const lines = [];
  let line = "";

  chars.forEach((char) => {
    const testLine = line + char;

    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

// =============================
// Canvas：認證圖
// =============================

function greenwashDrawCertificate(role, percent) {
  const ctx = greenwashCertificate.getContext("2d");
  const width = greenwashCertificate.width;
  const height = greenwashCertificate.height;
  const visualCenterX = width / 2;

  ctx.clearRect(0, 0, width, height);

  // 背景
  ctx.fillStyle = "#8bd3c7";
  ctx.fillRect(0, 0, width, height);

  // 背景格線
  ctx.fillStyle = "rgba(16, 37, 31, 0.12)";

  for (let x = 0; x < width; x += 32) {
    ctx.fillRect(x, 0, 3, height);
  }

  for (let y = 0; y < height; y += 32) {
    ctx.fillRect(0, y, width, 3);
  }

  // 外框
  ctx.fillStyle = "#10251f";
  ctx.fillRect(28, 28, width - 56, height - 56);

  ctx.fillStyle = "#fff8dc";
  ctx.fillRect(42, 42, width - 84, height - 84);

  // 頂部品牌
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 44px Arial";
  ctx.fillText("Green or Not", visualCenterX, 112);

  ctx.fillStyle = "#10251f";
  ctx.font = "bold 28px Arial";
  ctx.fillText("你的反漂綠命定角色是…", visualCenterX, 190);

  ctx.font = "bold 70px Arial";
  ctx.fillText(role.name, visualCenterX, 282);

  ctx.font = "bold 28px Arial";
  ctx.fillText(role.subtitle, visualCenterX, 330);

  // 角色框
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(86, 380, 596, 360);

  ctx.fillStyle = "#10251f";
  ctx.fillRect(86, 380, 596, 8);
  ctx.fillRect(86, 732, 596, 8);
  ctx.fillRect(86, 380, 8, 360);
  ctx.fillRect(674, 380, 8, 360);

  // 右上像素角
  greenwashDrawCanvasPixelCorner(ctx, 674, 380, "#10251f");

  // 中心定位角色
  greenwashDrawCharacter(ctx, visualCenterX, 420, 1.45, role);

  // 分數區
  ctx.fillStyle = role.color;
  ctx.fillRect(86, 780, 596, 126);

  ctx.fillStyle = "#10251f";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText("漂綠辨識率", visualCenterX, 830);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px Courier New";
  ctx.fillText(`${percent}%`, visualCenterX, 886);

  // 描述區
  ctx.fillStyle = "#10251f";
  ctx.fillRect(86, 944, 596, 178);

  greenwashDrawCanvasPixelCorner(ctx, 674, 944, "#10251f");

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "left";

  const descLines = greenwashWrapText(ctx, role.desc, 520);

  descLines.slice(0, 4).forEach((line, index) => {
    ctx.fillText(line, 122, 1002 + index * 38);
  });

  // tags
  ctx.fillStyle = "#00aaa2";
  ctx.fillRect(86, 1160, 596, 72);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(role.tags.join("  "), visualCenterX, 1205);

  // footer
  ctx.fillStyle = "#10251f";
  ctx.font = "bold 22px Courier New";
  ctx.fillText("GREEN CLAIMS CHECK COMPLETE", visualCenterX, 1304);
}

// Canvas 裡的像素右上角
function greenwashDrawCanvasPixelCorner(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x - 30, y, 30, 8);
  ctx.fillRect(x, y + 8, 8, 8);
  ctx.fillRect(x + 8, y + 16, 8, 8);
  ctx.fillRect(x + 16, y + 24, 8, 32);
}

function greenwashRestart() {
  greenwashResultPage.classList.remove("is-active");
  greenwashCover.classList.remove("is-hidden");
  greenwashQuestionPage.classList.remove("is-active");
}

function greenwashDownload() {
  const link = document.createElement("a");
  link.download = "green-or-not-certificate.png";
  link.href = greenwashCertificate.toDataURL("image/png");
  link.click();
}

if (greenwashStartBtn) {
  greenwashStartBtn.addEventListener("click", greenwashStartQuiz);
}

if (greenwashSubmitBtn) {
  greenwashSubmitBtn.addEventListener("click", greenwashSubmitAnswer);
}

if (greenwashNextBtn) {
  greenwashNextBtn.addEventListener("click", greenwashNextQuestion);
}

if (greenwashRestartBtn) {
  greenwashRestartBtn.addEventListener("click", greenwashRestart);
}

if (greenwashDownloadBtn) {
  greenwashDownloadBtn.addEventListener("click", greenwashDownload);
}

// =============================
// 深入案例：點擊卡片跳到對應區域
// =============================

document.querySelectorAll(".case-jump-card").forEach((card) => {
  card.addEventListener("click", () => {
    const targetSelector = card.dataset.target;
    const targetSection = document.querySelector(targetSelector);

    if (!targetSection) return;

    const headerOffset = 0;
    const targetTop =
      targetSection.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  });
});

// =============================
// Breadcrumb 麵包屑導覽
// =============================

const breadcrumbNav = document.querySelector("#breadcrumbNav");
const breadcrumbToggle = document.querySelector("#breadcrumbToggle");
const breadcrumbCurrent = document.querySelector("#breadcrumbCurrent");
const breadcrumbItems = document.querySelectorAll(
  "#breadcrumbList .breadcrumb-item"
);

const breadcrumbSections = Array.from(breadcrumbItems)
  .map((item) => {
    const targetSelector = item.dataset.target;
    const section = document.querySelector(targetSelector);

    return {
      item,
      section,
      label: item.textContent.trim()
    };
  })
  .filter((entry) => entry.section);

function getHeaderOffset() {
  const header = document.querySelector("header");

  if (!header) return 0;

  const style = window.getComputedStyle(header);
  const isFixed = style.position === "fixed" || style.position === "sticky";

  return isFixed ? header.offsetHeight + 16 : 16;
}

function scrollToBreadcrumbTarget(targetSection) {
  if (!targetSection) return;

  const offset = getHeaderOffset();
  const top =
    targetSection.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

breadcrumbItems.forEach((item) => {
  const button = item.querySelector("button");
  const targetSelector = item.dataset.target;
  const targetSection = document.querySelector(targetSelector);

  if (!button || !targetSection) return;

  button.addEventListener("click", () => {
    scrollToBreadcrumbTarget(targetSection);

    if (window.innerWidth <= 900 && breadcrumbNav) {
      breadcrumbNav.classList.add("is-collapsed");
    }
  });
});

function setActiveBreadcrumb(activeEntry) {
  if (!activeEntry) return;

  breadcrumbItems.forEach((item) => {
    item.classList.remove("is-active");
  });

  activeEntry.item.classList.add("is-active");

  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = activeEntry.label;
  }
}

function updateBreadcrumbOnScroll() {
  if (!breadcrumbSections.length) return;

  const offset = getHeaderOffset() + 80;
  let currentEntry = breadcrumbSections[0];

  breadcrumbSections.forEach((entry) => {
    const rect = entry.section.getBoundingClientRect();

    if (rect.top - offset <= 0) {
      currentEntry = entry;
    }
  });

  setActiveBreadcrumb(currentEntry);
}

let breadcrumbTicking = false;

window.addEventListener("scroll", () => {
  if (breadcrumbTicking) return;

  breadcrumbTicking = true;

  window.requestAnimationFrame(() => {
    updateBreadcrumbOnScroll();
    breadcrumbTicking = false;
  });
});

window.addEventListener("resize", updateBreadcrumbOnScroll);

if (breadcrumbToggle && breadcrumbNav) {
  breadcrumbToggle.addEventListener("click", () => {
    breadcrumbNav.classList.toggle("is-collapsed");
  });
}

updateBreadcrumbOnScroll();

if (window.innerWidth <= 900 && breadcrumbNav) {
  breadcrumbNav.classList.add("is-collapsed");
}