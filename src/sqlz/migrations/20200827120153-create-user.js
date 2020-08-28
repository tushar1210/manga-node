module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      favourites: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      underscored: true,
      freezeTableName: true,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('User')
}