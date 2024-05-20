"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { HiMiniMapPin } from "react-icons/hi2";
import Icons from "../icons/Icons";
import { setId, setSelectedResto } from "../store";

function Boutiques() {
  const router = useRouter();
  const [shopList, setShopList] = React.useState<any>([]);
  const [isAdmin, setIsAdmin] = React.useState(false);




  const getShopList = async () => {

    try {
      const response = await fetch(`http://localhost:3001/api/restaurant `,
        {
          method: "GET",
        });
      if (!response.ok) {
        throw new Error("Failed to fetch data");

      }

      const jsonData = await response.json();
      console.log({ jsonData });

      setShopList(jsonData);
      localStorage.setItem("shopLength", jsonData.length);
    } catch (e) {
      console.error("Login error", e);
    }
  };



  // Fonction pour naviguer vers une autre page avec l'ID
  const navigateToOtherPage = (id: number) => {
    setId(id);
    localStorage.setItem("id", id.toString());
    var jsonString = JSON.stringify(shopList[id].card);

    // Sample JSON data
    var jsonData = {
      workflow: shopList[id]?.card.workflow,
      categories: shopList[id]?.card.categories,
      items: shopList[id]?.card.items,
    };

    // Convert JSON data to a string
    var jsonString = JSON.stringify(jsonData);

    // Store the JSON string in localStorage
    localStorage.setItem("resto", jsonString);
    router.push("/boutiques");
  };

  React.useEffect(() => {
    getShopList();
  }, []);
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h4 className="text-xl font-bold">Bienvenue au Pizza Time</h4>
      </div>

      <div className="row">
        {Object.values(shopList).map((items: any, id: number) => (
          <div className="col-md-3 my-3" key={id}>
            <div
              className="box"
              onClick={() => {
                localStorage.setItem("resto", JSON.stringify(items.resto));
                setSelectedResto(items.id)
                
                navigateToOtherPage(items.resto.shopid);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="img-box overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                <img src={items.resto.image} className="object-cover w-full h-48" alt="items.resto.image" />
              </div>

              <div className="detail-box">
                <h4>{items.resto.Company}</h4>
                <p>
                  <HiMiniMapPin />
                  {items.resto.Address}, {items.resto.PostalCode} {items.resto.town}
                </p>
              </div>
              <div>
                <Icons />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Boutiques;