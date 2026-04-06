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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
class Application {
    constructor(id, jobId, applicantName, applicantEmail, resume, coverLetter, status, submittedAt) {
        this.id = id;
        this.jobId = jobId;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.resume = resume;
        this.coverLetter = coverLetter;
        this.status = status;
        this.submittedAt = submittedAt;
    }
    // Method to save the application to the database
    static save(application) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation for saving the application
        });
    }
    // Method to find an application by ID
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation for finding an application by ID
        });
    }
    // Method to get all applications for a specific job
    static findByJobId(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementation for finding applications by job ID
        });
    }
}
exports.Application = Application;
