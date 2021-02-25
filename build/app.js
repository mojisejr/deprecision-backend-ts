"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var helmet_1 = __importDefault(require("helmet"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var hpp_1 = __importDefault(require("hpp"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
//ROUTER
var user_router_1 = __importDefault(require("./routes/user.router"));
var product_router_1 = __importDefault(require("./routes/product.router"));
var views_router_1 = __importDefault(require("./routes/views.router"));
var app_error_1 = require("./error/app.error");
var global_error_controller_1 = require("./error/global.error.controller");
var app = express_1.default();
app.set("view engine", "pug");
//ตรงนี้เวลา serve static file จะต้องใช้ lib path
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
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
app.use(cookie_parser_1.default());
//Data sanitization against NoSQL query injection
app.use(express_mongo_sanitize_1.default());
//Data sanitization against XSS
//TODO: find some lib
//Prevent HTTP Params Pollution eg. double query param
app.use(hpp_1.default({
    //อันไหนจะให้ซ้ำได้ก็กำหนดตรงนี้
    whitelist: [],
}));
//API ROUTEs
app.use(helmet_1.default());
//middleware to fixed the issue about csp of third party javascript
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com; object-src 'self'");
    next();
});
app.use("/", views_router_1.default);
app.use("/api", limiter);
app.use("/api/v1/products", product_router_1.default);
app.use("/api/v1/users", user_router_1.default);
app.all("*", function (req, res, next) {
    next(app_error_1.APPError.create("this " + req.originalUrl + " not found!", 404));
});
app.use(global_error_controller_1.globalErrorController);
exports.default = app;
