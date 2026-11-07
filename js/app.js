"use strict";

const DATA_DIR = "data/cards/";
const app = document.getElementById("app");

/* ---------------- Reference data (shared teaching content) ---------------- */

const SUITS = {
  wands: {
    vi: "Gậy", en: "Wands", element: "Lửa", playing: "♣ Chuồn",
    signs: "Bạch Dương, Sư Tử, Nhân Mã",
    theme: "đam mê, hành động, sáng tạo, ý chí, sự nghiệp",
    desc: "Bộ Gậy là ngọn lửa bên trong: cảm hứng, tham vọng, năng lượng để bắt đầu và theo đuổi điều mình muốn. Khi bộ Gậy xuất hiện nhiều, câu chuyện xoay quanh động lực và hành động.",
  },
  cups: {
    vi: "Cốc", en: "Cups", element: "Nước", playing: "♥ Cơ",
    signs: "Cự Giải, Bọ Cạp, Song Ngư",
    theme: "cảm xúc, tình yêu, các mối quan hệ, trực giác",
    desc: "Bộ Cốc là dòng nước của trái tim: tình yêu, tình bạn, cảm xúc, trực giác và đời sống tinh thần. Khi bộ Cốc xuất hiện nhiều, chủ đề chính là cảm xúc và các mối quan hệ.",
  },
  swords: {
    vi: "Kiếm", en: "Swords", element: "Khí", playing: "♠ Bích",
    signs: "Thiên Bình, Bảo Bình, Song Tử",
    theme: "tư duy, lời nói, sự thật, xung đột, quyết định",
    desc: "Bộ Kiếm là không khí của tâm trí: suy nghĩ, lời nói, sự thật và quyết định. Kiếm có hai lưỡi — vừa giúp nhìn rõ, vừa có thể gây tổn thương, nên bộ này có nhiều lá khó khăn.",
  },
  pentacles: {
    vi: "Tiền", en: "Pentacles", element: "Đất", playing: "♦ Rô",
    signs: "Ma Kết, Kim Ngưu, Xử Nữ",
    theme: "tiền bạc, công việc, sức khỏe, vật chất, thành quả",
    desc: "Bộ Tiền (còn gọi là Đồng Xu) là mặt đất vững chắc: tiền bạc, công việc, cơ thể, nhà cửa — những gì hữu hình và cần thời gian vun đắp.",
  },
};
const MAJOR_DESC = "22 lá Ẩn Chính kể về những bài học lớn của cuộc đời — hành trình của Chàng Khờ (số 0) đi qua các nguyên mẫu như người thầy, tình yêu, cái chết, hy vọng… để đến với Thế Giới (số 21). Khi một lá Ẩn Chính xuất hiện, đó thường là chủ đề quan trọng, mang tính bước ngoặt.";

const NUMBERS = {
  ace: ["Át (1)", "Hạt giống, khởi đầu, tiềm năng thuần khiết của nguyên tố."],
  "2": ["Hai", "Lựa chọn, cân bằng, hợp tác, đối cực."],
  "3": ["Ba", "Phát triển, sáng tạo, kết quả ban đầu."],
  "4": ["Bốn", "Ổn định, nền tảng — đôi khi là trì trệ."],
  "5": ["Năm", "Xáo trộn, thử thách, mất mát, xung đột."],
  "6": ["Sáu", "Hài hòa trở lại, hồi phục, cho và nhận."],
  "7": ["Bảy", "Đánh giá, kiên trì, thử thách nội tâm."],
  "8": ["Tám", "Chuyển động, rèn luyện, làm chủ."],
  "9": ["Chín", "Gần hoàn tất, đỉnh điểm của nguyên tố."],
  "10": ["Mười", "Kết thúc chu kỳ: trọn vẹn — hoặc quá tải."],
  page: ["Tiểu Đồng", "Người học trò, tin tức, sự tò mò, bắt đầu khám phá nguyên tố."],
  knight: ["Hiệp Sĩ", "Hành động, chuyển động, theo đuổi — đôi khi thái quá."],
  queen: ["Nữ Hoàng", "Làm chủ nguyên tố từ bên trong: thấu hiểu, nuôi dưỡng."],
  king: ["Vua", "Làm chủ nguyên tố ra bên ngoài: lãnh đạo, kiểm soát, trách nhiệm."],
};

