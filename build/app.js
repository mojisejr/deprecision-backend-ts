"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var helmet_1 = __importDefault(require("helmet"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var hpp_1 = __importDefault(require("hpp"));
var user_router_1 = __importDefault(require("./routes/user.router"));
var product_router_1 = __importDefault(require("./routes/product.router"));
var app_error_1 = require("./error/app.error");
var global_error_controller_1 = require("./error/global.error.controller");
var app = express_1.default();
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
var limiter = express_rate_limit_1.default({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: "too many request from this IP please try again in an hour",
});
var corsOptions = {
    credentials: true,
    origin: process.env.NODE_ENV === "production"
        ? ["https://deprecision.co"]
        : "http://localhost:8100",
};
app.use(cors_1.default(corsOptions));
// app.options("*", (next: NextFunction) => {
//   console.log("cors in option call");
//   cors(corsOptions);
//   next();
// });
app.use(express_1.default.json());
// app.use(cookieParser());
//Data sanitization against NoSQL query injection
app.use(express_mongo_sanitize_1.default());
//Data sanitization against XSS
//TODO: find some lib
//Prevent HTTP Params Pollution eg. double query param
app.use(hpp_1.default({
    //อันไหนจะให้ซ้ำได้ก็กำหนดตรงนี้
    whitelist: [],
}));
app.use(helmet_1.default());
app.use("/api", limiter);
app.use("/api/v1/products", product_router_1.default);
app.use("/api/v1/users", user_router_1.default);
app.all("*", function (req, res, next) {
    next(app_error_1.APPError.create("this " + req.originalUrl + " not found!", 404));
});
app.use(global_error_controller_1.globalErrorController);
exports.default = app;
