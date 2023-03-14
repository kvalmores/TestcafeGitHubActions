import {Selector,t} from 'testcafe';

class RegisterPage{
    constructor(){
        this.GenderOption = Selector('#gender-male')
        this.FirstName = Selector('#FirstName')
        this.LastName = Selector('#LastName')
        this.DateOfBirthDayList = Selector("select[name='DateOfBirthDay']")
        this.DateOfBirthMonthList = Selector("select[name='DateOfBirthMonth']")
        this.DateOfBirthYearList = Selector("select[name='DateOfBirthYear']")
        this.Email = Selector('#Email')
        this.Password = Selector('#Password')
        this.ConfirmPassword = Selector('#ConfirmPassword')
        this.RegisterButton = Selector('#register-button.button-1.register-next-step-button')
        this.SuccessfulMessage = Selector('div.result').withText('Your registration completed')
        this.ContinueButton = Selector('a.button-1.register-continue-button');
    }

    async selectDay(day){
        const DayOption = this.DateOfBirthDayList.find('option');
        await t
            .click(this.DateOfBirthDayList)
            .click(DayOption.withText(day));
    }

    async selectMonth(month){
        const MonthOption = this.DateOfBirthMonthList.find('option');
        await t
            .click(this.DateOfBirthMonthList)
            .click(MonthOption.withText(month));
    }

    async selectYear(year){
        const YearOption = this.DateOfBirthYearList.find('option');
        await t
            .click(this.DateOfBirthYearList)
            .click(YearOption.withText(year));
    }

}
export default new RegisterPage();