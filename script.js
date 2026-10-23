/*
  DakuBhaiya setup:
  1) Replace TELEGRAM_URL with your public Telegram group/channel link.
  2) Set STREAM_TYPE to "mp4" for an authorized direct .mp4 URL,
     or "embed" for an authorized provider's embed URL.
  3) Never paste a private stream key or a link you do not have permission to use.
*/
const CONFIG = {
  telegramUrl: "https://t.me/punters_gang",
  matchTitle: "Cricket Live Stream",
  teamA: "Team A",
  teamB: "Team B",
  format: "T20 / ODI",
  matchTime: "Add match date and time",
  // Use only a source you own or are authorized to embed.
  streamType: "none", // "none", "mp4", or "embed"
  streamUrl: "",
  fixtures: [
    { date: "UPCOMING", title: "Team A vs Team B", details: "Add date • time • format" },
    { date: "UPCOMING", title: "Team C vs Team D", details: "Add date • time • format" },
    { date: "UPCOMING", title: "Team E vs Team F", details: "Add date • time • format" }
  ]
};

document.querySelectorAll(".telegram-link").forEach(link => {
  link.href = CONFIG.telegramUrl;
});

document.getElementById("match-title").textContent = CONFIG.matchTitle;
document.getElementById("fixture-title").textContent = `${CONFIG.teamA} vs ${CONFIG.teamB}`;
document.getElementById("team-a").textContent = CONFIG.teamA;
document.getElementById("team-b").textContent = CONFIG.teamB;
document.getElementById("format").textContent = CONFIG.format;
document.getElementById("match-time").textContent = CONFIG.matchTime;
document.getElementById("year").textContent = new Date().getFullYear();

const player = document.getElementById("player");
if (CONFIG.streamUrl && CONFIG.streamType === "mp4") {
  const video = document.createElement("video");
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.src = CONFIG.streamUrl;
  player.replaceChildren(video);
} else if (CONFIG.streamUrl && CONFIG.streamType === "embed") {
  const iframe = document.createElement("iframe");
  iframe.src = CONFIG.streamUrl;
  iframe.title = "Authorized cricket stream";
  iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  player.replaceChildren(iframe);
}

const schedule = document.getElementById("schedule-list");
CONFIG.fixtures.forEach(fixture => {
  const card = document.createElement("article");
  card.className = "schedule-card";
  const date = document.createElement("div");
  date.className = "date";
  date.textContent = fixture.date;
  const title = document.createElement("h3");
  title.textContent = fixture.title;
  const details = document.createElement("p");
  details.textContent = fixture.details;
  card.append(date, title, details);
  schedule.append(card);
});
