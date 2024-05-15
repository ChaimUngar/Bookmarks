import { useAuth } from '../BookmarkContext';
import { Link } from 'react-router-dom';
import Row from "./MyBookmarks";
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookmarks = () => {
    const { user } = useAuth()
    const [bookmarks, setBookmarks] = useState([])
    const [rowToEdit, setRowToEdit] = useState({
        title: '',
        id: 0
    })

    const userId = user.id

    const getBookmarks = async () => {
        const { data } = await axios.get(`/api/bookmark/get-bookmarks?id=${userId}`)
        setBookmarks(data)
    }

    // const onDeleteClick = async (id) => {
    //     await axios.post(`/api/bookmark/delete?id=${id}`)
    //     await getBookmarks()
    // }

    const onDeleteClick = async (id) => {
        await axios.post(`/api/bookmark/delete`, { id })
        await getBookmarks();
    }

    const onEditClick = (id, title) => {
        setRowToEdit({ id: id, title: title })
    }

    const onUpdateClick = async (id, title) => {
        await axios.post('/api/bookmark/update', { id, title })
        await getBookmarks()
    }

    useEffect(() => {
        getBookmarks()
    }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: '20px' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back {user.firstName} {user.lastName}</h1>
                            <Link className="btn btn-primary btn-block" to="/add-bookmark">Add Bookmark</Link>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarks.map(b => <tr key={b.id}>
                                    {rowToEdit.id !== b.id && <td>{b.title}</td>}
                                    {rowToEdit.id === b.id && <input type="text" className="form-control" placeholder="Title"
                                        onChange={(e) => setRowToEdit({ ...b, title: e.target.value })} value={rowToEdit.title}></input>}
                                    <td>
                                        <Link
                                            href={b.url}
                                            target="_blank">{b.url}
                                        </Link>
                                    </td>
                                    <td>
                                        {rowToEdit.id !== b.id && <button className="btn btn-success" onClick={() => onEditClick(b.id, b.title)}>Edit Title</button>}
                                        {rowToEdit.id === b.id && <>
                                            <button className="btn btn-warning" onClick={() => onUpdateClick(b.id, b.title)}>Update</button>
                                            <button className="btn btn-info" onClick={() => setRowToEdit({ id: 0, title: '' })}>Cancel</button>
                                        </>}

                                        <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => onDeleteClick(b.id)}>Delete</button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyBookmarks

