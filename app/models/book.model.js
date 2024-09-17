module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {
		id_libro: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		titulo: {
			type: Sequelize.STRING,
			allowNull: false
		},
		autor: {
			type: Sequelize.STRING,
			allowNull: false
		},
		isbn: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		editorial: {
			type: Sequelize.STRING,
			allowNull: false
		},
		anio_publicacion: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		categoria: {
			type: Sequelize.STRING,
			allowNull: false
		},
		cantidad_disponible: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		ubicacion: {
			type: Sequelize.STRING,
			allowNull: false
		},
		copyrightby: {
			type: Sequelize.STRING,
			defaultValue: 'UMG Antigua'
		}
	});
	
	return Book;
};
