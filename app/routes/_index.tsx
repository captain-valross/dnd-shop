import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getInventory, sayHello } from "~/inventoryHandler";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex h-screen items-center justify-center">
      {data.inventory}
    </div>
  );
}

export const loader = async () => {
  // This is a placeholder for any data fetching logic you might want to implement
  // For now, it returns an empty object
  return {
    inventory: await getInventory()
  };
}

