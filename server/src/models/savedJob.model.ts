import mongoose, { Document, Schema } from 'mongoose';

export interface ISavedJob extends Document {
    jobId: string;
    userId: string;
    savedAt: Date;
}

const SavedJobSchema: Schema = new Schema({
    jobId: { type: String, required: true },
    userId: { type: String, required: true },
    savedAt: { type: Date, default: Date.now }
});

const SavedJob = mongoose.model<ISavedJob>('SavedJob', SavedJobSchema);

export default SavedJob;