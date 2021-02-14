import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import './ShowingAlbum.css'


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
        <div className='AlbumCont'>
            <div className='albumContents'>
                <h1>{albumInfo.name}</h1>
                {/* <div className='albumPhotos'> */}
                    {albumPhotos.length > 0 ? (
                        <div className='albumPhotos'>
                            {albumPhotos.map(ele => (
                                <div key={ele.Photo.id} className='image'>
                                    <NavLink to={`/photo/${ele.Photo.id}`} className='imageLink' />
                                    <img id={ele.Photo.id} src={ele.Photo.thumbSrc} alt=''/>
                                </div>
                            ))}
                        </div>
                    ): (
                        <div>
                            
                        </div>
                    )}
                {/* </div> */}
            </div>
        </div>
    )
}

export default ShowngAlbum;