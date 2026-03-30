import { Router, type IRouter } from "express";
import healthRouter from "./health";
import progressRouter from "./progress";
import lessonsRouter from "./lessons";
import hiraganaGameRouter from "./hiragana-game";
import quizRouter from "./quiz";
import reviewRouter from "./review";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/progress", progressRouter);
router.use("/lessons", lessonsRouter);
router.use("/quiz/hiragana-game", hiraganaGameRouter);
router.use("/quiz", quizRouter);
router.use("/review", reviewRouter);
router.use("/ai", aiRouter);

export default router;
