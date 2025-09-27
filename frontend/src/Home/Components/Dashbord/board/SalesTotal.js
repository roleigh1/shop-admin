import PointOfSaleTwoToneIcon from "@mui/icons-material/PointOfSaleTwoTone";
import { MyContext, useMyContext } from "../../../../ContextApi";


export default function SalesTotal() {
  const { sales } = useMyContext(MyContext);
  const sumAllSales = Object.values(sales)
    .reduce((total, monthData) => total + monthData, 0)
    .toFixed(2);
  console.log(sumAllSales);

  return (

    <div
      className="bg-white w-[8rem] h-[8rem]  flex flex-col justify-center items-center"
    >
      <PointOfSaleTwoToneIcon />
      <h6>Total </h6>
      <span >
        €{sumAllSales}
      </span>

    </div>
  );
}
