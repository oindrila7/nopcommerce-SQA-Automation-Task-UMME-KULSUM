const {Builder, By} = require('selenium-webdriver');

function generateRandomEmail() {
    const baseEmailName = 'testuser';
    const randomString = Math.random().toString(36).substring(7);
    return `${baseEmailName}+${randomString}@example.com`;
}

async function start() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().maximize();

        await driver.get('https://demo.nopcommerce.com/');
        await driver.sleep(2000);

        let registerLink = await driver.findElement(By.xpath("//a[@class='ico-register']"));
        await registerLink.click();
        await driver.sleep(3000);

        await driver.findElement(By.id('gender-female')).click();
        await driver.sleep(2000);

        await driver.findElement(By.id('FirstName')).sendKeys('Jhon');
        await driver.sleep(2000);

        await driver.findElement(By.id('LastName')).sendKeys('Doe');
        await driver.sleep(2000);

        const day = '1';
        const month = 'January';
        const year = '1990';

        await driver.findElement(By.name('DateOfBirthDay')).sendKeys(day);
        await driver.findElement(By.name('DateOfBirthMonth')).sendKeys(month);
        await driver.findElement(By.name('DateOfBirthYear')).sendKeys(year);
        await driver.sleep(2000);

        const randomEmail = generateRandomEmail();
        await driver.findElement(By.id('Email')).sendKeys(randomEmail);
        await driver.sleep(2000);

        await driver.findElement(By.id('Company')).sendKeys('Brainstation-23');
        await driver.sleep(2000);

        await driver.findElement(By.id('Password')).sendKeys('123456');
        await driver.sleep(2000);

        await driver.findElement(By.id('ConfirmPassword')).sendKeys('123456');
        await driver.sleep(2000);

        await driver.findElement(By.id('register-button')).click();
        await driver.sleep(5000);

        console.log('Successfully completed the actions.');
    } catch(err) {
        console.error('An error occurred:', err);
    } finally {
        await driver.quit();
    }
}

start();
