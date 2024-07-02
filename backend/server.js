const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const NodeCache = require("node-cache");
const bodyParser = require("body-parser");
const { csvFileRoutes } = require("./routes/csvFileRoute");
const { userRoutes } = require("./routes/userRoutes");
const fileUpload = require("express-fileupload");
const formRoutes = require("./routes/formRoutes");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51NQ6emFiqR7NdfZALVfJz441sKSJddq4DepocXUtFi2v9E8UAc92p9J3DR9hETvHA6kEIqez7GsGZaSz88ZkBvE300X0iLAfvm"
);
cloudinary.config({
  cloud_name: "dsjrmblq0",
  api_key: "363388135944552",
  api_secret: "ZaqJkMcYaLpLgLUyUkNwaJII100",
});

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB");
});
const myCache = new NodeCache();
module.exports = myCache;
app.use(cors());
app.use(bodyParser.json());

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/csvFile", csvFileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/form", formRoutes);

app.post("/create-payment-intent-and-update-subscription", async (req, res) => {
  const { userId, newPlan, amount } = req.body;

  // Replace with actual user fetching logic from your database
  const getUserFromDatabase = async (userId) => {
    // Simulated database call to fetch user data
    return { stripeCustomerId: "cus_test" }; // Replace with actual data fetching logic
  };

  try {
    const user = await getUserFromDatabase(userId);
    if (!user || !user.stripeCustomerId) {
      return res
        .status(400)
        .json({ error: "User not found or invalid customer ID" });
    }

    const newPlan = {
      "Free Trial": "$100",
      Standard: "$200",
      Premium: "$300",
      Enterprise: "$400",
    };

    const newPriceId = prices[newPlan];
    if (!newPriceId) {
      return res.status(400).json({ error: "Invalid subscription plan" });
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return res
        .status(400)
        .json({ error: "No active subscription found for the user" });
    }

    const subscription = subscriptions.data[0];

    const updatedSubscription = await stripe.subscriptions.update(
      subscription.id,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: newPriceId,
          },
        ],
      }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from MERN server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
