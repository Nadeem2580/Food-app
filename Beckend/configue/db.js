import { connect, mongoose } from "mongoose";
import "dotenv/config";


export const dbConnect =()=>{
const URI = process.env.URI
mongoose
  .connect(URI)
  .then(() => console.log("Mongo Db Connected"))
  .catch((error) => console.log("error", error.message));


}

