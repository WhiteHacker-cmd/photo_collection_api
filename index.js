require("dotenv").config();
const app = require("./app");
app.set("view engine", "ejs")


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));