const {Builder, By, until} = require('selenium-webdriver');

describe('Test electron app', function() {
    let driver;
    

    before(function() {
        return new Builder()
        .usingServer('http://localhost:9515')
        .withCapabilities({
            chromeOptions: {
            // Here is the path to your Electron binary.
            binary: 'c:\application.exe'
            }
        })
        .forBrowser('electron')
        .build()
        .then(d => {
            driver = d;
        });
    });

    it('Get app title', function theTestFunction() {
        return driver.getTitle().then(function(title) {
            console.log('Page title is: ' + title);
        });
    });

    it('Wait for Page load with wait of until condition', function theTestFunction() {
        return driver.wait(until.elementLocated(By.xpath("//*[@aid='host']")), 10000)
        .then(x=> console.log(x), x=> console.log(x)); //Catch here will not fail the case
    });

    it('Wait for Page load with wait of function', function theTestFunction() {
        return driver.wait(function(resolve, reject){ //here defind a function for when element is found!
            return driver.findElements(By.xpath("//*[@aid='host']")).then(x=> {
                console.log("found element length is  " + x.length);
                if(x.length!=0){
                    console.log("Element found");
                    return true;
                }
                else{
                    return false;
                }
            });    
        }, 10000);
    });

    it('authentication', function theTestFunction() {
        return driver.getCurrentUrl().then(
            _=> driver.findElement(By.xpath("//*[@aid='host']")).sendKeys('16.186.77.33:8080')
        ).then(_ =>
            driver.findElement(By.xpath("//*[@aid='user']")).sendKeys('xxx')
        )
        .then(_ =>
            driver.findElement(By.xpath("//*[@aid='password']")).sendKeys('xxx')
        )
        .then(_ =>
            driver.findElement(By.xpath("//*[@aid='authentication']")).click())
    });

    it('Wait for login page', function theTestFunction() {
        return driver.wait(until.elementLocated(By.xpath("//*[@aid='login']")), 10000)
        .then(x=> console.log(x), x=> console.log(x)); //Catch here will not fail the case
    });

    after(function() {
        return driver.quit();
    });
});
