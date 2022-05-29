const express = require("express");
const app = express();
const { nanoid } = require("nanoid");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const urls = [
  {
    shortCode: "test",
    address: "http://www.google.com",
  },
];

app.get("/:shortCode", (req, res) => {
  console.log(req.params.shortCode);
  const shortened = urls.find((url) => url.shortCode === req.params.shortCode);
  if (shortened) {
    res.redirect(shortened.address);
  } else {
    res.status(400).end();
  }
});

app.post("/shorten", async (req, res) => {
  const { address } = req.body;
  const shortCode = await nanoid(6);
  urls.push({ address, shortCode });
  console.log(urls);
  res.json({
    url:
      process.env.NODE_ENV === "production"
        ? `${productionURL}/${shortCode}`
        : `http://localhost:3000/${shortCode}`,
  });
});

app.listen(PORT, () => {
  console.log(process.env);
  console.log(`Server running on http://localhost:${PORT}`);
});
