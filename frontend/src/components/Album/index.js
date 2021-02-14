import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import './Album.css';
import AlbumStock from '../../images/NoPhotos.jpg'



const Album = ({ setShowAlbumCreate, setShowAlbum, showAlbum }) => {
    const dispatch = useDispatch();
    const userPhotos = useSelector(state => state.photo.photos);
    const selected = new Array(userPhotos.length).fill(false);
    const { id } = useParams();
    const [alTitle, setAlTitle] = useState('');
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        (async () => {
            const als = await fetch(`/api/album/user/${id}`)
            setAlbums(als.data.allAlbums);
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
        const als = await fetch(`/api/album/user/${id}`)
        setAlbums(als.data.allAlbums);
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

    return (
        <div className='AlbumCont'>
            {showAlbum ? (
                <div className='showAlbum'>
                    {albums.map(ele => (
                        <div key={ele.id} className='albums'>
                            {/* {ele.AlbumPhotos.map(ele => (
                                <div key={ele.Photo.id}>
                                <img id={ele.Photo.id} src={ele.Photo.thumbSrc} alt='' />
                                </div>
                            ))} */}
                            {ele.AlbumPhotos.length ? (
                                <div>
                                    <img id={ele.AlbumPhotos[0].Photo.id} src={ele.AlbumPhotos[0].Photo.thumbSrc} alt='' />
                                </div>
                            ) : (
                                <div>
                                    <img id='albumStock' src={AlbumStock} alt='' />
                                </div>
                            )}
                            <h3>{ele.name}</h3>
                            
                        </div>
                    ))}
                </div>
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
                                {/* <NavLink to={`/photo/${photo.id}`} className='imageLink' /> */}
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