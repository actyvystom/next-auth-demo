import fishData from "../../../_data/fish.json";
import {getToken} from "next-auth/jwt";
async function handler(req, res) {
  const {fishId} = req.query;
  switch (req.method) {
    case "GET":
      try {
        const token = await getToken({req});
        if (!token) {
          return res.status(401).json({message: "Please log in"});
        }
        const fish = fishData.find(fish => fish.id === fishId);
        if (!fish) {
          return res.status(404).json({message: "fish not found"});
        }
        if (token.email !== fish.email) {
          return res
            .status(401)
            .json({message: "you are not allowed to see this animal."});
        }

        return res.status(200).json(fish);
      } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error"});
      }
    default:
      return res.status(405).json({error: "method not allowed"});
  }
}

export default handler;
