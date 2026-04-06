"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jobs_routes_1 = require("./routes/jobs.routes");
const applications_routes_1 = require("./routes/applications.routes");
const savedJobs_routes_1 = require("./routes/savedJobs.routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, jobs_routes_1.setJobsRoutes)(app);
(0, applications_routes_1.setApplicationsRoutes)(app);
(0, savedJobs_routes_1.setSavedJobsRoutes)(app);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
