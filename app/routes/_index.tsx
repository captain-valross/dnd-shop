import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getInventory, Item, Shop } from "~/inventoryHandler";
import { transformToCurrency } from "~/util";

export function meta() {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
}

function renderItems(items: Item[]) {
  return items.map(item => <div key={item.name}>
    <h3>{item.name}</h3>
    <p>Price: {transformToCurrency(item.price)}</p>
    <p>In stock: {item.quantity}</p>
  </div>
  );
}

function renderShops(shops: Shop[]) {
  return shops.map(shop => <div key={shop.name}>
    <h2>{shop.name}</h2>
    {renderItems(shop.items)}
  </div>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const shops = JSON.parse(data.inventory);

  return (
    <div>
      {renderShops(shops)}
    </div>
  );
}

export async function loader() {
  return {
    inventory: await getInventory()
  };
}