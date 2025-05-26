import { readFileSync } from "fs";

interface Shop {
    name: string;
    items: Item[];
}

interface Item {
    price: number;
}

export const sayHello = () => {
    return "Hello, World!";
};

export const getInventory = () => {
    const invFile = readFileSync("inventory.txt", "utf-8");
    const shops: Shop[] = [];
    let insertShop: boolean = false;
    let insertItems: boolean = false;
    let currentShop: string = "";
    invFile.split("\n").forEach((line) => {
        if(line.trim() === "--") {
            insertShop = true;
            insertItems = false;
        }
        else if(insertShop) {
            const name = line.trim();
            shops.push({
                name,
                items: []
            });
            currentShop = name;
            insertShop = false;
            insertItems = true;
        }
        else if(insertItems) {
            const stats = line.trim();
            const shop = shops.find(shop => shop.name === currentShop);
            // shop.price = stats;
        }
    });
    return JSON.stringify(shops);
};