const order = true;

const breakfastPromise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        if(order){
            resolve('Your order is ready - Come and get it!');
        } else{
        reject( Error('Oh no! There was a problem with your order.'))
        }
    }, 3000);
});

console.log(breakfastPromise);
breakfastPromise
    .then(val => console.log(val))
    .catch(err => console.log(err));







function addTwenty(n){
    return n + 20;
}

function triple(n){
    return n * 3;
}

function finalValue(nextNumber){
    console.log(`it is ${nextNumber}`);    
}

const mathPromise = new Promise( (resolve, reject) => {
    setTimeout(()=> {
        if(typeof number === 'number'){
            resolve(number);
        } else {
            reject('You must enter a number');
        }
    }, 2000);
});

const number = 5; 

mathPromise
    .then(addTwenty)
    .then(triple)
    .then(addTwenty)
    .then(finalValue)
    .catch( err => console.log(err) )