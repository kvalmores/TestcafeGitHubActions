import {Selector,t} from 'testcafe';

class ProductDetailsPage{
    constructor(){
        //this.productPrice = Selector("span[id='price-value-4]").withText('$1,800.00')
        this.productPrice = Selector('span#price-value-4.price-value-4')
        this.productQuantity = Selector('input#product_enteredQuantity_4.qty-input')
        this.addToCart = Selector('button#add-to-cart-button-4.button-1.add-to-cart-button')
        this.successMessage = Selector('div.bar-notification.success');
    }
}
export default new ProductDetailsPage();