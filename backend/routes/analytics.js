import express from "express";
import { requireAuth, requireLeader, verifyJWT } from "../middleware/auth.js";
import {
  getUserAnalytics,
  getEventAnalytics,
  getFinancialAnalytics,
  getContentAnalytics,
  getTeamAnalytics,
  getDashboardData,
  exportAnalyticsData,
  trackEvent,
  getAnalyticsSummary,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/summary", getAnalyticsSummary);

router.get("/users", requireLeader, getUserAnalytics);
router.get("/events", requireLeader, getEventAnalytics);
router.get("/financial", requireLeader, getFinancialAnalytics);
router.get("/content", requireLeader, getContentAnalytics);
router.get("/teams", requireLeader, getTeamAnalytics);

router.get("/dashboard", requireLeader, getDashboardData);

router.get("/export", requireLeader, exportAnalyticsData);

router.post("/track", trackEvent);

export default router;
