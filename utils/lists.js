const { lists } = require("../models/list");

exports.DeleteList = function DeleteList(List){
    let deleted_idx = lists.indexOf(List);
    for(let i =deleted_idx;i< lists.length;i++){
        lists[i]['id']=deleted_idx;
        deleted_idx++;
    }
    lists.splice(lists.indexOf(List),1);
}

exports.CombineLists = function CombineLists(lists){
    let combined_movies = [];
     let list2 =[];
     let flag = false;
     console.log(lists.length);
    for(let i=0; i<lists.length;i++){
        for(let j = 0;j< lists[i]['movies'].length;j++){
            list2.push(lists[i]['movies'][j]);
        }
        console.log(lists[i]['movies']);
        if(!flag){
            combined_movies = list2;
            flag = true;
        }
        let temp = combined_movies
        for(let j = 0;j<combined_movies.length;j++){
            let check = list2.find(item => item === combined_movies[j]);
            if(!check)
            {
                temp.splice(temp.indexOf(combined_movies[j]),1);
            }
        }
        combined_movies = temp;
        list2 = [];
    }
    return [...new Set(combined_movies)];
}

