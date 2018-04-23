const {Builder, By, until, Key} = require('selenium-webdriver');

let driver = new Builder()
    .usingServer('http://localhost:9515')   
    .withCapabilities({
        chromeOptions: {
        // Here is the path to your Electron binary.
        binary: 'c:\application.exe'
        }
    })
    .forBrowser('electron')
    .build();

driver
.then(_=>
    // if catch wait reject here, it will not block next promise exection after 10 seconds time out
    driver.wait(until.elementLocated(By.xpath("//*[@aid='login']")),10000).then(x=>console.log(x + "found")).catch(x=>console.log(x+" not found"))
)
.then(_ =>
    driver.findElement(By.xpath("//*[@aid='host']")).sendKeys('16.186.77.33:8080')
)
.then(_ =>
    driver.findElement(By.xpath("//*[@aid='user']")).sendKeys('xxx')
)
.then(_ =>
    driver.findElement(By.xpath("//*[@aid='password']")).sendKeys('xxx')
)
.then(_ =>
    driver.findElement(By.xpath("//*[@aid='authentication']")).click())
// if catch reject here, all following promise is abort if timeout reach
// .catch(function(reject){
//     console.log("Rejected: "+ reject)
// })