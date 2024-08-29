function CreateList(id,movies){
    return {
        id:id,
        movies:movies
    };
}

const lists = [];
module.exports = {CreateList,lists};