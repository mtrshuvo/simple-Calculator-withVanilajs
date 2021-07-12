class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand= '';
        this.operation = undefined;

    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperator(operation){
        if(this.currentOperand === '') return
        if (this.currentOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';


    }

    compute(){
        let computuion;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+':
                computuion = prev + curr
                break;
            case '-':
                computuion = prev - curr
                break;
            case '/':
                computuion = prev / curr
                break;
            case '*':
                computuion = prev * curr
                break;
            default:
                return

        } 
        this.currentOperand = computuion;
        this.operation = undefined;
        this.previousOperand = '';


    }

    getDisplayNuber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }

        else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }

        if (decimalDigits != null) return `${integerDisplay}.${decimalDigits}`

        else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNuber(this.currentOperand); 
        if (this.operation !== undefined){
        this.previousOperandTextElement.innerText = `${this.getDisplayNuber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ""
        }

    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach( button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationsButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

equals.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click', button=>{
    calculator.delete();
    calculator.updateDisplay();
})


allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})
