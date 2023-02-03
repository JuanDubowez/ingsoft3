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

  it("Vote A check", async function () {
    await driver.get(RESULT_URL);
    await sleep(2000);
    let numberbefore = await driver.findElement(By.id("votTot")).getText();
    await driver.get(VOTE_URL);
    let submitButtonA = await driver.findElement(By.id("a"));
    await submitButtonA.click();
    await driver.get(RESULT_URL);
    await sleep(2000);
    let numberafter = await driver.findElement(By.id("votTot")).getText();
    var regex = /(\d+)/g;
    const voteBefore = Number(numberbefore.match(regex));
    const voteAfter = Number(numberafter.match(regex));
    assert.equal(voteAfter, (voteBefore + 1));
  });
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
