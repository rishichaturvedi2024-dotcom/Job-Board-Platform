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
class SavedJob {
    constructor(input) {
        var _a;
        this.id = `saved_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        this.jobId = input.jobId;
        this.userId = (_a = input.userId) !== null && _a !== void 0 ? _a : 'anonymous';
        this.savedAt = new Date();
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = SavedJob.savedJobs.find((item) => item.jobId === this.jobId && item.userId === this.userId);
            if (!existing) {
                SavedJob.savedJobs.unshift(this);
                return this;
            }
            return existing;
        });
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return [...SavedJob.savedJobs];
        });
    }
    static findByIdAndDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = SavedJob.savedJobs.findIndex((item) => item.id === id);
            if (index < 0) {
                return null;
            }
            const [removed] = SavedJob.savedJobs.splice(index, 1);
            return removed;
        });
    }
}
SavedJob.savedJobs = [];
exports.default = SavedJob;
