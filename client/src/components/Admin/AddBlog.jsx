import React, { Component, Fragment } from 'react';
import * as blogServices from '../../services/blogs'
import { Link } from 'react-router-dom';

class AddBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
        this.handleBlogTitle = this.handleBlogTitle.bind(this);
        this.handleBlogContent = this.handleBlogContent.bind(this);
        this.addBlog = this.addBlog.bind(this);
    }

    addBlog() {
        let blogInfo = {
            title: this.state.title,
            content: this.state.content,
        }
        blogServices.insert(blogInfo);
    }

    handleBlogTitle(event) {
        this.setState({
            title: event.target.value
        });
    }
    handleBlogContent(event) {
        this.setState({
            content: event.target.value
        });
    }

    render() {
        return (
            <Fragment>
                <form>
                    <input
                        type="text"
                        placeholder="Write a Blog Title"
                        onChange={this.handleBlogTitle}
                    />
                    <input
                        type="text"
                        placeholder="Enter in Blog Content here"
                        onChange={this.handleBlogContent}
                    />
                    <Link
                        className="btn btn-info"
                        to={`/admin`} onClick={this.addBlog.bind(this)}>
                        Add Blog
                </Link>
                </form>

            </Fragment>
        )
    }
}

export default AddBlog;