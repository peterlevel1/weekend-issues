module.exports = {
  async up(queryInterface, Sequelize) {
    const { BOOLEAN } = Sequelize;
    
    await queryInterface.addColumn('users', 'sex', {
      type: BOOLEAN,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'sex');
  },
};
