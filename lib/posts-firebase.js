//importing firebase app
import { db } from "./firebase";
//importing functions from firestore
import {collection, getDocs, query, where, documentId} from 'firebase/firestore';

//getting data from firebase
export async function getSortedPostsData(){
    //connecting to firebase database
    const collectRef = collection(db, "posts");
    //gettings docs from database, await because getDocs is async function so must wait for it to finish
    const querySnapshot = await getDocs(collectRef);
    //grabbing doc id and all the doc field data and mapping it
    const jsonOb = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data() }) );
     //sorting the posts by title
    jsonOb.sort(function(a, b) {
        //returning the title of the posts
        return a.title.localeCompare(b.title);
    });
    //mapping the posts to the id, title, and date
    return jsonOb.map(item => {
        //returning the id, title, date, and footer
        return{
            id: item.id.toString(),
            title: item.title,
            date: item.date,
            footer: item.footer
        }
    });
}

export async function getAllPostIds(){
    //connecting to firebase database
    const collectRef = collection(db, "posts");
    //gettings docs from database, await because getDocs is async function so must wait for it to finish
    const querySnapshot = await getDocs(collectRef);
    //grabbing doc id and all the doc field data 
    const jsonOb = querySnapshot.docs.map(doc => ({ id:doc.id }) );
     //mapping and grabbing only id
    return jsonOb.map(item => {
        //returning id as string
        return {
            params: {
                id: item.id.toString()
            }
        }
    });

}

export async function getPostData(id){
     //connecting to firebase database
    const collectRef = collection(db, "posts");
    //searching for document id in firebase
    const searchQuery = query(
        collectRef,
        where(
            documentId(),
            "==",
            id
        )
    );
    //sending search query data to getDocs to grab data from specific doc
    const querySnapshot = await getDocs(searchQuery);
    //grabbing doc id and all the doc field data and mapping it
    const jsonOb = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data() }) );

    //validation for if nothing is returned
    if(jsonOb.length ===0){
        //returning error message
        return{
            id: id,
            title: 'Not Found',
            date: '',
            contentHtml: 'Not Found',
            footer: 'Not Found'
        }
    }
    else{
        //returning document found
        return jsonOb[0];
    }
}