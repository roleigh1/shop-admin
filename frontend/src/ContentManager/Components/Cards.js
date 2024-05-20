import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useMyContext } from "../../ContextApi";

function CardItem() {
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

  const card = cardsData.find((card, index) => index === parseInt(choosenCards) - 1);

  return card ? (
    <Card sx={{ maxWidth: 250, height: 400 }}>
      <CardMedia
        component="img"
        alt='140'
        height="160"
        image={card.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <Typography variant='body2' color="text.secondary">
          {card.text}
        </Typography>
      </CardContent>
    </Card>
  ) : null;
}

export default CardItem;
