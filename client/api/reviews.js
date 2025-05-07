import gplay from 'google-play-scraper';

export default async function handler(req, res) {
  const { appId, lang = "en", country = "us", num = 150 } = req.query;

  if (!appId) {
    return res.status(400).json({ error: "App ID (packageName) is required" });
  }

  try {
    const reviews = await gplay.reviews({
      appId,
      lang,
      country,
      num: parseInt(num, 10),
    });
    res.json({ reviews: reviews.data });
  } catch (error) {
    console.error("Failed to scrape reviews:", error);
    res.status(500).json({ error: "Failed to scrape reviews from Google Play." });
  }
}