const SPREADS = {
  daily: {
    name: "Một lá – Thông điệp hôm nay", short: "1 lá · nhanh, hợp để luyện tập hằng ngày",
    positions: [["Thông điệp", "Năng lượng hoặc bài học nổi bật nhất với bạn lúc này."]],
  },
  ppf: {
    name: "Quá khứ – Hiện tại – Tương lai", short: "3 lá · trải bài kinh điển cho người mới",
    positions: [
      ["Quá khứ", "Những gì đã qua và vẫn đang ảnh hưởng đến bạn."],
      ["Hiện tại", "Tình hình và năng lượng lúc này."],
      ["Tương lai", "Xu hướng có thể xảy ra nếu mọi thứ tiếp diễn."],
    ],
  },
  sao: {
    name: "Tình huống – Hành động – Kết quả", short: "3 lá · khi cần lời khuyên cụ thể",
    positions: [
      ["Tình huống", "Bản chất của vấn đề bạn đang gặp."],
      ["Hành động", "Điều bạn nên làm hoặc cần chú ý."],
      ["Kết quả", "Kết quả có khả năng xảy ra nếu bạn làm theo."],
    ],
  },
  love: {
    name: "Bạn – Người ấy – Mối quan hệ", short: "3 lá · cho câu hỏi tình cảm",
    positions: [
      ["Bạn", "Cảm xúc và vai trò của bạn trong mối quan hệ."],
      ["Người ấy", "Cảm xúc và vai trò của người kia."],
      ["Mối quan hệ", "Năng lượng chung và hướng phát triển."],
    ],
  },
  celtic: {
    name: "Thập Tự Celtic", short: "10 lá · trải bài sâu, cho người đã quen",
    positions: [
      ["Hiện tại", "Trung tâm của vấn đề."],
      ["Thử thách", "Điều đang cản trở hoặc cắt ngang (lá nằm ngang)."],
      ["Nền tảng", "Gốc rễ sâu xa, điều nằm trong tiềm thức."],
      ["Quá khứ gần", "Sự việc vừa qua đang dần rời đi."],
      ["Mục tiêu", "Điều bạn hướng tới, mong muốn có ý thức."],
      ["Tương lai gần", "Điều sắp đến trong thời gian tới."],
      ["Bản thân", "Thái độ và cách bạn đang nhìn vấn đề."],
      ["Môi trường", "Người xung quanh và hoàn cảnh bên ngoài."],
      ["Hy vọng & lo sợ", "Điều bạn mong — hoặc sợ — sẽ xảy ra."],
      ["Kết quả", "Kết quả có khả năng xảy ra."],
    ],
  },
};

const ROMAN = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
const COURT_MARK = { page: "✧", knight: "♞", queen: "♛", king: "♚" };
const TEXT_VS = "︎"; // render symbols as text, not emoji

/* ---------------- Helpers ---------------- */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();

function randomInt(max) {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let INDEX = null;
const cardCache = new Map();

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}
async function loadIndex() {
  if (!INDEX) INDEX = await fetchJSON(DATA_DIR + "index.json");
  return INDEX;
}
async function loadCard(id) {
  if (!cardCache.has(id)) cardCache.set(id, fetchJSON(DATA_DIR + encodeURIComponent(id) + ".json"));
  return cardCache.get(id);
}

/* ---------------- Card art ---------------- */

const SUIT_SVG = {
  wands: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" aria-hidden="true"><path d="M22 58 42 6"/><path d="M37 19c6-1 10-5 11-11"/><path d="M30 37c-7 1-11-3-13-9"/><path d="M34 28c5 2 9 1 12-2"/></svg>',
  cups: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" aria-hidden="true"><path d="M14 8h36v8a18 18 0 0 1-36 0z"/><path d="M32 34v14"/><path d="M20 56h24l-4-8H24z"/></svg>',
  swords: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M32 4l5 8v32H27V12z"/><path d="M18 44h28"/><path d="M32 44v11"/><circle cx="32" cy="58" r="2.5"/></svg>',
  pentacles: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="27"/><path d="M32 12 43.8 48.2 13 25.8h38L20.2 48.2z"/></svg>',
};

function cardFace(c, reversed = false, eager = false) {
  const alt = `${c.nameVi} (${c.name})${reversed ? " – ngược" : ""}`;
  return `<div class="tcard${reversed ? " is-reversed" : ""}">
    <img src="${esc(c.image)}" alt="${esc(alt)}" width="500" height="862" ${eager ? "" : 'loading="lazy"'} decoding="async">
  </div>`;
}
const cardBack = () => '<div class="tcard-back"><span>✦</span></div>';

function groupOf(c) { return c.arcana === "major" ? "major" : c.suit; }
function groupLabel(c) { return c.arcana === "major" ? "Ẩn Chính" : `Ẩn Phụ · Bộ ${SUITS[c.suit].vi}`; }

/* ---------------- Router ---------------- */

const routes = [
  [/^\/?$/, renderHome, "home"],
  [/^\/cards\/?$/, renderLibrary, "cards"],
  [/^\/card\/([\w-]+)\/?$/, renderDetail, "cards"],
  [/^\/reading\/?$/, renderReading, "reading"],
];

