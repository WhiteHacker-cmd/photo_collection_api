const fs = require("fs");

module.exports = async function removeFileInLocal(path) {
  if (process.env.ENV == "local") {
    try {
      await fs.unlink(path, () => {});
    } catch (error) {
      console.error("there was an error:", error.message);
    }
  }
};
