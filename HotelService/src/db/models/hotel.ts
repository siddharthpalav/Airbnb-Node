import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class Hotel extends Model<
  InferAttributes<Hotel>,
  InferCreationAttributes<Hotel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
  declare rating?: number | undefined | null;
  declare rating_count?: number | undefined | null;
}

Hotel.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "STRING",
      allowNull: false,
    },
    address: {
      type: "STRING",
      allowNull: false,
    },
    location: {
      type: "STRING",
      allowNull: false,
    },
    createdAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    deleted_at: {
      type: "DATE",
      defaultValue: null,
    },
    rating: {
      type: "FLOAT",
      defaultValue: 0,
    },
    rating_count: {
      type: "NUMBER",
      defaultValue: 0,
    },
  },
  {
    tableName: "hotels",
    sequelize: sequelize,
    underscored: true, // createdAt ----> create_at
    timestamps: true, // createdAt, updatedAt
  },
);

export default Hotel;
