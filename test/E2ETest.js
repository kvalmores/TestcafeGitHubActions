import { ClientFunction } from 'testcafe';
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import loginpage from '../pages/LoginPage';
import searchresults from '../pages/SearchResultPage';
import productdetails from '../pages/ProductDetailsPage';
import cartpage from '../pages/CartPage';
import checkoutpage from '../pages/CheckoutPage';
import myorderpage from '../pages/MyOrdersPage';

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'moataz'+randomNumber+'@nabil.com';

fixture `E2E Fixture`
    .page(URL);
 
test('Assert home page', async t => {
    await t
    .expect(getURL()).eql(URL)
    .takeScreenshot()
    .expect(homepage.SubtitleHeader.exists).ok()
});

test("Place Order E2E Tests", async t => {
    await t
    .maximizeWindow()
    .click(homepage.RegisterLink)
    .expect(getURL()).contains('register')
    .click(registerpage.GenderOption)
    .typeText(registerpage.FirstName,'Hello')
    .typeText(registerpage.LastName,'Universe')
    .typeText(registerpage.Email,userEmail)
    .typeText(registerpage.Password,'123456')
    .typeText(registerpage.ConfirmPassword,'123456')
    .click(registerpage.RegisterButton)
    .expect(registerpage.SuccessfulMessage.exists).ok()

    .click(registerpage.ContinueButton)
    .click(homepage.LoginLink)
    .expect(loginpage.accountHeader.exists).ok()
    .typeText(loginpage.emailInput,userEmail)
    .typeText(loginpage.passwordInput,'123456')
    .click(loginpage.submitButton);

    await homepage.search('Apple Macbook Pro 13-inch');
    await t
        // search results
        .click(searchresults.productTitle)
        .expect(getURL()).contains('apple-macbook-pro-13-inch')
        // product details
        .expect(productdetails.productPrice.exists).ok()
        .selectText(productdetails.productQuantity).pressKey("delete")
        .typeText(productdetails.productQuantity,'3')
        .click(productdetails.addToCart)
        .expect(productdetails.successMessage.exists).ok()
        .wait(3000)
        // Cart and Checkout
        .click(homepage.CartLink)
        .click(cartpage.termsLabel)
        .click(cartpage.checkoutBtn)
        .expect(getURL()).contains('checkout');
        // place order
        await checkoutpage.selectCountry('Philippines');
        await t
            .takeScreenshot()
            .typeText(checkoutpage.cityTxt,'Pasay')
            .typeText(checkoutpage.addressTxt,'Barangay 25')
            .typeText(checkoutpage.zipTxt,'987654')
            .typeText(checkoutpage.phoneTxt,'67884569')
            .click(checkoutpage.continueBtn)
            .click(checkoutpage.nextDayOption)
            .click(checkoutpage.nextShippingBtn)
            .click(checkoutpage.nextPaymentBtn)
            .click(checkoutpage.nextConfirmBtn)
            .click(checkoutpage.confirmOrderBtn)
            .expect(checkoutpage.orderConfirmationMessage.exists).ok()
            .click(checkoutpage.viewOrderDetailsLink)
            // my account
            .click(homepage.MyAccountLink)
            .click(myorderpage.orders);
});

test("Change Currency Test", async t => {
    await homepage.changeCurrency('Euro');
});