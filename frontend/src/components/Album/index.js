import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as albumActions from '../../store/album';
import { fetch } from '../../store/csrf';
import './Album.css';
import AlbumStock from '../../images/NoPhotos.jpg'
import ShowingAlbum from '../ShowingAlbum';



const Album = ({ setShowAlbum, showAlbum, showingAlbum, setShowingAlbum }) => {
    const dispatch = useDispatch();
    const userPhotos = useSelector(state => state.photo.photos);
    const selected = new Array(userPhotos.length).fill(false);
    const { id } = useParams();
    const [alTitle, setAlTitle] = useState('');
    // const [albums, setAlbums] = useState([]);
    const albums = useSelector(state => state.album.albums[0])
    const [selectedAlbum, setSelectedAlbum] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            // const als = await fetch(`/api/album/user/${id}`)
            const als = await dispatch(albumActions.updatingAlbum({id}))
            console.log(als)
            console.log(albums)
            setLoaded(true);
            // setAlbums(als.data.albums);
        })()
    }, [dispatch, id]);


    const handleAlbumSubmit = async (e, albumId) => {
        e.preventDefault();
        const album = await fetch(`/api/album`, {
            method: 'POST',
            body: JSON.stringify({
                name: alTitle,
                userId: id,
            })
        });
        const check = album.data.createdAlbum
        const photos = [];
        userPhotos.forEach((ele, i) => {
            if(selected[i]) photos.push(ele.id);
        })
        await fetch('/api/album/photo', {
            method: 'POST',
            body: JSON.stringify({
                albumId: check.id,
                photos
            })
        })
        await dispatch(albumActions.updatingAlbum({id}))
        setShowAlbum(true);
    };

    const handleClickSelection = (e) => {
        const pos = e.target.id.split(',')[1]
        const sel = document.getElementById(pos);
        if(sel.classList.contains('notSelected')) {
            sel.classList.add('selected');
            sel.classList.remove('notSelected');
        } else {
            sel.classList.add('notSelected');
            sel.classList.remove('selected');
        }
        return selected[pos] ? selected[pos] = false : selected[pos] = true;
    }

    const handleShowAlbum = (e) => {
        setSelectedAlbum(e.target.id);
        setShowingAlbum(true);
    }

    return (
        <div className='AlbumCont'>
            {showAlbum ? (
                <>
                    {!showingAlbum ? (
                        <div>
                            {loaded ? (
                                <div className='showAlbum'>
                                    {albums.map(ele => (
                                        <div key={ele.id} className='albums' onClick={handleShowAlbum}>
                                            {ele.AlbumPhotos.length ? (
                                                <div>
                                                    <img id={ele.id} src={ele.AlbumPhotos[0].Photo.thumbSrc} alt='' />
                                                </div>
                                            ) : (
                                                <div>
                                                    <img id={ele.id} className='albumStock' src={AlbumStock} alt='' />
                                                </div>
                                            )}
                                            <h3 id={ele.id} >{ele.name}</h3>
                                            
                                        </div>
                                    ))}
                                </div>
                            ): (
                                <h3>Loading..</h3>
                                )}
                        </div>
                    ): (
                        <ShowingAlbum album={selectedAlbum} setShowingAlbum={setShowingAlbum} />
                    )}
                </>
            ):(
                <form onSubmit={handleAlbumSubmit}>
                    <input
                        type='text'
                        value={alTitle}
                        onChange={e => setAlTitle(e.target.value)}
                        placeholder='Album Title'
                        required
                    />
                    Select Photos For Album
                    <div className='imageSelection'>
                        {userPhotos.map((photo, i) => {
                            return <div key={photo.id} id={i} className='image notSelected' onClick={handleClickSelection}>
                                <img id={`${photo.id},${i}`} src={photo.thumbSrc} alt='' />
                            </div>
                        })}
                    </div>
                    <button type='submit'>Create Album</button>
                </form>
            )}
        </div>
    )
}

export default Album;