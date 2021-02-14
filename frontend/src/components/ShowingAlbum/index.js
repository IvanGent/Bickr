import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import * as albumActions from '../../store/album';
import AlbumStock from '../../images/NoPhotos.jpg'
import './ShowingAlbum.css'
import { useSelector } from 'react-redux';


const ShowngAlbum = ({ album, setShowingAlbum }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const {id} = useParams();
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

    const handleDeleteAlbum = async () => {
        console.log(albumInfo)
        await fetch(`/api/album/${albumInfo.id}`, {method: 'DELETE'});
        await dispatch(albumActions.updatingAlbum({id}));
        setShowingAlbum(false);
    }

    return (
        <div className='AlbumCont'>
            <div className='albumContents'>
                <h1>{albumInfo.name}</h1>
                {albumInfo.userId === userId && (
                    // <div>
                        <button id='deleteAlbum' onClick={handleDeleteAlbum}>Delete Album</button>
                    // </div>
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