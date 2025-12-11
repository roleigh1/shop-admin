import Navbar from "./Components/Dashbord/Navbar";
import Background from "./Components/Dashbord/board/Backgrounds/Background";
import BackgroundLastOrdersListed from "./Components/Dashbord/board/Backgrounds/BackroundLastOrdersListed";
import OrderCounter from "./Components/Dashbord/board/ContentCount";
import BackgroundSales from "./Components/Dashbord/board/Backgrounds/BackgroundSales";
import LastOrderTable from "./Components/Dashbord/board/ContentTableLastOrder";
import SalesLineChart from "./Components/Dashbord/board/SalesChart";
import "./home.css";
import SalesTotal from "./Components/Dashbord/board/SalesTotal";
export default function Home({ onTokenRevived }) {
  return (
    <div>
      <div className="mt-10">
        <Navbar />
      </div>

      <div
        className="topRow flex items-center justify-center gap-4 mt-20">
        <div>
          <Background>
            <OrderCounter />
          </Background>
        </div>
        <div>
          <BackgroundLastOrdersListed >
            <LastOrderTable />
          </BackgroundLastOrdersListed>
        </div>
      </div>
      <div className="midRow flex justify-center mt-4" >
        <BackgroundSales >
          <div className="flex md:flex-row flex-col  md:gap-[8rem]  items-center justify-center m-auto ">
            <div className="h-[350px] flex items-center pt-[5rem] md:pt-0 ">
              <SalesLineChart />
            </div>

            <div className="h-[350px] flex items-center  pb-[10rem] md:pb-0">
              <SalesTotal  />
            </div>
          </div>
        </BackgroundSales>
      </div>
    </div>
  );
}
