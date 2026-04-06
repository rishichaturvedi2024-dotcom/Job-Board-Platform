"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApplicationsRoutes = void 0;
const express_1 = require("express");
const applications_controller_1 = __importDefault(require("../controllers/applications.controller"));
const router = (0, express_1.Router)();
const applicationsController = new applications_controller_1.default();
router.post('/apply', applicationsController.submitApplication);
router.get('/applications', applicationsController.getApplications);
const setApplicationsRoutes = (app) => {
    app.use('/api/applications', router);
};
exports.setApplicationsRoutes = setApplicationsRoutes;
