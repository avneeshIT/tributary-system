const express= require("express")
const cors = require("cors");

const  app= express();

app.use(express.json());
app.use(cors());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tributes", require("./routes/tributeRoutes"));
app.use("/uploads", express.static("uploads"));

const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);

module.exports=app;