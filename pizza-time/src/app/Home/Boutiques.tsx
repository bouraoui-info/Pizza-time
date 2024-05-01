"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { IoRestaurant } from "react-icons/io5";
import { HiMiniMapPin } from "react-icons/hi2";
import { Button } from "react-bootstrap";
import Icons from "../icons/Icons";
import { setId } from "../store";

function Boutiques() {
  const router = useRouter();
  const [shopList, setShopList] = React.useState<any>([]);
  const [isAdmin, setIsAdmin] = React.useState(false);




  const getShopList = async () => {

    try {
      const response = await fetch(`http://localhost:3001/api/shoplist
      `,
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
      workflow: shopList[id]?.workflow,
      categories: shopList[id]?.categories,
      items: shopList[id]?.items,
    };

    // Convert JSON data to a string
    var jsonString = JSON.stringify(jsonData);

    // Store the JSON string in localStorage
    localStorage.setItem("card", jsonString);

    router.push("/Home/Boutiques");
  };

  React.useEffect(() => {
    getShopList();
  }, []);
  return (
    <section className="news_section">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            {" "}
            
            <IoRestaurant /> Bienvenue au Pizza Time <IoRestaurant />
          </h2>
        </div>

        <div className="row">
          {Object.values(shopList).map((items: any, id: number) => (
            <div
              className="col-md-4 my-3"
              key={id}
              onClick={() => {
                localStorage.setItem("resto", JSON.stringify(items.resto));
                navigateToOtherPage(items.shopid);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <div className="box">
                <div className="img-box">
                  <img src={items.image} className="box-img" alt="" />
                </div>
                <div className="detail-box">
                  <h4> {items.Company}</h4>
                  <p>
                    {" "}
                    <HiMiniMapPin />
                    {items.Address}, {items.PostalCode}{" "}
                    {items.town}
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
    </section>
  );
}

export default Boutiques;