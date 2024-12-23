import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    tmdbId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    poster_path: String,
    overview: String,
    media_type: String,
    release_date: String
}, {
    timestamps: true
});

// Составной уникальный индекс для предотвращения дублирования фильмов у пользователя
filmSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });

const Film = mongoose.model('Film', filmSchema);

export default Film;
