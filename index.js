const core = require("@actions/core");
const github = require("@actions/github");

try {
  const token = core.getInput("token");

  if (!token) {
    core.setFailed("NO TOKEN GIVEN");
  }

  console.log("REPO", process.env.GITHUB_REPOSITORY);

  const repo = github.getEnv("GITHUB_REPOSITORY");

  const pullRequestNumber = +github.getEnv("GITHUB_REF_NAME").split("/")[0];
  if (!pullRequestNumber) {
    core.setFailed("UNABLE TO GET PR NUMBER");
  }

  if (
    github.getEnv("GITHUB_REF_TYPE") !== "branch" ||
    github.getEnv("GITHUB_EVENT_NAME") !== "pull_request"
  ) {
    core.setFailed("THIS ACTION CAN ONLY BE TRIGGERED ON A PULL REQUEST");
  }

  const headers = new Headers({
    Accept: "application/vnd.github+json",
    Authorization: `token ${token}`,
  });
  const opts = {
    method: method,
    headers: headers,
  };

  fetch(
    `https://api.github.com/repos/${repo}/pulls/${pullRequestNumber}`,
    opts
  ).then((response) => {
    console.log("RESPONSE", response);
  });
} catch (error) {
  core.setFailed(error.message);
}
