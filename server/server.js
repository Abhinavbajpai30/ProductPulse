const express = require("express");
const gplay = require("google-play-scraper");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // or use '*' to allow all (not recommended for production)
  })
);

app.get("/api/reviews", async (req, res) => {
  const { appId, lang = "en", country = "us", num = 50 } = req.query;

  if (!appId) {
    return res.status(400).json({ error: "App ID (packageName) is required" });
  }

  try {
    const reviews = await gplay.default.reviews({
      appId: appId,
      lang: lang,
      country: country,
      num: parseInt(num, 50),
    });
    // console.log("Sending reviews data for:", appId);
    res.json({reviews: reviews.data});
  } catch (error) {
    console.error("Failed to scrape reviews:", error);
    res
      .status(500)
      .json({ error: "Failed to scrape reviews from Google Play." });
  }
});

app.get("/api/app", async (req, res) => {
  const { appId, lang = "en", country = "us", num = 50 } = req.query;

  if (!appId) {
    return res.status(400).json({ error: "App ID (packageName) is required" });
  }
  
  try {
    const appDetails = await gplay.default.app({
      appId: appId,
      lang: lang,
      country: country,
      num: parseInt(num, 50),
    });
    // console.log("Sending reviews data for:", appId);
    res.json({title: appDetails.title, summary: appDetails.summary, icon: appDetails.icon});
  } catch (error) {
    console.error("Failed to scrape app details:", error);
    res
      .status(500)
      .json({ error: "Failed to scrape app details from Google Play." });
  }
})

app.listen(port, () => {
  console.log("Started backend server!");
});
