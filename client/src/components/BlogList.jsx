import React, { Component, Fragment } from 'react';
import BlogDetails from './BlogDetails';

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
            return <BlogDetails key={blog.id} blogdata={blog} />
        })
        return (
            <Fragment>
                {blogList}
            </Fragment>
        )
    }
}

export default BlogList;