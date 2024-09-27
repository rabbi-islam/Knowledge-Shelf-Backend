
exports.generateRandomAvatar = () => {
    const avatar = `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
    return avatar;
}