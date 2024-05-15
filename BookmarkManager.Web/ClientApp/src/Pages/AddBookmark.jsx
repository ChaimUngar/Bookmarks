import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../BookmarkContext"

const AddBookmark = () => {
    const [formData, setFormData] = useState({ title: '', url: '' })
    const isValidForm = formData.title && formData.url

    const navigate = useNavigate()
    const { user } = useAuth()

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/add-bookmark', {title: formData.title, url: formData.url, userId: user.id});
        navigate('/my-bookmarks');
    }



    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <main role="main" className="pb-3">
                <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Add Bookmark</h3>
                        <form onSubmit={onFormSubmit}>
                            <input type="text" name="title" placeholder="Title" className="form-control"
                                onChange={onTextChange} value={formData.title} />
                            <br />
                            <input type="text" name="url" placeholder="Url" className="form-control"
                                onChange={onTextChange} value={formData.url} />
                            <br />
                            <button className="btn btn-primary" disabled={!isValidForm}>Add</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddBookmark