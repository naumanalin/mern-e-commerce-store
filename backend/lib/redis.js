import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// Redis is key-balue store
// await redis.set('foo', 'bar')


// For test use this type of command: node ./backend/lib/redis.js, then check on website




// import Redis from "ioredis"

// const client = new Redis("rediss://default:ATidAAIjcDFlOTU5YjJmOGE0MWE0ZGEyOGE1ZWRlZWU0OGFmN2NiOXAxMA@measured-goshawk-14493.upstash.io:6379");
// await client.set('foo', 'bar');
