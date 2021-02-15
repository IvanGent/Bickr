# Bickr(Flickr Clone) (https://bickr-react-app.herokuapp.com/)

**Table of Contents**
- [Bickr](#bickr)
  - [Description](#description)
  - [Technologies](#technologies)
  - [Frontend Overview](#frontend-overview)
  - [AJAX](#ajax)

 
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