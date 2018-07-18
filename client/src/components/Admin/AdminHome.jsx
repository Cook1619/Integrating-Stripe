import React, { Component, Fragment } from 'react';
import AdminDetails from './AdminDetails';
import AddBlog from './AddBlog';
import * as blogServices from '../../services/blogs'
import { getCiphers } from 'crypto';

class BlogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }
    }

    async componentDidMount() {
        try {
            let res = await fetch('/api/blogs/');
            let data = await res.json();
            this.setState({
                blogs: data
            })
        } catch (e) {
            console.log(e);
        }
    }
 
    render() {
        let blogList = this.state.blogs.map((blog) => {
            return <AdminDetails key={blog.id} blogdata={blog} />
        })
        return (
            <Fragment>
                <AddBlog />
                {blogList}
            </Fragment>
        )
    }
}

export default BlogList;