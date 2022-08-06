const express = require("express");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 9000;

app.get("/proxy", async (req, res) => {
  try {
    const response = await axios.get(req.headers.targeturl);

    res.send({
      targeturl: req.headers.targeturl,
      data: response.data,
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
