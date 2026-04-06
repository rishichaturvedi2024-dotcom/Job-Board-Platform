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
class Application {
    constructor(input) {
        var _a, _b, _c, _d, _e;
        this.id = `app_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        this.jobId = input.jobId;
        this.applicantName = (_b = (_a = input.applicantName) !== null && _a !== void 0 ? _a : input.name) !== null && _b !== void 0 ? _b : '';
        this.applicantEmail = (_d = (_c = input.applicantEmail) !== null && _c !== void 0 ? _c : input.email) !== null && _d !== void 0 ? _d : '';
        this.resume = typeof input.resume === 'string' ? input.resume : '';
        this.coverLetter = (_e = input.coverLetter) !== null && _e !== void 0 ? _e : '';
        this.status = 'submitted';
        this.submittedAt = new Date();
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            Application.applications.unshift(this);
            return this;
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return [...Application.applications];
        });
    }
    static findById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = Application.applications.find((application) => application.id === id)) !== null && _a !== void 0 ? _a : null;
        });
    }
    static findByJobId(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Application.applications.filter((application) => application.jobId === jobId);
        });
    }
}
Application.applications = [];
exports.default = Application;
