const { Builder, By, Key, until, Actions } = require('selenium-webdriver');

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

        let electronicsLink = await driver.findElement(By.xpath("//a[@href='/electronics']"));
        let actions = driver.actions({bridge: true});
        await actions.move({origin: electronicsLink}).perform();

        await driver.wait(until.elementLocated(By.xpath("//ul[@class='sublist first-level']")), 10000);
        let cellPhonesLink = await driver.findElement(By.xpath("//a[@href='/cell-phones']"));
        await cellPhonesLink.click();
        await driver.sleep(2000);

        await driver.executeScript('window.scrollBy(0, 250);');
        await driver.sleep(2000);

        let productLink = await driver.findElement(By.xpath("//h2[@class='product-title']/a[contains(text(),'Nokia Lumia 1020')]"));
        await productLink.click();
        await driver.sleep(2000);

        let quantityInput = await driver.findElement(By.id("product_enteredQuantity_20"));
        await quantityInput.clear();
        await quantityInput.sendKeys("2");
        await driver.sleep(2000);

        await driver.findElement(By.id('add-to-cart-button-20')).click();
        await driver.sleep(2000);

        let closeButton = await driver.findElement(By.css(".bar-notification.success .close"));
        await closeButton.click();
        await driver.sleep(2000);

        let cartLink = await driver.findElement(By.xpath("//a[@class='ico-cart']"));
        await cartLink.click();
        await driver.sleep(2000);

        await driver.executeScript('window.scrollBy(0, 350);');
        await driver.sleep(2000);

        let checkbox = await driver.findElement(By.id("termsofservice"));
        if (!(await checkbox.isSelected())) {
            await checkbox.click();
            await driver.sleep(2000);
        }
        await driver.findElement(By.id('checkout')).click();
        await driver.sleep(2000);

        await driver.findElement(By.className('checkout-as-guest-button')).click();
        await driver.sleep(2000);

        await driver.findElement(By.id('BillingNewAddress_FirstName')).sendKeys('Jhon');
        await driver.sleep(2000);

        await driver.findElement(By.id('BillingNewAddress_LastName')).sendKeys('Doe');
        await driver.sleep(2000);

        const randomEmail = generateRandomEmail();
        await driver.findElement(By.id('BillingNewAddress_Email')).sendKeys(randomEmail);
        await driver.sleep(2000);

        let dropdown = await driver.findElement(By.id("BillingNewAddress_CountryId"));
        await driver.executeScript("arguments[0].value = '161';", dropdown);
        await driver.sleep(2000);

        await driver.findElement(By.id('BillingNewAddress_City')).sendKeys('Dhaka');
        await driver.sleep(2000);

        await driver.findElement(By.id('BillingNewAddress_Address1')).sendKeys('Uttara');
        await driver.sleep(2000);

        await driver.findElement(By.id('BillingNewAddress_ZipPostalCode')).sendKeys('1234');
        await driver.sleep(2000);

        await driver.findElement(By.id('BillingNewAddress_PhoneNumber')).sendKeys('01812332112');
        await driver.sleep(2000);

        await driver.findElement(By.className('new-address-next-step-button')).click();
        await driver.sleep(2000);

        let radioButton = await driver.findElement(By.id("shippingoption_1"));
        await radioButton.click();
        await driver.sleep(2000);

        await driver.findElement(By.className('shipping-method-next-step-button')).click();
        await driver.sleep(2000);

        let payButton = await driver.findElement(By.id("paymentmethod_1"));
        await payButton.click();
        await driver.sleep(2000);

        await driver.findElement(By.className('payment-method-next-step-button')).click();
        await driver.sleep(2000);

        await driver.findElement(By.id('CardholderName')).sendKeys('Jhon Doe');
        await driver.sleep(2000);

        await driver.findElement(By.id('CardNumber')).sendKeys('4242424242424242');
        await driver.sleep(2000);

        let dropdownYr = await driver.findElement(By.id("ExpireYear"));
        await dropdownYr.findElement(By.css("option[value='2025']")).click();
        await driver.sleep(2000);

        await driver.findElement(By.id('CardCode')).sendKeys('123');
        await driver.sleep(2000);

        await driver.findElement(By.className('payment-info-next-step-button')).click();
        await driver.sleep(2000);

        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        await driver.sleep(2000);

        await driver.findElement(By.className('confirm-order-next-step-button')).click();
        await driver.sleep(2000);

        await driver.sleep(5000);

        console.log('Successfully completed the actions.');
    } catch(err) {
        console.error('An error occurred:', err);
    } finally {
        await driver.quit();
    }
}

start();
