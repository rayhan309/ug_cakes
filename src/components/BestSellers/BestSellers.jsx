import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router";

// const cakes = [
//   {
//     title: "Strawberry Topped Cake",
//     id: 1,
//     avater:
//       "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
//     price: 11.83,
//     description:
//       "Strawberry Topped Cake from UG Cakes is a delightful masterpiece made with fresh sponge layers, velvety cream, and juicy strawberries. Perfect for romantic celebrations, birthdays, or special surprises, this cake brings a burst of sweetness to every bite. Made with premium ingredients for exceptional taste and freshness Beautifully decorated with hand-arranged strawberries Prompt delivery available inside Kathmandu Valley Guaranteed satisfaction for every celebration Order this irresistible Strawberry Topped Cake today and make your moments truly special with UG Cakes — Nepal’s trusted name for premium celebration cakes.",
//     customizable: true,
//     SKU: "UGC-B-1115",
//     category: "cake",
//     stok: 20
//   },
//   {
//     title: "Strawberry Topped Cake",
//     id: 2,
//     avater:
//       "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
//     price: 11.83,
//     description:
//       "Strawberry Topped Cake from UG Cakes is a delightful masterpiece made with fresh sponge layers, velvety cream, and juicy strawberries. Perfect for romantic celebrations, birthdays, or special surprises, this cake brings a burst of sweetness to every bite. Made with premium ingredients for exceptional taste and freshness Beautifully decorated with hand-arranged strawberries Prompt delivery available inside Kathmandu Valley Guaranteed satisfaction for every celebration Order this irresistible Strawberry Topped Cake today and make your moments truly special with UG Cakes — Nepal’s trusted name for premium celebration cakes.",
//     customizable: true,
//     SKU: "UGC-B-1115",
//     category: "cake",
//     stok: 20
//   },
//   {
//     title: "Strawberry Topped Cake",
//     id: 3,
//     avater:
//       "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
//     price: 11.83,
//     description:
//       "Strawberry Topped Cake from UG Cakes is a delightful masterpiece made with fresh sponge layers, velvety cream, and juicy strawberries. Perfect for romantic celebrations, birthdays, or special surprises, this cake brings a burst of sweetness to every bite. Made with premium ingredients for exceptional taste and freshness Beautifully decorated with hand-arranged strawberries Prompt delivery available inside Kathmandu Valley Guaranteed satisfaction for every celebration Order this irresistible Strawberry Topped Cake today and make your moments truly special with UG Cakes — Nepal’s trusted name for premium celebration cakes.",
//     customizable: true,
//     SKU: "UGC-B-1115",
//     category: "cake",
//     stok: 20
//   },
//   {
//     title: "Strawberry Topped Cake",
//     id: 4,
//     avater:
//       "https://media.ugcakes.com/products/medium/strawberry-topped-cake-853601764658285-fW1XAIWe6E.webp",
//     price: 11.83,
//     description:
//       "Strawberry Topped Cake from UG Cakes is a delightful masterpiece made with fresh sponge layers, velvety cream, and juicy strawberries. Perfect for romantic celebrations, birthdays, or special surprises, this cake brings a burst of sweetness to every bite. Made with premium ingredients for exceptional taste and freshness Beautifully decorated with hand-arranged strawberries Prompt delivery available inside Kathmandu Valley Guaranteed satisfaction for every celebration Order this irresistible Strawberry Topped Cake today and make your moments truly special with UG Cakes — Nepal’s trusted name for premium celebration cakes.",
//     customizable: true,
//     SKU: "UGC-B-1115",
//     category: "cake",
//     stok: 20
//   },
// ];

const BestSellers = () => {
  // cakes data fetching
  const { data: cakes } = useQuery({
    queryKey: ["cakes"],
    queryFn: async () => {
      const res = await axios.get("/cakes.json");
      // console.log(res.data)
      return res.data;
    },
  });

  //   data console
  console.log("data:", cakes);

  return (
    <>
      {/* header text */}
      <div className="space-y-2.5">
        <h2 className="text-4xl font-bold text-center">
          🔥 Recently Best Sellers
        </h2>
        <p className="font-normal text-center">
          These trending cakes are flying off our shelves - Don't miss out!
        </p>
        <p className="font-normal text-center">Last updated: Feb 14, 2:14 AM</p>
      </div>

      {/* cards content */}
      <div className="my-14 grid grid-cols-3 md:grid-cols-4 gap-5">
        {/* cales map & show cards */}
        {cakes?.map((cake) => {
          console.log(cake);
          return (
            <Link
              to={`/cake/${cake?.id}`}
              className="border border-blue-200 hover:border-blue-300 cursor-pointer rounded-xl group"
            >
              <img
                src={cake?.avater}
                alt={cake?.title}
                className="rounded-xl"
              />

              <div className="px-3 py-2 space-y-3">
                <h3 className="text-xl font-semibold group-hover:text-blue-600">
                  {cake?.title}
                </h3>
                <p className="bg-orange-200 w-24 text-center rounded-lg">
                  🔥 {cake?.stok} sold
                </p>
                <h2 className="text-2xl font-bold text-blue-600">
                  USD {cake?.price}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default BestSellers;
