import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMyContext } from "../../ContextApi";

function CardItem({ editCard }) {
  const { cardsData, choosenCards } = useMyContext();

  useEffect(() => {
    switch (choosenCards) {
      case "1":
        console.log("1");
        break;
      case "2":
        console.log("2");
        break;
      case "3":
        console.log("3");
        break;
      default:
        console.log("error");
        break;
    }
  }, [choosenCards]);

  if (!cardsData.length) return null;

  return (
    <Card sx={{ maxWidth: 200, height: 400 }}>
      <CardMedia
        component="img"
        alt="140"
        height="160"
        image={editCard.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {editCard.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {editCard.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

CardItem.propTypes = {
  editCard: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardItem;
