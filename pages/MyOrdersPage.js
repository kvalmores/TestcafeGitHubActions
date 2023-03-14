import { Selector } from 'testcafe';

class MyOrdersPage {
    
constructor(){
    this.orders = Selector('a').withText('Orders');
    
  }
}

export default new MyOrdersPage();