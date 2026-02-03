
import Navbar from "../Home/Components/Dashbord/Navbar";
import Background from "../Background/Background";
import VoucherAttechment from "./Components/Voucherattachment";

export default function Promotions() {

  return (
    <div>
      <div className="mt-10">
        <Navbar />
      </div>
      <div className="flex justify-center items-center mt-10 mb-10 flex-col md:flex-row gap-10 sm:gap-5">
        <div>
          <Background className="md:w-[35vw] w-[100%] h-[80vh]">
            <VoucherAttechment />
          </Background>
        </div>
        <div>
          <Background className="md:w-[35vw] w-[100%] h-[80vh]">
            <h1 className="text-3xl font-bold underline text-center ">
              Promotions Page
            </h1>
          </Background>
        </div>
      </div>
    </div>
  );
}   