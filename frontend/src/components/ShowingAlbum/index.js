import React, {useEffect, useState} from 'react';
import { fetch } from '../../store/csrf';


const ShowngAlbum = ({ album }) => {
    // const user 
    useEffect(() => {
        (async () => {
            console.log(album)
            const res = await fetch(`/api/album/${album}`)
            console.log(res.data)
        })()
    }, [])

    return (
        <div>
            Is this Displaying.
        </div>
    )
}

export default ShowngAlbum;