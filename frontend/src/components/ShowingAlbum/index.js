import React, {useEffect, useState} from 'react';
import { fetch } from '../../store/csrf';


const ShowngAlbum = ({ album }) => {
    const [albumPhotos, setAlbum] = useState([]);

    useEffect(() => {
        (async () => {
            console.log(album)
            const res = await fetch(`/api/album/${album}`)
            setAlbum(res.data.album);
            console.log(res.data.album)
        })()

    }, [albumPhotos.length])

    return (
        <div>
            <h1>{albumPhotos.name}</h1>
            
        </div>
    )
}

export default ShowngAlbum;