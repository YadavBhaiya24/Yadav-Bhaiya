
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/score") {
      const key = env.CRICDATA_API_KEY;

      if (!key) {
        return Response.json(
          { error: "API key not configured" },
          { status: 500 }
        );
      }

      try {
        const apiUrl = new URL(
          "https://api.cricapi.com/v1/currentMatches"
        );
        apiUrl.searchParams.set("apikey", key);
        apiUrl.searchParams.set("offset", "0");

        const response = await fetch(apiUrl);
        const data = await response.json();

        return Response.json(data, {
          status: response.ok ? 200 : 502
        });
      } catch {
        return Response.json(
          { error: "Cricket API request failed" },
          { status: 502 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
