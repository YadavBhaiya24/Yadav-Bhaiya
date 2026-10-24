
/*
  Yadav-Bhaiya Cricket API
*/

const API_URL =
  "https://punters-cricket-api.ahirprince365.workers.dev/";

const TELEGRAM_URL = "https://t.me/punters_gang";

document.querySelectorAll(".telegram-link").forEach(link => {
  link.href = TELEGRAM_URL;
});

const $ = id => document.getElementById(id);

const getMatches = async type => {
  const response = await fetch(
    `${API_URL}?type=${encodeURIComponent(type)}`
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();

  if (result.status === "failure") {
    throw new Error(result.reason || "Cricket API failed");
  }

  return Array.isArray(result.data) ? result.data : [];
};

const matchName = match =>
  match.name ||
  (Array.isArray(match.teams) ? match.teams.join(" vs ") : "Cricket Match");

const matchDate = match => {
  const date = match.dateTimeGMT || match.date;
  if (!date) return "Date not available";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata"
  }) + " IST";
};

const matchScore = match => {
  if (!Array.isArray(match.score) || !match.score.length) {
    return match.status || "Score not available yet";
  }

  return match.score.map(item =>
    `${item.inning || item.team || ""}: ${item.r}/${item.w} (${item.o} ov)`
  ).join(" | ");
};

const setText = (id, value) => {
  const element = $(id);
  if (element) element.textContent = value;
};

async function loadCricketData() {
  setText("year", new Date().getFullYear());

  try {
    const matches = await getMatches("currentMatches");

    if (!matches.length) {
      setText("match-title", "No live match data available");
      setText("fixture-title", "Check upcoming schedule below");
      setText("team-a", "Waiting");
      setText("team-b", "for match");
      setText("format", "Cricket");
      setText("match-time", "No current match returned by API");
    } else {
      const match =
        matches.find(item => item.matchStarted && !item.matchEnded) ||
        matches[0];

      const teams = Array.isArray(match.teams) ? match.teams : [];

      setText("match-title", matchName(match));
      setText("fixture-title", matchName(match));
      setText("team-a", teams[0] || "Team A");
      setText("team-b", teams[1] || "Team B");
      setText("format", (match.matchType || "Cricket").toUpperCase());
      setText(
        "match-time",
        match.status || matchScore(match) || matchDate(match)
      );
    }
  } catch (error) {
    console.error("Current matches error:", error);
    setText("match-title", "Live data temporarily unavailable");
    setText("match-time", "Please try again later");
  }

  const schedule = $("schedule-list");
  if (!schedule) return;

  try {
    const matches = await getMatches("matches");
    const now = Date.now();

    const upcoming = matches
      .filter(match => {
        const date = new Date(match.dateTimeGMT || match.date).getTime();
        return Number.isFinite(date) &&
          date >= now &&
          !match.matchStarted &&
          !match.matchEnded;
      })
      .sort((a, b) =>
        new Date(a.dateTimeGMT || a.date) -
        new Date(b.dateTimeGMT || b.date)
      )
      .slice(0, 10);

    schedule.replaceChildren();

    if (!upcoming.length) {
      const message = document.createElement("p");
      message.textContent = "No upcoming matches returned by API.";
      schedule.append(message);
      return;
    }

    upcoming.forEach(match => {
      const card = document.createElement("article");
      card.className = "schedule-card";

      const date = document.createElement("div");
      date.className = "date";
      date.textContent = matchDate(match);

      const title = document.createElement("h3");
      title.textContent = matchName(match);

      const details = document.createElement("p");
      details.textContent =
        `${(match.matchType || "Cricket").toUpperCase()} • ` +
        (match.status || "Upcoming");

      card.append(date, title, details);
      schedule.append(card);
    });
  } catch (error) {
    console.error("Schedule error:", error);
    schedule.replaceChildren();

    const message = document.createElement("p");
    message.textContent = "Schedule load nahi hua. Please refresh later.";
    schedule.append(message);
  }
}

loadCricketData();
  
