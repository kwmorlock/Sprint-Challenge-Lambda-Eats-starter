import React from "react";
import {Link} from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Lambda Eats</h1>
            <h2>Order today!!</h2>

            <img src="https://i.kym-cdn.com/entries/icons/original/000/004/923/533.jpg" class="pizza" alt="a pizza" />
           

            <Link className="home" to={"/pizza"}>
                <div className="order-here">Yummy Button</div>
            </Link>
        </div>
    );
}

export default Home;