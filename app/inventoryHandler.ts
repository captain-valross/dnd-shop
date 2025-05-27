import { readFileSync } from "fs";

export interface Shop {
    name: string;
    items: Item[];
}

export interface Item {
    name: string;
    price: number;
    quantity: number;
    max: number;
    supply: string;
}

export function getInventory(): string {
    const invFile: string = readFileSync("inventory.txt", "utf-8");
    const shops: Shop[] = [];
    let insertShop: boolean = false;
    let insertItems: boolean = false;
    let currentShop: string = "";
    invFile.split("\n").forEach((line) => {
        if (line.trim() === "--") {
            insertShop = true;
            insertItems = false;
        }
        else if (insertShop) {
            const name: string = line.trim();
            shops.push({
                name,
                items: []
            });
            currentShop = name;
            insertShop = false;
            insertItems = true;
        }
        else if (insertItems) {
            const name: string = line.trim().match(/.+(?=\s\S*\s\S*\s\S*\s\S*$)/)[0].trim();
            const stats: string[] = line.trim().split(" ");
            const shop: Shop = shops.find(shop => shop.name === currentShop) as Shop;
            shop.items.push({
                name,
                supply: stats.pop() as string,
                max: parseInt(stats.pop() as string),
                quantity: parseInt(stats.pop() as string),
                price: parseInt(stats.pop() as string)
            });
        }
    });
    return JSON.stringify(shops);
}