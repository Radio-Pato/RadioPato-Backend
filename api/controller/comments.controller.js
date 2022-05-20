const comments = require("../models/comments.model");

async function create(req, res){
    try{
        await comments.create(req.body).then( () => {
            return res.status(200).json({
                status: 200,
                data: req.body,
                message: "Comentario creado correctamente",
            })
        });
    } catch( error){
        return res.status(400).json({
            status: 400,
            error: error,
        });
    }
}

async function getAll(req, res){
    try{
        comments.find({}).then( (found) => {
            if( !found ){
                return res.status(400).json({
                    status: 400,
                    message: "No hay comentarios disponibles",
                });
            }

            return res.status(200).json({
                status: 200,
                data: found,
            });
        });
    } catch( error){
        return res.status(400).json({
            status: 400,
            message: "No hay comentarios disponibles",
        });
    }
}

async function deleted(req, res) {
    const id = req.body._id;
    if( !id || id.length === 0){
        return res.status(400).json({
            status: 400,
            message: "Se ha producido un error al intentar borrar el comentario",
        });
    }

    try{
        comments.findOneAndDelete( {_id: id}, (error, found) => {
            if (!found) {
                return res.status(400).json({
                    status: 400,
                    message: "Se ha producido un error al intentar borrar el comentario",
                });
            }

            return res.status(200).json({
                status: 200,
                message: "Comentario eliminado correctamente",
            });
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Se ha producido un error al intentar borrar el comentario",
            error: error,
        });
    }
}

module.exports = {
    create: create,
    getAll: getAll,
    deleted: deleted,
}