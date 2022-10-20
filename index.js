const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log("OH HELLO :D");
} catch (error) {
  core.setFailed(error.message);
}
