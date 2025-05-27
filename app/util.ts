export function transformToCurrency(number: number) {
    const string: string = number.toString();
    const array: string[] = string.split("");
    const maxIndex = array.length - 1;
    let copper = "";
    let silver = "";
    let gold = "";
    for(let i = maxIndex; i >= 0; --i){
        const value = array.pop();
        if(i === maxIndex && value !== "0") {
            copper = ` ${value} cp`;
        }
        else if(i === maxIndex - 1 && value !== "0") {
            silver = ` ${value} sp`;
        }
        else if(i < maxIndex - 1) {
            gold = `${value}${gold}`;
        }
    }

    if(gold !== "") {
        gold = `${gold} gp`
    }

    return (gold + silver + copper).trim();
}