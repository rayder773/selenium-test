const {Builder, By, Key, until} = require('selenium-webdriver');

let arr;

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.ef.com/wwen/english-resources/english-vocabulary/top-3000-words/');
    await driver.findElement(By.css('.field-item.even > p:last-child')).then(async res => {
      const str = await res.getText();
      arr = str.split('\n');
    })
  } finally {
    await driver.quit();
  }
})();

