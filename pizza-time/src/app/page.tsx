import Header from "../app/common/Header";
import SideBar from "../app/common/SideBar";
import LogoBanner from "../app/Home/LogoBanner";
import Boutiques from "../app/Home/Boutiques";
import Footer from "./common/Footer";

export default function Home() {
  
  return (
    <main className="">
      <Header />
      <SideBar />
      <LogoBanner />
      <Boutiques />
      <Footer/>
    </main>
  );
}
