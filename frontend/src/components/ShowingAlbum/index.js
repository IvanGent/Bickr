import React, {useEffect, useState} from 'react';
import { fetch } from '../../store/csrf';


const ShowngAlbum = ({ album }) => {
    const [albumPhotos, setAlbum] = useState([]);
    const [albumInfo, setAlbumInfo] = useState([]);

    useEffect(() => {
        (async () => {
            console.log(album)
            const res = await fetch(`/api/album/${album}`)
            setAlbumInfo(res.data.album);
            setAlbum(res.data.album.AlbumPhotos);
            console.log(res.data.album)
        })()

    }, [])

    return (
        <div>
            <h1>{albumInfo.name}</h1>
            {albumPhotos.length > 0 ? (
                <div>
                    {albumPhotos.map(ele => (
                        <div key={ele.Photo.id}>
                            <img id={ele.Photo.id} src={ele.Photo.thumbSrc} alt='' />
                        </div>
                    ))}
                </div>
            ): (
                <div></div>
            )}
            {/* {albumPhotos.AlbumPhotos.map(ele => {
                console.log(ele)
                return (
                    <div></div>
                )
            })} */}
        </div>
    )
}

export default ShowngAlbum;