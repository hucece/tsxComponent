export const createRandomStr = () => {
    return Math.random()
        .toString(36)
        .slice(-8);
};