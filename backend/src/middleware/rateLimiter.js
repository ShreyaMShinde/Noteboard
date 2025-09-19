import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"), // 10 requests per 60s
  analytics: true,
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const limit = await ratelimit.limit(req.ip);
    if (!limit.success) {
      return res.status(429).json({ message: "Rate limit exceeded" });
    }
    next();
  } catch (err) {
    console.error("Upstash rate limiter error:", err.message);
    next(); // allow request if Redis fails
  }
};

export default rateLimiterMiddleware;
