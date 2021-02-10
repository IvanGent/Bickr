import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as albumActions from '../../store/album';
// import * as photoActions from '../../store/photos';
import { useParams } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import './Album.css';


const Album = () => {
    const dispatch = useDispatch();
    const userPhotos = useSelector(state => state.photo.photos);
    const selected = new Array(userPhotos.length).fill(false);
    const { id } = useParams();
    const [alTitle, setAlTitle] = useState('');

    useEffect(() => {
        // dispatch(photoActions.updatingState(id))
        console.log(userPhotos)
    }, [dispatch, id]);

    const handleAlbumSubmit = async (albumId) => {
        const res = await fetch('/api/album/photo', {
            method: 'POST',
            body: JSON.stringify({
                albumId
            })
        })
    };

    const handleAlbum = async () => {
        const album = await fetch(`/api/album`, {
            method: 'POST',
            body: JSON.stringify({
                name: alTitle,
                userId: id,
            })
        });
        const check = album.data.createdAlbum
        handleAlbumSubmit(check.id);
    }

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
            <form onSubmit={handleAlbum}>
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
        </div>
    )
}

export default Album;