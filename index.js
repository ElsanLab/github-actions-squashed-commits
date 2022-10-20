const core = require("@actions/core");
const github = require("@actions/github");

try {
  const token = core.getInput("token");
  console.log("OH HELLO :D");
} catch (error) {
  core.setFailed(error.message);
}
