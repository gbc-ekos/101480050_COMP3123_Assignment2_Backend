import express from 'express';
import userRouter from "./routes/user/user.router.js";
import employeeRouter from "./routes/employee/employee.router.js";
import {loggerMiddleware} from "./middleware/log.js";
import {notFoundHandler} from "./middleware/notFound.js";
import {errorHandler} from "./middleware/error.js";
import {mongooseErrorHandler} from "./middleware/mongooseErrorHandler.js";
import {connectDB} from "./config/db.js";
import {authenticate} from "./middleware/auth.js";

import cors from "cors";

await connectDB();

const app = express();

app.use(cors({
    origin: 'https://comp3123-frontend.ekosenko.me',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Logger middleware
app.use(loggerMiddleware);

// Connecting routers
app.use('/api/v1/user', userRouter)
// Uses JWT auth for employee routes
app.use('/api/v1/emp/employees', authenticate, employeeRouter)

// Not found handler
app.use(notFoundHandler);

// Mongoose error handler
app.use(mongooseErrorHandler);

// Generic error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export for Vercel
export default app;