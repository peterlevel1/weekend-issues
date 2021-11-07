module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(30),
      phone: STRING(20),
      email: STRING(20),
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
