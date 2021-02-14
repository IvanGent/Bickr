import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import AlbumStock from '../../images/NoPhotos.jpg'
import './ShowingAlbum.css'
import { useSelector } from 'react-redux';


const ShowngAlbum = ({ album }) => {
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const [albumPhotos, setAlbum] = useState([]);
    const [albumInfo, setAlbumInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/album/${album}`)
            setAlbumInfo(res.data.album);
            setAlbum(res.data.album.AlbumPhotos);
            setLoaded(true);
        })()

    }, [])

    return (
        <div className='AlbumCont'>
            <div className='albumContents'>
                <h1>{albumInfo.name}</h1>
                {albumInfo.userId === userId && (
                    <div>
                        <button id='deleteAlbum'>Delete Album</button>
                    </div>
                )}
                {loaded ? (
                    <>
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
                        <div className='noPhotos'>
                            <h3 id='noPhotos' >No Photos</h3>
                            <img id='stockPhoto' src={AlbumStock} alt='Stock no photos' />
                        </div>
                        // <h3>Loading...</h3>
                    )}
                    </>
                ): (
                    <h3>Loading...</h3>
                )}
            </div>
        </div>
    )
}

export default ShowngAlbum;