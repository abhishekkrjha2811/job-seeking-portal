import app from "./app.js";
import cloudinary from "cloudinary";
import { dbConnection } from "./database/dbConnection.js";
import { server } from "./app.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDNARY_CLIENT_NAME,
  api_key: process.env.CLOUDNARY_CLIENT_API,
  api_secret: process.env.CLOUDNARY_CLIENT_SECRET,
});

const startServer = async () => {
  try {
    await dbConnection();

    app.listen(process.env.PORT, () => {
      console.log(`Server running at port ${process.env.PORT}`);
    });

    server.listen(5000, () => {
      console.log("Socket server running at http://localhost:5000");
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
