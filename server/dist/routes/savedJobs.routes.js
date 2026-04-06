"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const savedJobs_controller_1 = __importDefault(require("../controllers/savedJobs.controller"));
const router = (0, express_1.Router)();
const savedJobsController = new savedJobs_controller_1.default();
router.post('/', savedJobsController.saveJob);
router.get('/', savedJobsController.getSavedJobs);
router.delete('/:id', savedJobsController.deleteSavedJob);
function setSavedJobsRoutes(app) {
    app.use('/api/saved-jobs', router);
}
exports.default = setSavedJobsRoutes;