async function route() {
  const path = decodeURIComponent(location.hash.replace(/^#/, "")) || "/";
  const match = routes.find(([re]) => re.test(path)) || routes[0];
  const [re, view, nav] = match;
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === nav));
  try {
    await loadIndex();
    await view(...(path.match(re) || []).slice(1));
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="panel"><h2>Không tải được dữ liệu</h2>
      <p>Trình duyệt chặn đọc file JSON khi mở trực tiếp <code>index.html</code>. Hãy chạy một web server tĩnh trong thư mục dự án, ví dụ:</p>
      <p><code>python -m http.server 8000</code> rồi mở <a href="http://localhost:8000">http://localhost:8000</a></p>
      <p class="muted">${esc(err.message)}</p></div>`;
  }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);

/* ---------------- Home / Nhập môn ---------------- */

function renderHome() {
  const byId = Object.fromEntries(INDEX.map((c) => [c.id, c]));
  const fan = ["the-fool", "the-high-priestess", "the-star", "ace-of-cups", "the-sun"];
  const angles = [-26, -13, 0, 13, 26];
  const majorRows = [
    [1, 7, "Thế giới bên ngoài", "Chàng Khờ học về ý chí, trực giác, gia đình, xã hội, tình yêu và chiến thắng — những trụ cột của đời sống ý thức."],
    [8, 14, "Thế giới nội tâm", "Hành trình hướng vào trong: sức mạnh nội tâm, sự cô độc, số phận, công lý, buông bỏ, chuyển hóa và cân bằng."],
    [15, 21, "Thế giới tâm linh", "Đối diện bóng tối, sụp đổ ảo tưởng, tìm lại hy vọng, đi qua sợ hãi để đến ánh sáng, thức tỉnh và viên mãn."],
  ];
  const majors = INDEX.filter((c) => c.arcana === "major");

  app.innerHTML = `
  <section class="hero">
    <div>
      <div class="eyebrow">Tarot cho người mới bắt đầu</div>
      <h1>Hiểu từng lá bài, rồi tự đọc câu chuyện của mình</h1>
      <p class="lead">Cam Tarot giải thích đủ 78 lá bài Rider–Waite–Smith: ý nghĩa xuôi và ngược, biểu tượng trong tranh, tình yêu, công việc, tài chính, kèm mẹo ghi nhớ. Học xong thì thử trải bài ngay.</p>
      <div class="actions">
        <a class="btn" href="#/cards">Khám phá 78 lá bài</a>
        <a class="btn ghost" href="#/reading">Rút một lá hôm nay</a>
      </div>
    </div>
    <div class="hero-fan" aria-hidden="true">
      ${fan.map((id, i) => `<div style="transform: translateX(-50%) rotate(${angles[i]}deg)" class="hero-card">${cardFace(byId[id], false, true)}</div>`).join("")}
    </div>
  </section>

  <section class="section grid-3">
    <a class="panel feature" href="#learn-structure"><div class="ico">❶</div><h3>Nắm cấu trúc bộ bài</h3><p class="muted">22 Ẩn Chính, 56 Ẩn Phụ, 4 bộ nguyên tố và ý nghĩa các con số.</p></a>
    <a class="panel feature" href="#/cards"><div class="ico">❷</div><h3>Học từng lá</h3><p class="muted">Mỗi lá có từ khóa, mô tả tranh, biểu tượng, nghĩa xuôi/ngược và mẹo nhớ.</p></a>
    <a class="panel feature" href="#/reading"><div class="ico">❸</div><h3>Thực hành trải bài</h3><p class="muted">5 kiểu trải bài từ 1 lá đến Thập Tự Celtic, có giải nghĩa theo vị trí.</p></a>
  </section>

  <section class="section grid-2">
    <div>
      <div class="eyebrow">Bài 1</div>
      <h2>Tarot là gì?</h2>
      <p>Tarot là bộ bài 78 lá, xuất hiện ở Ý vào thế kỷ 15 như một trò chơi bài (<i>tarocchi</i>). Đến thế kỷ 18, các nhà huyền học châu Âu bắt đầu dùng nó như công cụ chiêm nghiệm và bói toán.</p>
      <p>Năm 1909, Arthur Edward Waite cùng họa sĩ Pamela Colman Smith phát hành bộ <b>Rider–Waite–Smith</b>. Đây là bộ đầu tiên vẽ tranh minh họa cho tất cả 78 lá, và cũng là bộ phổ biến nhất hiện nay. Website này dùng bộ đó làm chuẩn.</p>
      <p>Hiểu đơn giản: mỗi lá bài là một <b>hình ảnh mang ý nghĩa tượng trưng</b>. Khi đặt các lá cạnh nhau theo vị trí, bạn có một câu chuyện để suy ngẫm về tình huống của mình. Tarot không "phán" tương lai cố định; nó giúp bạn nhìn vấn đề từ nhiều góc.</p>
    </div>
    <div class="panel" id="learn-structure">
      <div class="eyebrow">Bài 2</div>
      <h2>Cấu trúc 78 lá</h2>
      <p><b style="color:var(--major)">22 lá Ẩn Chính (Major Arcana)</b> — đánh số 0 đến 21, là những nguyên mẫu và bài học lớn của đời người.</p>
      <p><b style="color:var(--gold)">56 lá Ẩn Phụ (Minor Arcana)</b> — chuyện thường ngày, chia làm 4 bộ (Gậy, Cốc, Kiếm, Tiền). Mỗi bộ có 14 lá:</p>
      <ul>
        <li><b>10 lá số</b>: Át (1) đến Mười.</li>
        <li><b>4 lá hoàng gia</b>: Tiểu Đồng, Hiệp Sĩ, Nữ Hoàng, Vua. Thường chỉ một người, hoặc một tính cách/cách hành xử.</li>
      </ul>
      <p class="muted">Mẹo: Ẩn Phụ rất giống bộ bài tây. Gậy = Chuồn, Cốc = Cơ, Kiếm = Bích, Tiền = Rô.</p>
    </div>
  </section>

  <section class="section">
    <div class="eyebrow">Bài 3</div>
    <h2>Bốn bộ Ẩn Phụ và bốn nguyên tố</h2>
    <p class="muted" style="max-width:760px">Muốn đoán nhanh nghĩa một lá Ẩn Phụ, chỉ cần ghép <b>nguyên tố của bộ</b> với <b>ý nghĩa con số</b>. Ví dụ: Năm (xung đột) + Kiếm (tư duy, lời nói) = tranh cãi, thắng bằng mọi giá.</p>
    <div class="grid-4">
      ${Object.entries(SUITS).map(([k, s]) => `
        <div class="panel suit-box" style="--c:var(--${k})">
          <h3>${SUIT_SVG[k]} ${s.vi} <span class="muted" style="font-size:.9rem">${s.en}</span></h3>
          <dl><dt>Nguyên tố</dt><dd>${s.element}</dd><dt>Chủ đề</dt><dd>${s.theme}</dd><dt>Cung</dt><dd>${s.signs}</dd><dt>Bài tây</dt><dd>${s.playing}</dd></dl>
          <p style="margin:12px 0 0"><a href="#/cards" data-filter="${k}">Xem 14 lá ${s.vi} →</a></p>
        </div>`).join("")}
    </div>
  </section>

  <section class="section grid-2">
    <div>
      <div class="eyebrow">Bài 4</div>
      <h2>Ý nghĩa các con số</h2>
      <table class="num-table"><tbody>
        ${["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((k) => `<tr><th>${NUMBERS[k][0]}</th><td>${NUMBERS[k][1]}</td></tr>`).join("")}
      </tbody></table>
    </div>
    <div>
      <div class="eyebrow">Bài 5</div>
      <h2>Lá hoàng gia</h2>
      <table class="num-table"><tbody>
        ${["page", "knight", "queen", "king"].map((k) => `<tr><th>${COURT_MARK[k]}${TEXT_VS} ${NUMBERS[k][0]}</th><td>${NUMBERS[k][1]}</td></tr>`).join("")}
      </tbody></table>
      <p class="muted" style="margin-top:14px">Lá hoàng gia có thể chỉ <b>một người cụ thể</b> trong đời bạn, <b>một khía cạnh tính cách</b> của chính bạn, hoặc <b>cách bạn nên hành xử</b>. Ví dụ, Nữ Hoàng Cốc có thể là một người bạn giàu lòng trắc ẩn, hoặc lời nhắc bạn hãy lắng nghe cảm xúc.</p>
    </div>
  </section>

  <section class="section">
    <div class="eyebrow">Bài 6</div>
    <h2>Hành trình của Chàng Khờ</h2>
    <p class="muted" style="max-width:760px">Có một cách dễ nhớ 22 lá Ẩn Chính: đặt Chàng Khờ (0) làm nhân vật chính, rồi xếp 21 lá còn lại thành 3 hàng, mỗi hàng 7 lá. Mỗi hàng là một chặng đường.</p>
    <div class="grid-3">
      ${majorRows.map(([a, b, t, d]) => `
        <div class="panel">
          <h3>${ROMAN[a]} – ${ROMAN[b]} · ${t}</h3>
          <p class="muted">${d}</p>
          <div>${majors.filter((c) => c.number >= a && c.number <= b).map((c) => `<a class="chip" href="#/card/${c.id}">${ROMAN[c.number]} ${esc(c.nameVi)}</a>`).join("")}</div>
        </div>`).join("")}
    </div>
  </section>

  <section class="section grid-2">
    <div>
      <div class="eyebrow">Bài 7</div>
      <h2>Lá xuôi và lá ngược</h2>
      <p>Khi rút bài, lá có thể ra <b style="color:var(--up)">xuôi</b> (đúng chiều) hoặc <b style="color:var(--down)">ngược</b> (lộn đầu). Lá ngược <b>không có nghĩa là xấu</b>. Thường có ba cách hiểu:</p>
      <ul>
        <li><b>Năng lượng bị chặn</b>: ý nghĩa của lá đang có nhưng chưa thể hiện được.</li>
        <li><b>Hướng vào trong</b>: chuyện đang diễn ra trong lòng bạn, chưa lộ ra ngoài.</li>
        <li><b>Thái quá hoặc thiếu hụt</b>: ý nghĩa xuôi bị đẩy quá mức, hoặc đang thiếu.</li>
      </ul>
      <p class="muted">Lá vốn đã nặng nề (như Ba Kiếm, Ác Quỷ) khi ngược lại thường mang nghĩa đang thoát ra, hồi phục. Người mới có thể bỏ qua lá ngược lúc đầu. Ở trang Xem bài có tùy chọn tắt chế độ này.</p>
    </div>
    <div class="panel">
      <div class="eyebrow">Bài 8</div>
      <h2>Cách tự xem bài</h2>
      <ol class="steps">
        <li><b>Tĩnh tâm</b> và đặt một câu hỏi mở. Nên hỏi "Tôi cần hiểu gì về…?" thay vì "Có hay không?".</li>
        <li><b>Chọn kiểu trải bài</b>. Người mới nên bắt đầu với 1 hoặc 3 lá.</li>
        <li><b>Xáo bài và rút</b> trong lúc vẫn giữ câu hỏi trong đầu.</li>
        <li><b>Nhìn tranh trước</b>. Lá bài gợi cho bạn cảm giác gì? Màu sắc, nhân vật đang làm gì?</li>
        <li><b>Đọc nghĩa theo vị trí</b>. Cùng một lá, ở vị trí "Quá khứ" sẽ khác với ở vị trí "Lời khuyên".</li>
        <li><b>Kết nối các lá</b> thành một câu chuyện. Để ý số lá Ẩn Chính, bộ nào xuất hiện nhiều, con số nào lặp lại.</li>
      </ol>
    </div>
  </section>

  <section class="section panel">
    <div class="eyebrow">Mẹo học</div>
    <h2>Học 78 lá mà không bị ngợp</h2>
    <div class="grid-3">
      <div><h3>Một lá mỗi ngày</h3><p class="muted">Mỗi sáng rút một lá, đọc nghĩa, tối nhìn lại xem nó liên quan thế nào đến ngày của bạn.</p></div>
      <div><h3>Bộ + Số = Nghĩa</h3><p class="muted">Không cần học thuộc 56 lá Ẩn Phụ. Chỉ cần nhớ 4 bộ, 10 con số và 4 lá hoàng gia, rồi ghép lại.</p></div>
      <div><h3>Viết nhật ký</h3><p class="muted">Ghi lại lá bài, câu hỏi và cảm nhận của bạn. Dần dần bạn sẽ có cách hiểu của riêng mình.</p></div>
    </div>
  </section>`;

  app.querySelectorAll("[data-filter]").forEach((a) => a.addEventListener("click", () => { libState.filter = a.dataset.filter; }));
  app.querySelector('a[href="#learn-structure"]').addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("learn-structure").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------------- Library ---------------- */

const libState = { filter: "all", q: "" };
const GROUPS = [
  ["major", "Ẩn Chính", MAJOR_DESC],
  ...Object.entries(SUITS).map(([k, s]) => [k, `Bộ ${s.vi}`, `${s.desc} Nguyên tố: ${s.element}.`]),
];

function renderLibrary() {
  app.innerHTML = `
    <div class="lib-head">
      <div><div class="eyebrow">Thư viện</div><h1 style="margin:0">78 lá bài Tarot</h1></div>
      <input class="search" type="search" placeholder="Tìm tên lá hoặc từ khóa…" value="${esc(libState.q)}" aria-label="Tìm lá bài">
    </div>
    <div class="filters" role="tablist">
      ${[["all", "Tất cả"], ...GROUPS.map(([k, t]) => [k, t])].map(([k, t]) => `<button data-f="${k}" class="${libState.filter === k ? "active" : ""}">${t}</button>`).join("")}
    </div>
    <div id="lib-results"></div>`;

  const results = app.querySelector("#lib-results");
  const draw = () => {
    const q = norm(libState.q.trim());
    let html = "";
    for (const [key, title, desc] of GROUPS) {
      if (libState.filter !== "all" && libState.filter !== key) continue;
      const list = INDEX.filter((c) => groupOf(c) === key)
        .filter((c) => !q || norm([c.name, c.nameVi, ...c.keywords].join(" ")).includes(q));
      if (!list.length) continue;
      html += `<div class="group-title"><h2>${title}</h2><span class="muted">${list.length} lá</span></div>
        ${q ? "" : `<p class="group-desc">${desc}</p>`}
        <div class="card-grid">${list.map((c) => `
          <a class="card-tile" href="#/card/${c.id}">${cardFace(c)}
            <div class="meta"><b>${esc(c.nameVi)}</b><span>${c.keywords.slice(0, 3).map(esc).join(" · ")}</span></div>
          </a>`).join("")}</div>`;
    }
    results.innerHTML = html || `<p class="empty">Không tìm thấy lá bài nào cho "${esc(libState.q)}".</p>`;
  };

  app.querySelector(".search").addEventListener("input", (e) => { libState.q = e.target.value; draw(); });
  app.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => {
    libState.filter = b.dataset.f;
    app.querySelectorAll("[data-f]").forEach((x) => x.classList.toggle("active", x === b));
    draw();
  }));
  draw();
}

/* ---------------- Card detail ---------------- */

const ASPECTS = [["general", "Tổng quan", true], ["love", "Tình yêu"], ["career", "Công việc"], ["finance", "Tài chính"]];

async function renderDetail(id) {
  const c = await loadCard(id);
  const i = INDEX.findIndex((x) => x.id === id);
  const prev = INDEX[(i - 1 + INDEX.length) % INDEX.length];
  const next = INDEX[(i + 1) % INDEX.length];
  let orient = "upright";

  const facts = [
    ["Nhóm", groupLabel(c)],
    [c.arcana === "major" ? "Số" : "Cấp bậc", c.arcana === "major" ? `${c.number} (${ROMAN[c.number]})` : NUMBERS[c.rank][0]],
    ["Nguyên tố", c.element],
    c.astrology && ["Chiêm tinh", c.astrology],
    ["Có / Không", c.yesNo],
  ].filter(Boolean);

  const quick = c.arcana === "minor"
    ? `<div class="callout"><b>Hiểu nhanh bằng công thức:</b> ${esc(NUMBERS[c.rank][0])} (${esc(NUMBERS[c.rank][1].toLowerCase().replace(/\.$/, ""))}) + Bộ ${SUITS[c.suit].vi} (${SUITS[c.suit].theme}).</div>`
    : "";

  const meanings = () => {
    const m = c[orient];
    return ASPECTS.filter(([k]) => m[k]).map(([k, label, wide]) =>
      `<div class="panel ${wide ? "wide" : ""}"><h4>${label}</h4><p>${esc(m[k])}</p></div>`).join("");
  };

  app.innerHTML = `
    <div class="crumbs"><a href="#/cards">Thư viện</a> / ${groupLabel(c)} / ${esc(c.nameVi)}</div>
    <div class="detail">
      <aside class="detail-aside">
        <div id="big-card">${cardFace(c)}</div>
        <button class="btn ghost toggle" id="flip-btn">⟲ Xem chiều ngược</button>
      </aside>
      <article>
        <div class="eyebrow">${groupLabel(c)}</div>
        <h1>${esc(c.nameVi)}</h1>
        <div class="en">${esc(c.name)}</div>
        <div>${c.keywords.upright.map((k) => `<span class="chip up">${esc(k)}</span>`).join("")}</div>
        <div>${c.keywords.reversed.map((k) => `<span class="chip down">↓ ${esc(k)}</span>`).join("")}</div>
        <div class="facts">${facts.map(([k, v]) => `<div class="fact"><small>${k}</small><b>${esc(v)}</b></div>`).join("")}</div>

        <div class="block"><h3>Hình ảnh trên lá bài</h3><p>${esc(c.imagery)}</p>
          ${c.symbols?.length ? `<div class="symbols">${c.symbols.map((s) => `<div class="symbol"><b>${esc(s.name)}:</b> ${esc(s.meaning)}</div>`).join("")}</div>` : ""}
        </div>

        <div class="block">
          <h3>Ý nghĩa</h3>
          <div class="tabs" role="tablist">
            <button data-o="upright" class="up active">↑ Xuôi</button>
            <button data-o="reversed" class="down">↓ Ngược</button>
          </div>
          <div class="meaning-grid" id="meanings">${meanings()}</div>
        </div>

        <div class="block">
          ${quick}
          <div class="callout"><b>Lời khuyên:</b> ${esc(c.advice)}</div>
          <div class="callout"><b>Mẹo ghi nhớ:</b> ${esc(c.memoryTip)}</div>
        </div>

        <nav class="pager">
          <a href="#/card/${prev.id}">← Lá trước<br><b>${esc(prev.nameVi)}</b></a>
          <a href="#/card/${next.id}" style="text-align:right">Lá sau →<br><b>${esc(next.nameVi)}</b></a>
        </nav>
      </article>
    </div>`;

  const setOrient = (o) => {
    orient = o;
    app.querySelectorAll("[data-o]").forEach((b) => b.classList.toggle("active", b.dataset.o === o));
    app.querySelector("#meanings").innerHTML = meanings();
    app.querySelector("#big-card .tcard").classList.toggle("is-reversed", o === "reversed");
    app.querySelector("#flip-btn").textContent = o === "reversed" ? "⟲ Xem chiều xuôi" : "⟲ Xem chiều ngược";
  };
  app.querySelectorAll("[data-o]").forEach((b) => b.addEventListener("click", () => setOrient(b.dataset.o)));
  app.querySelector("#flip-btn").addEventListener("click", () => setOrient(orient === "upright" ? "reversed" : "upright"));
}

/* ---------------- Reading ---------------- */

const readState = { spread: "ppf", topic: "general", question: "", reversals: true };
const TOPICS = { general: "Tổng quát", love: "Tình yêu", career: "Công việc", finance: "Tài chính" };
const SPREAD_TOPIC = { love: "love" }; // spreads that imply a topic when picked

function renderReading() {
  app.innerHTML = `
    <div class="eyebrow">Xem bài</div>
    <h1>Trải bài Tarot online</h1>
    <p class="muted" style="max-width:720px">Hít thở vài nhịp, nghĩ về câu hỏi của bạn, chọn kiểu trải bài rồi rút. Bấm vào từng lá để lật và đọc ý nghĩa theo vị trí.</p>
    <div class="reading-setup section" style="margin-top:28px">
      <div class="panel">
        <h3>1. Chọn kiểu trải bài</h3>
        <div class="spreads">
          ${Object.entries(SPREADS).map(([k, s]) => `<button class="spread-opt ${readState.spread === k ? "active" : ""}" data-s="${k}"><b>${s.name}</b><span>${s.short}</span></button>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h3>2. Chủ đề</h3>
        <p class="muted" style="font-size:.9rem;margin-bottom:10px">Ý nghĩa mỗi lá sẽ được đọc theo chủ đề bạn chọn.</p>
        <div class="filters" style="margin-bottom:24px">
          ${Object.entries(TOPICS).map(([k, t]) => `<button data-t="${k}" class="${readState.topic === k ? "active" : ""}">${t}</button>`).join("")}
        </div>
        <h3>3. Câu hỏi của bạn</h3>
        <label class="field"><span>Không bắt buộc. Câu hỏi mở thường cho kết quả hữu ích hơn.</span>
          <textarea id="q" placeholder="Ví dụ: Tôi cần hiểu điều gì về công việc hiện tại?">${esc(readState.question)}</textarea></label>
        <label class="check"><input type="checkbox" id="rev" ${readState.reversals ? "checked" : ""}>
          <span>Cho phép lá ngược. Người mới có thể tắt để chỉ học nghĩa xuôi trước.</span></label>
        <button class="btn" id="draw">✦ Xáo bài và rút</button>
      </div>
    </div>`;

  const setTopic = (t) => {
    readState.topic = t;
    app.querySelectorAll("[data-t]").forEach((x) => x.classList.toggle("active", x.dataset.t === t));
  };
  app.querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => setTopic(b.dataset.t)));
  app.querySelectorAll("[data-s]").forEach((b) => b.addEventListener("click", () => {
    readState.spread = b.dataset.s;
    app.querySelectorAll("[data-s]").forEach((x) => x.classList.toggle("active", x === b));
    if (SPREAD_TOPIC[b.dataset.s]) setTopic(SPREAD_TOPIC[b.dataset.s]);
  }));
  app.querySelector("#draw").addEventListener("click", async (e) => {
    e.target.disabled = true;
    readState.question = app.querySelector("#q").value.trim();
    readState.reversals = app.querySelector("#rev").checked;
    const spread = SPREADS[readState.spread];
    const picks = shuffle(INDEX).slice(0, spread.positions.length);
    const cards = await Promise.all(picks.map((p) => loadCard(p.id)));
    // Preload card images so faces are ready when flipped; a failed image shouldn't block the reading.
    await Promise.all(cards.map((c) => { const img = new Image(); img.src = c.image; return img.decode().catch(() => {}); }));
    const draws = cards.map((card) => ({ card, reversed: readState.reversals && randomInt(2) === 1, open: false }));
    renderTable(spread, draws);
  });
}

function renderTable(spread, draws) {
  const isCeltic = spread === SPREADS.celtic;
  app.innerHTML = `
    <div class="eyebrow">${esc(spread.name)} · Chủ đề: ${TOPICS[readState.topic]}</div>
    <h1 style="text-align:center">Bấm vào từng lá để lật</h1>
    ${readState.question ? `<p class="question-echo">“${esc(readState.question)}”</p>` : ""}
    <div class="table ${isCeltic ? "celtic" : ""}">
      ${draws.map((d, i) => `
        <div class="slot p${i + 1} deal" style="animation-delay:${i * 80}ms">
          <button class="flip" data-i="${i}" aria-label="Lật lá ${i + 1}: ${esc(spread.positions[i][0])}">
            <div class="inner"><div class="face back">${cardBack()}</div><div class="face front">${cardFace(d.card, d.reversed, true)}</div></div>
          </button>
          <div class="pos"><b>${i + 1}. ${esc(spread.positions[i][0])}</b></div>
        </div>`).join("")}
    </div>
    <div class="toolbar">
      <button class="btn ghost" id="open-all">Lật tất cả</button>
      <button class="btn" id="again">Rút lại</button>
    </div>
    <section class="section">
      <h2>Giải nghĩa</h2>
      <div class="results" id="results"><p class="muted">Lật một lá để xem ý nghĩa.</p></div>
    </section>`;

  const resultsEl = app.querySelector("#results");
  const drawResults = () => {
    const opened = draws.map((d, i) => [d, i]).filter(([d]) => d.open);
    if (!opened.length) return;
    let html = opened.map(([d, i]) => {
      const c = d.card, o = d.reversed ? "reversed" : "upright";
      const [pos, posDesc] = spread.positions[i];
      return `<div class="result panel">
        ${cardFace(c, d.reversed, true)}
        <div>
          <div class="posname">${i + 1}. ${esc(pos)} · <span class="muted" style="text-transform:none;letter-spacing:0;font-weight:400">${esc(posDesc)}</span></div>
          <h3>${esc(c.nameVi)} <span class="orient ${d.reversed ? "down" : "up"}">${d.reversed ? "↓ Ngược" : "↑ Xuôi"}</span></h3>
          <div>${c.keywords[o].map((k) => `<span class="chip ${d.reversed ? "down" : "up"}">${esc(k)}</span>`).join("")}</div>
          ${topicMeaning(c, o, readState.topic)}
          <p class="muted"><b>Lời khuyên:</b> ${esc(c.advice)} · <a href="#/card/${c.id}">Tìm hiểu kỹ lá này →</a></p>
        </div>
      </div>`;
    }).join("");
    if (opened.length === draws.length && draws.length >= 3) html += summary(draws);
    resultsEl.innerHTML = html;
  };

  const open = (i) => {
    if (draws[i].open) return;
    draws[i].open = true;
    app.querySelector(`.flip[data-i="${i}"]`).classList.add("open");
    drawResults();
  };
  app.querySelectorAll(".flip").forEach((b) => b.addEventListener("click", () => open(+b.dataset.i)));
  app.querySelector("#open-all").addEventListener("click", () => draws.forEach((_, i) => open(i)));
  app.querySelector("#again").addEventListener("click", renderReading);
  if (draws.length === 1) setTimeout(() => open(0), 700);
}

// Meaning for the chosen topic; general meaning stays visible as context.
// Not every card has every topic for both orientations (reversed has no finance), so fall back to general.
function topicMeaning(c, o, topic) {
  const general = esc(c[o].general);
  if (topic === "general") return `<p>${general}</p>`;
  const text = c[o][topic];
  if (!text) return `<p>${general}</p><p class="muted" style="font-size:.88rem">Lá này chưa có nghĩa ${TOPICS[topic].toLowerCase()} riêng cho chiều ${o === "reversed" ? "ngược" : "xuôi"}, nên trang đang hiện nghĩa tổng quan.</p>`;
  return `<p><b style="color:var(--gold)">${TOPICS[topic]}:</b> ${esc(text)}</p><p class="muted"><b>Tổng quan:</b> ${general}</p>`;
}

function summary(draws) {
  const n = draws.length;
  const majors = draws.filter((d) => d.card.arcana === "major").length;
  const rev = draws.filter((d) => d.reversed).length;
  const counts = {};
  draws.forEach((d) => { if (d.card.suit) counts[d.card.suit] = (counts[d.card.suit] || 0) + 1; });
  const [topSuit, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || [];
  const notes = [];
  notes.push(majors >= Math.ceil(n / 2)
    ? `Có <b>${majors}/${n} lá Ẩn Chính</b>: đây là giai đoạn có ý nghĩa lớn, có thể là bước ngoặt hoặc bài học quan trọng.`
    : `Có <b>${majors}/${n} lá Ẩn Chính</b>: phần lớn chuyện nằm trong tầm tay bạn, thuộc về đời sống thường ngày.`);
  if (topSuit && topCount >= 2) notes.push(`Bộ <b>${SUITS[topSuit].vi}</b> xuất hiện ${topCount} lần, nên chủ đề nổi bật là ${SUITS[topSuit].theme}.`);
  if (rev) notes.push(`Có <b>${rev} lá ngược</b>: một số năng lượng đang bị chặn, hướng vào trong, hoặc cần được điều chỉnh.`);
  return `<div class="callout"><b>Nhìn tổng thể:</b><ul style="margin:8px 0 0">${notes.map((x) => `<li>${x}</li>`).join("")}</ul>
    <p class="muted" style="margin:8px 0 0">Hãy thử nối các lá thành một câu chuyện theo thứ tự vị trí. Cảm nhận của bạn cũng quan trọng như nghĩa trong sách.</p></div>`;
}
