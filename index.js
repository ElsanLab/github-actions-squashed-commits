import * as core from "@actions/core";
import fetch, { Headers } from "node-fetch";

try {
  console.log("Checking execution context...");
  if (
    process.env.GITHUB_REF_TYPE !== "branch" ||
    process.env.GITHUB_EVENT_NAME !== "pull_request"
  ) {
    throw "THIS ACTION CAN ONLY BE TRIGGERED ON A PULL REQUEST";
  }

  console.log("Getting token from inputs...");
  const token = core.getInput("token");
  if (!token) {
    throw "NO TOKEN GIVEN";
  }

  console.log("Getting PR number...");
  const pullRequestNumber = +process.env.GITHUB_REF_NAME.split("/")[0];
  if (!pullRequestNumber) {
    throw "UNABLE TO GET PR NUMBER";
  }

  console.log("Getting PR info from repo...");
  const headers = new Headers({
    Accept: "application/vnd.github+json",
    Authorization: `token ${token}`,
  });
  const opts = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pulls/${pullRequestNumber}`,
    opts
  ).catch((e) => {
    throw e;
  });

  const json = await response.json().catch((e) => {
    throw "Response parsing error";
  });

  console.log("Parsing commits count from repo infos...");
  const commitsCount = +json.commits;

  if (commitsCount > 1) {
    throw `Pull request needs to be squashed : ${commitsCount} commits found.`;
  } else {
    console.log("PR commits squashed.");
  }
} catch (error) {
  console.log("ERROR", error);
  core.setFailed(error.message);
}
