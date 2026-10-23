
/*
  DakuBhaiya setup
*/
const CONFIG = {
  telegramUrl: "https://t.me/punters_gang",
  matchTitle: "India vs New Zealand",
  teamA: "India",
  teamB: "New Zealand",
  format: "T20",
  matchTime: "24 October 2026 • 12:30 PM IST",

  streamType: "none", // "none", "mp4", or "embed"
  streamUrl: "",

  fixtures: [
    {
      date: "24 OCT 2026",
      title: "India vs New Zealand",
      details: "T20 • 12:30 PM IST"
    },
    {
      date: "UPCOMING",
      title: "Upcoming Match",
      details: "Schedule to be updated"
    },
    {
      date: "UPCOMING",
      title: "Upcoming Match",
      details: "Schedule to be updated"
    }
  ]
};

document.querySelectorAll(".telegram-link").forEach(link => {
  link.href = CONFIG.telegramUrl;
});

document.getElementById("match-title").textContent = CONFIG.matchTitle;
document.getElementById("fixture-title").textContent =
  `${CONFIG.teamA} vs ${CONFIG.teamB}`;
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

schedule.replaceChildren();

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
