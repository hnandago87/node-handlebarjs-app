const {connectionToMySQL} = require('../database/rdbmsConnection');
const Sequelize = require('sequelize');

var blogCategory = connectionToMySQL.define('blogCategory', {
    categoryId:{
        type:Sequelize.INTEGER,
        unique:true,
        primaryKey:true,
            autoIncrement: true,
    },
    categoryName:{
        type:Sequelize.STRING,
        unique:true
    }

},{
    freezeTableName: true,    
    timetamps:false
});


var blog = connectionToMySQL.define('blog', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique:true,
        primaryKey: true
    },
    title: {
        type:Sequelize.STRING,
        allowNull:false
    },
    body:Sequelize.STRING,
    categoryId:Sequelize.INTEGER,
    created_at:{
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},{
    freezeTableName: true,
    timetamps:false
});

blogCategory.hasMany(blog,{foreignKey: 'categoryId'});
blog.belongsTo(blogCategory,{foreignKey: 'categoryId'});

function getAllBlog(){
    blog.findAll({
        attributes:['id','title','body','categoryId','created_at'],
        include:[{
            model:blogCategory,
            required:true,
            where:{'categoryName':'UI-Angular JS'}
        }]
    }).then((result)=>{
        console.log(result[0].blogCategory.dataValues);
    })
};

getAllBlog();
// function createBlog(title, body, categoryId){
//     connectionToMySQL.sync({
//         logging:console.log
//     }).then(function(){
//         blog.create({
//             title:title,
//             body:body,
//             categoryId:categoryId
//         })
//     })
// }