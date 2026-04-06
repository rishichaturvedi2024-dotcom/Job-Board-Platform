"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_model_1 = __importDefault(require("../models/application.model"));
class ApplicationsController {
    submitApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationData = req.body;
                const newApplication = new application_model_1.default(applicationData);
                yield newApplication.save();
                res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
            }
            catch (error) {
                res.status(500).json({ message: 'Error submitting application', error: error.message });
            }
        });
    }
    getApplications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield application_model_1.default.find();
                res.status(200).json(applications);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving applications', error: error.message });
            }
        });
    }
}
exports.default = new ApplicationsController();
