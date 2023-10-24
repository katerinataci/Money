import React from "react";
import Header from "./Header.jsx";
import Navbar from "./NavBar.jsx";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <section  className="py-5 bg-light-blu">
        <div className="container">
          <div className="mb-5">
            <h1 className="mb-4 display-4">Track Your Project Income and Expenses</h1>
            <p className="lead">
              Manage your money more effectively and make better financial
              decisions with this easy-to-use software.
            </p>
            <h3 className="mt-4 text-coolGray-900">Understand Your Spending Patterns</h3>
                  <p className="text-coolGray-600">
                    Stop wasting time logging expenses and tracking your income
                    by hand. Use our software to manage it all in one place.
                  </p>
          </div>
      </div>
      </section>
      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="mb-5">
            <h1 className="mb-4 display-4 color-black">Money talks, but our app helps you understand what it's saying</h1>
          
          </div>
          <a
            className="btn btn-lg btn-light"
            href="#"
          >
            Get Started
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;
