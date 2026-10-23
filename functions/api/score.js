
export async function onRequest(context) {
  const apiKey = context.env.CRICKET_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Cricket API key is not configured" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://api.cricapi.com/v1/currentMatches"
  );
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("offset", "0");

  try {
    const response = await fetch(url);
    const data = await response.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, max-age=30"
      }
    });
  } catch {
    return Response.json(
      { error: "Unable to fetch live scores" },
      { status: 502 }
    );
  }
}

