import gplay from "google-play-scraper";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://propacity.abhinavbajpai.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { appId, lang = "en", country = "us" } = req.query;

  if (!appId) {
    return res.status(400).json({ error: "App ID (packageName) is required" });
  }

  try {
    const appDetails = await gplay.app({
      appId,
      lang,
      country,
    });

    res.json({
      title: appDetails.title,
      summary: appDetails.summary,
      icon: appDetails.icon,
    });
  } catch (error) {
    console.error("Failed to scrape app details:", error);
    res
      .status(500)
      .json({ error: "Failed to scrape app details from Google Play." });
  }
}
