import React, { useState } from "react";
import CartSummary from "../cart/CartSummary";
import Header from "./Header";

const ParentComponent = () => {
    const [totalArticles, setTotalArticles] = useState(0);
    console.log({ aa: totalArticles });

    return (
        <div>
            {/* <Header totalArticles={totalArticles} />
            <CartSummary setTotalArticles={setTotalArticles} /> */}

        </div>
    );
};



export default ParentComponent;