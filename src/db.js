const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mysql://root:root123@localhost:3306/lottery", {
  // logging: console.log,
  logging: false,
});

const Result = sequelize.define(
  "Result",
  {
    status: {
      type: DataTypes.ENUM("pending", "done"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g1: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    g2_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g2_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    g3_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g3_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g3_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g3_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g3_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g3_6: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    g4_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g4_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g4_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g4_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },


    g5_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g5_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g5_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g5_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g5_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g5_6: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    g6_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g6_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g6_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    g7_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g7_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g7_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    g7_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

async function connectDb() {
  try {
    await sequelize.authenticate();

    await Result.sync({
      alter: true,
    });

    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect database", error);
  }
};

async function closeDbConnection() {
  try {
    await sequelize.close();
    console.log("database connection closed");
  } catch (error) {
    console.log("failed to close database", error);
  }
};

module.exports = {
  sequelize,
  Result,
  connectDb,
  closeDbConnection,
};