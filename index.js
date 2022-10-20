import * as core from "@actions/core";
import fetch, { Headers } from "node-fetch";

try {
  const token = core.getInput("token");

  if (!token) {
    throw "NO TOKEN GIVEN";
  }

  const repo = process.env.GITHUB_REPOSITORY;

  const pullRequestNumber = +process.env.GITHUB_REF_NAME.split("/")[0];
  if (!pullRequestNumber) {
    throw "UNABLE TO GET PR NUMBER";
  }

  if (
    process.env.GITHUB_REF_TYPE !== "branch" ||
    process.env.GITHUB_EVENT_NAME !== "pull_request"
  ) {
    throw "THIS ACTION CAN ONLY BE TRIGGERED ON A PULL REQUEST";
  }

  const headers = new Headers({
    Accept: "application/vnd.github+json",
    Authorization: `token ${token}`,
  });
  const opts = {
    method: "GET",
    headers: headers,
  };

  const response = await fetch(
    `https://api.github.com/repos/${repo}/pulls/${pullRequestNumber}`,
    opts
  ).catch((e) => {
    throw e;
  });

  console.log("RESPONSE", response);

  const json = await response.json().catch((e) => {
    throw "Response parsing error";
  });

  console.log("JSON", json);
} catch (error) {
  core.setFailed(error.message);
}
