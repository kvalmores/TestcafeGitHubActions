import { ClientFunction, fixture } from "testcafe";
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import loginpage from '../pages/LoginPage';
import customerpage from '../pages/CustomerPage';

const dataSet = require('../data/data.json');

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'hello' +randomNumber+'@test.com';

fixture("Register Fixture")
    .page(URL);

test.meta({
    ID: 'test id',
    SEVERITY: 'blocker',
    STORY: 'story id',
    TEST_RUN: 'test run id or identifier'
})
("Assert Home Page Test", async t =>{
    await t
        .expect(getURL()).eql(URL)
        .takeScreenshot()
        .expect(homepage.SubtitleHeader.exists).ok();
})

dataSet.forEach(data =>{
test("User Registration and Login Test", async t => {
    await t
        .click(homepage.RegisterLink)
        .expect(getURL()).contains('register')
        .click(registerpage.GenderOption)
        .typeText(registerpage.FirstName,data.firstname)
        .typeText(registerpage.LastName,data.lastname);
        await registerpage.selectDay(data.birthday);
        await registerpage.selectMonth(data.birthmonth);
        await registerpage.selectYear(data.birthyear);
        await t
            .typeText(registerpage.Email,data.email+randomNumber+'@test.com')
            .typeText(registerpage.Password,data.password)
            .typeText(registerpage.ConfirmPassword,data.password)
            .click(registerpage.RegisterButton)
            .expect(registerpage.SuccessfulMessage.exists).ok()

            .click(registerpage.ContinueButton)
            //Logout
            //.click(homepage.LogoutLink)
            //Login with register account
            .click(homepage.LoginLink)
            .expect(loginpage.accountHeader.exists).ok()
            .typeText(loginpage.emailInput,data.email+randomNumber+'@test.com')
            .typeText(loginpage.passwordInput,data.password)
            .click(loginpage.submitButton)
            //Goto my Account
            .click(homepage.MyAccountLink)
            //Check Orders is displayed
            .expect(customerpage.ordersLink.exists).ok()
            .click(customerpage.ordersLink)
            .expect(customerpage.noOrdersLabel.exists).ok()
            .takeScreenshot();
})
});