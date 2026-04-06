"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApplicationsRoutes = void 0;
const express_1 = require("express");
const applications_controller_1 = __importDefault(require("../controllers/applications.controller"));
const router = (0, express_1.Router)();
router.post('/', applications_controller_1.default.submitApplication);
router.get('/', applications_controller_1.default.getApplications);
const setApplicationsRoutes = (app) => {
    app.use('/api/applications', router);
};
exports.setApplicationsRoutes = setApplicationsRoutes;
