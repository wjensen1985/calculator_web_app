class Calculator {
    constructor(prev_op_text, current_op_text){
        this.current_text = current_op_text;
        this.prev_text = prev_op_text;
        this.current_num = "";
        this.prev_num = "";
        this.decimal_used = false;
        this.digits_before_decimal = 0;
        this.operation_used = false;
        this.operation_used2 = false;
        this.equals_used = false;
        this.clear();
    }

    clear(){
        this.current_text.innerText = "";
        this.prev_text.innerText = "";
        this.current_num = "";
        this.prev_num = "";
        this.decimal_used = false;
        this.digits_before_decimal = 0;
        this.operation_used = false;
        this.operation_used2 = false;
        this.equals_used = false;
        console.log("clear called");
    }
    
    delete(){
        if(this.current_num.charAt(this.current_num.length - 1) == "."){
            this.decimal_used = false;
            console.log("delete decimal test");
        }
        this.current_num = this.current_num.slice(0, -1);
        this.update_display();
    }

    equals(){
        console.log("equals called");
        let temp = this.prev_num;
        console.log(temp);
        let temp_oper = temp.charAt(temp.length - 1);
        console.log(temp_oper);
        temp = temp.slice(0,-1);
        console.log("temp: " + temp + "  temp_oper: " + temp_oper);
        console.log(this.current_num);

        let res;
        switch(temp_oper){
            case "+":
                console.log("add");
                res = (temp/1.0) + (this.current_num/1.0);
                break;
            case "-":
                res = (temp/1.0) - (this.current_num/1.0);
                console.log("sub");
                break;
            case "÷":
                res = (temp/1.0) / (this.current_num/1.0);
                //rounding error/bug -> 0.000000001 thing, char limit on result
                console.log("div");
                break;
            case "*":
                res = (temp/1.0) * (this.current_num/1.0);
                //rounding error/bug -> 0.000000001 thing, char limit on result
                console.log("mult");
                break;
            default:
                console.log("operation error in calculation");
        }

        this.prev_num = this.prev_num + this.current_num + "=";
        this.current_num = res;
        // change this.nums from string to numbers and complete operation
        // then update display (remember to update lower and upper w/correct)
        // check for operation used
        // check for last char being operation and then act accordingly
        //      also with above set operation_used = false to reset after equals press
        this.operation_used2 = false;
        this.digits_before_decimal = 0;
        this.decimal_used = false;
        this.update_display();
        //******what to do about after pressing equals and then start typing numbers again
        //or operations, they just append to answer-->change this---think operations works,
        //just numbers are broken
        //also for if answer has decimal in it
        //orbeginning new number with decimal?????--works
    }

    operation(operation){
        if(!this.operation_used2){
            this.prev_num = this.current_num + operation;
            this.operation_used = true;
            this.operation_used2 = true;
            this.decimal_used = false;
            // change this.nums from string to numbers and complete operation
            // then update display (remember to update lower and upper w/correct)
            this.update_display();
        } else{
            console.log("operation already input error");
            //error message to interface/user
        }
    }

    number_btn(number){
        //add char limit feature so nums dont overflow container?
        if(this.operation_used){
            this.current_num = "";
            this.operation_used = false;
            this.digits_before_decimal = 0;
        }
        if(number == "." && this.decimal_used == true){
            return 0; 
            //give some error message/error sign?
        } else if(number == "." && this.decimal_used == false) {
            this.current_num += number;
            this.decimal_used = true;
            this.update_display();
        } else {
            this.current_num += number;
            if(!this.decimal_used){
                this.digits_before_decimal += 1;
            }
            this.update_display();
            console.log(this.digits_before_decimal);
        }
    }

    update_display(){
        //make sure to add in comma and decimal functionality
        //comma spacing -> use splice and loop for amount of commas needed
        //what to do for result?? -> do comma spacing in equals function?

        //for commas, make sure to check for decimal used, and then also make sure to check
        //if there is an operation character in string
        this.current_text.innerText = this.current_num;
        this.prev_text.innerText = this.prev_num;
    }

}

//when done editing comment out/delete console.log occurences

const num_btns = document.querySelectorAll('[data-number="1"]');
const oper_btns = document.querySelectorAll('[data-operation="1"]');

const equals_btn = document.getElementById("b_equals");
const delete_btn = document.querySelector('[data-delete]');
const clear_btn = document.querySelector('[data-clear="1"]');
const prev_op_text = document.querySelector('[data-prev="1"]');
const curr_op_text = document.querySelector('[data-curr="1"]');

const calc = new Calculator(prev_op_text, curr_op_text);

num_btns.forEach(button => {
    button.addEventListener('click', () => {
        calc.number_btn(button.textContent);
    })
})

oper_btns.forEach(button => {
    button.addEventListener('click', () => {
        calc.operation(button.textContent);
    })
})

equals_btn.addEventListener('click', () => {
    calc.equals();
})

clear_btn.addEventListener('click', () => {
    calc.clear();
})

delete_btn.addEventListener('click', () => {
    calc.delete();
    console.log("delete pressed");
})
