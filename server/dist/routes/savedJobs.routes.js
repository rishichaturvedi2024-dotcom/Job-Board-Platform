"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSavedJobsRoutes = void 0;
const express_1 = require("express");
const savedJobs_controller_1 = __importDefault(require("../controllers/savedJobs.controller"));
const router = (0, express_1.Router)();
router.post('/', savedJobs_controller_1.default.saveJob);
router.get('/', savedJobs_controller_1.default.getSavedJobs);
router.delete('/:id', savedJobs_controller_1.default.deleteSavedJob);
function setSavedJobsRoutes(app) {
    app.use('/api/savedJobs', router);
}
exports.setSavedJobsRoutes = setSavedJobsRoutes;
