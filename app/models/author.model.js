module.exports = (sequelize, Sequelize) => {
	const Author = sequelize.define('author', {
		id_autor: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nombre: {
			type: Sequelize.STRING,
			allowNull: false
		},
		apellido: {
			type: Sequelize.STRING,
			allowNull: false
		},
		nacionalidad: {
			type: Sequelize.STRING,
			allowNull: false
		},
		fecha_nacimiento: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});
	
	return Author;
};
