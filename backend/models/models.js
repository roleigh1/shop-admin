const { Sequelize, DataTypes } = require("sequelize");
const dbName = process.env.TABLE;
const dbUser = process.env.DBUSER;
const dbPW = process.env.DBPW;
const dbHost = process.env.DBHOST;

const sequelize = new Sequelize(dbName, dbUser, dbPW, {
  host: dbHost,
  dialect: "mysql",
  port: "3306",
  logging: (msg) => {
    console.log(`[Sequelize] ${msg}`);
  },
});

async function authDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("All tables have been created successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

authDb();

const FinishedOrders = sequelize.define(
  "Finishedorders",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    item: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },

    total: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },

    pickupdate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },

    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      timestamps: true,
    },
  },
  {
    tableName: "finishedorders",
    timestamps: true,
  }
);
const ProductsDB = sequelize.define(
  "Product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    firstImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thirdImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fourthImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: "true",
  }
);
const BestSellerItemsDB = sequelize.define(
  "Item",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    firstImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thirdImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fourthImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "items",
    timestamps: true,
  }
);

const User = sequelize.define(
  "Admin",
  {
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);

const Orders = sequelize.define(
  "Orders",
  {
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    item: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    total: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    pickupdate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },

    location: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      onUpdate: Sequelize.fn("NOW"),
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);
const Visitors = sequelize.define(
  "Visitor",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    counter: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "visitor",
    timestamps: false,
  }
);
const BannerData = sequelize.define(
  "Banner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    headline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    top: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    tableName: "banners",
    timestamps: false,
  }
);
const InfoCard = sequelize.define(
  "infos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      onUpdate: Sequelize.fn("NOW"),
    },
  },
  {
    tableName: "infos",
    timestamps: true,
  }
);

module.exports = {
  User,
  Orders,
  ProductsDB,
  BestSellerItemsDB,
  sequelize,
  FinishedOrders,
  Visitors,
  BannerData,
  InfoCard,
};
