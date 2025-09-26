//importing fs from node.js
import fs from 'fs';
//importing path from node.js
import path from 'path';

//setting data directory
const dataDir = path.join(process.cwd(), 'data');

//required nextjs function to get the sorted posts data
export function getSortedPostsData() {
    //setting the file path
    const filePath = path.join(dataDir, 'post.json');
    //reading the file
    const jsonString = fs.readFileSync(filePath, 'utf8');
    //parsing the file
    const jsonObj = JSON.parse(jsonString);
    //sorting the posts by title
    jsonObj.sort(function(a, b) {
        //returning the title of the posts
        return a.title.localeCompare(b.title);
    });
    //mapping the posts to the id, title, and date
    return jsonObj.map(item => {
        //returning the id, title, and date
        return{
            id: item.id.toString(),
            title: item.title,
            date: item.date,
            footer: item.footer
        }
    });
}
//required nextjs function to grab all post ids
export function getAllPostIds() {
    //grabbing filepath
    const filePath = path.join(dataDir, 'post.json');
    //reading json file
    const jsonString = fs.readFileSync(filePath, 'utf8');
    //parsing json file
    const jsonObj = JSON.parse(jsonString);
    //mapping and grabbing only id
    return jsonObj.map(item => {
        //returning id as string
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}
//function to grab all the content and return it from json files
export function getPostData(id) {
    //grabbing filepath
    const filePath = path.join(dataDir, 'post.json');
    //reading json file
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    //parsing json file
    const jsonObj = JSON.parse(jsonString);
    //filtering id to ensure we have an id
    const objReturned = jsonObj.filter(obj =>{
        return obj.id.toString() === id;
    });
    //checking for any errors
    if (objReturned.length === 0){
        //returning for if nothing was found to avoid errors
        return{
            id: id,
            title: "Not Found",
            date: '',
            contentHtml: "not found"
        };
    }
    //sending all ids to be used by nextjs
    else{
        return objReturned[0];
    }

}