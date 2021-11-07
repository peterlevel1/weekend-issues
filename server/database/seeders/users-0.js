const password = require('../../config/secret').user.root.password;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'root',
        password,
        phone: '',
        email: 'react_hz@126.com',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { name: 'root' });
  },
};
