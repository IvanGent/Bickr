# Bickr(Flickr Clone) (https://bickr-react-app.herokuapp.com/)

**Table of Contents**
- [Bickr](#bickr)
  - [Description](#description)
  - [Technologies](#technologies)
  - [Frontend Overview](#frontend-overview)
  - [AJAX](#ajax)
  -[Early Complications](#early-complications)

 
## Description

* Bickr is an application that allows users to upload photos to be shared with other users on the site.
Users can create albums with photos they'd would like to keep together and comment on the photos. 


## Technologies
 - Javascript
 - PostgresSQL
 - HTML/CSS
 - React
 - Redux
 - Express
 - Sequelize
 - Bcrypt


 ## Frontend Overview 

Bickr utilizes React to have the ability to update only the components that need
updating, it keeps the user engaged with the site. Those updates are being done with AJAX, so theres no need for the page to refresh.


## AJAX

Working on previous projects that utilized AJAX, it was better for me and benefits the user. After creating an album, AJAX is used to display all the users albums including the newly created one.

```js
export const updatingAlbum = (data) => async(dispatch) => {
    const { id } = data;
    const res = await fetch(`/api/album/user/${id}`)
    await dispatch(updateAlbum(res.data.albums))
    return res;
}
```

This is a snippet showing the call and updating the redux store and that information is being displayed to the user.


## Early Complications

Decided to find a way to save the photos being uploaded to the site to the database instead of using AWS. More of an experiment and curiosity thing than it being permanent because I can see how I can effect loading times drastically.
The code snippet below is the end result

```js
  const handlePhoto = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if(!file.type.match(/image.*/)) {
      setErrors(['Needs to be an image']);
      return;
    }

    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result

      img.onload = async function(event) {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / event.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = event.target.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(event.target, 'image/jpeg');
        return dispatch(photoActions.addPhotoToProfile({ userId: id, thumbSrc: srcEncoded, src: e.target.result}))
        .then(res => dispatchEvent(photoActions.gettingState()))
        .catch(res => {
          if(res.data && res.data.errors) setErrors(res.data.errors);
        })
      }
    }
    reader.readAsDataURL(file);
  }
```

When a user uploads a photo it first checks if the file type is an image. The onload method on the reader object is triggered when the reader object successfully reads the file. 