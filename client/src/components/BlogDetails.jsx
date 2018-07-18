import React from 'react';
import { Link } from 'react-router-dom';

let BlogDetails = ({ blogdata }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-body">{blogdata.title}
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;