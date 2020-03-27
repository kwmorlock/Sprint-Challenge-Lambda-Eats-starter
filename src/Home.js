import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Lambda Eats</h1>
            <h2>Order today!!</h2>
            <img className="pizza" src="Assets/Pizza.png" alt="a pizza" />
            <Link className="flexin" to={"/form"}>
                <div className="order-here">Yummy Button'</div>
            </Link>
        </div>
    )
}

export default Home;