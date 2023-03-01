import React from "react";
import MainLayout from "../../layout";

const Home = () => {
  const myStyle = {
    backgroundImage:
      "url('https://i.ytimg.com/vi/fjbOENrmLrM/maxresdefault.jpg')",
    height: '100vh',
    marginTop: '-70px',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <MainLayout >
      <div style={myStyle}>
        <h1 style={{ textAlign: "center" }}>WELCOME TO DHOLAKPUR</h1>
        {/* style={{ textAlign: "center" }} */}
      </div>
    </MainLayout>
  );
};

export default Home;
