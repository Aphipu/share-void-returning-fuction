function doSomething(): number {
    return 42;
}

function callMeMaybe(callback: () => void){
    callback();
}

// console.log(callMeMaybe(doSomething))

function thisIsNotFine(): void {
    return
    // return "🔥";
}

let returnsVoid: () => void;


[1,2,3,4,5].forEach((item)=>{
    console.log(item)
})

//------


const letters = ["c", "d", "e"];

["a", "b"].forEach((letter) => letters.unshift(letter)); // Ok

const items = [1, 2];
callMeMaybe(() => items.push(3));


//-------


const ids = [1,2,3,4,5,6]

async function fetchById(_id: number): Promise<string>{
    return new Promise<string>((resolve) => 
    setTimeout(()=>{resolve('done')}, 1000));
}

ids.forEach(async(id)=>{
    const result = await fetchById(id)
    console.log(result)
})