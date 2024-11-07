import goalRepository from '../repositories/goalRepository.js';
import EfficientNetModel from '../models/EfficientNetModel.js';

const getTodayGoal = async (userId) => {
    return await goalRepository.getRandomGoal(userId);
};

const uploadBeforePhoto = async (userId, photoUrl) => {
    await goalRepository.updateBeforePhoto(userId, photoUrl);
};

const uploadAfterPhoto = async (userId, photoUrl) => {
    await goalRepository.updateAfterPhoto(userId, photoUrl);
};

const evaluateGoal = async (userId) => {
    const goal = await goalRepository.getGoalByUserId(userId);
    const isCompleted = await EfficientNetModel.comparePhotos(goal.beforePhotoUrl, goal.afterPhotoUrl);

    if (isCompleted) {
        await goalRepository.updateStatus(userId, 'completed');
        return { message: "미션이 완료되었습니다!" };
    } else {
        return { message: "인증에 실패하였습니다. 다시 시도해주세요.", retry: true };
    }
};

export default {
    getTodayGoal,
    uploadBeforePhoto,
    uploadAfterPhoto,
    evaluateGoal
};
