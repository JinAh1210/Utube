import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, (req,res) => res.send('Home'));
globalRouter.get(routes.join, (req, res) => res.send('Hello Join'));
globalRouter.get(routes.login, (req, res) => res.send('Hello Login'));
globalRouter.get(routes.logout, (req, res) => res.send('Hello Logout'));
globalRouter.get(routes.search, (req, res) => res.send('Hello Search'));

export default globalRouter;