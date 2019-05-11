export const getCurrenUser = () => {
	return firebase.auth().currentUser;
}
export const createPost = (uid, userName,userPhoto, contentText, callback) => {
	firebase.firestore().collection('posts').add({
    userId: uid,
    user: userName,
    userPhoto : userPhoto,
    content: contentText,
    likes: 0,
    date:firebase.firestore.FieldValue.serverTimestamp(),
    // state: privacy
})
.then((response) => getAllPosts(callback))
.catch((error) => console.error("Error creando el post: ", error));

} 
export const getAllPosts = (callback) => {
    firebase.firestore().collection('posts')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() })
        });
        callback(data);
      }); 
    }


export const updatePost = (idPost, content) => { 
    let refPost = firebase.firestore().collection('posts').doc(idPost);
    return refPost.update({
    content: content,
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}


export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

