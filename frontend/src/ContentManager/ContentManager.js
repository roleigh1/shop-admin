
import Navbar from "../Home/Components/Dashbord/Navbar";
import BackgroundBanner from "./Components/Backgrounds/BackgroundBanner";
import BackgroundCards from "./Components/Backgrounds/BackgroundCards";
import Editbanner from "./Components/EditBanner";
import EditCards from "./Components/EditCards";

export default function ContentManager() {
  return (
    <div className=" ">
      <div className="mt-8" >
        <Navbar />
      </div>
      <div
        className="mainContent  flex flex-row justify-center items-start gap-4 mt-20 "
       
      >
        <div >
          <BackgroundBanner >
            <Editbanner />
          </BackgroundBanner>
        </div>

        <div >
          <BackgroundCards >
            <EditCards />
          </BackgroundCards>
        </div>
      </div>
    </div>
  );
}
