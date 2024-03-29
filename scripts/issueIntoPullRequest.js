#! /usr/bin/env node

// @flow strict

const { execSync } = require("child_process");

const options = { encoding: "utf-8", stdio: "pipe" };

console.log("Converting issue into pull request");

const currentBranch = execSync("git branch | grep \\*", options);
const branch = currentBranch.slice(2, -1);
const issue = branch.split("/")[0];

try {
  const response = execSync(
    `hub pull-request -i ${issue} -b master -h ${branch}`,
    options
  );
  console.log("Pull request link: ", response);
  console.log("Pull request successfully created");
} catch (e) {
  if (e.status === 1) {
    console.log("There was an error during issue's conversion...");
    console.log(
      "\t- It might be because the branch's number is not the same as an issue"
    );
  }
}
