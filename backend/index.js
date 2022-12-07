import mongoose from "mongoose";
import config from "./config/index.js";
import app from "./app.js";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB CONNECTED");

    app.on("error", (err) => {
      console.error("ERROR: ", err);
      throw err;
    });

    const onListening = () => {
      console.log(`Listening on ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
  } catch (err) {
    console.error("ERROR ", err);
    throw err;
  }
})();
