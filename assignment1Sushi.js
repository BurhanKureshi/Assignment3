const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    SALAD: Symbol("salad")
});

module.exports = class SushiOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sSalad = "";
        this.sItem = "sushi",
        this.sPrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Burhan's Sushi.");
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if (this.sSize.toLowerCase() == 'small') {
                    this.sPrice += 8;
                }
                else if (this.sSize.toLowerCase() == 'medium') {
                    this.sPrice += 9;
                }
                else if (this.sSize.toLowerCase() == 'large') {
                    this.sPrice += 13;
                }
                else {
                    this.sPrice += 7;
                }
                aReturn.push("What toppings would you like to add?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SALAD
                this.sToppings = sInput;
                aReturn.push("What size of salad would you like?");
                break;
            case OrderState.SALAD:
                this.stateCur = OrderState.DRINKS
                this.sSalad = sInput;
                if (this.sSalad.toLowerCase() == 'small') {
                    this.sPrice += 3;
                }
                else if (this.sSalad.toLowerCase() == 'medium') {
                    this.sPrice += 5;
                }
                else if (this.sSalad.toLowerCase() == 'large') {
                    this.sPrice += 7;
                }
                else {
                    this.sPrice += 3;
                }
                aReturn.push("Would you like drinks with that?");
                break;
        case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.sPrice += 5;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(`${this.sFries} Salad`);
                }
                if(this.sDrinks){
                    aReturn.push(`${this.sDrinks} Drinks`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                let sTax = 0.13 * this.sPrice;
                this.sPrice += sTax;
                aReturn.push(`Total with Tax : $${this.sPrice}`);
                break;
        }
        return aReturn;
    }
}