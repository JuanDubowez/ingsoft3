const { Builder, By } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/firefox.js");
var assert = require("chai").assert;
const VOTE_URL = "https://vote-production.up.railway.app/";
const RESULT_URL = "https://finaling3-result.up.railway.app/";

describe("Test script", function () {
  let driver;
  const options = new Options()
  options.addArguments(["headless"])

  before(async function () {
    driver = await new Builder().forBrowser('firefox').build();
  });
  after(async () => await driver.quit());

  it("Vote A Percent check", async function () {
    await driver.get(RESULT_URL);
    await sleep(2500);
    let numberbefore = await driver.findElement(By.id("aPercent")).getText();
    await driver.get(VOTE_URL);
    let submitButtonA = await driver.findElement(By.id("a"));
    await submitButtonA.click();
    await driver.get(RESULT_URL);
    await sleep(2500);
    let numberafter = await driver.findElement(By.id("aPercent")).getText();
    var regex = /\d+\.?\d*/;
    const voteBefore = Number(numberbefore.match(regex));
    const voteAfter = Number(numberafter.match(regex));
    assert.isTrue((voteAfter>=voteBefore),"true");
  });
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
