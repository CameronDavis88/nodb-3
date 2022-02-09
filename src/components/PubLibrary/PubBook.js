import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography, Button, Grid } from '@material-ui/core';
import './PubBook.css';

const PubBook = (props) => {
    const { id, author, gutUrl, imageUrl, user, displayTitle, fullTitle } = props;
    const userId = user.user_id;

    const [added, setAdded] = useState(false);

    const addBook = () => {
        const newBook = {
            gutBookId: id,
            title: fullTitle,
            author: author,
            imageUrl: imageUrl,
            gutUrl: gutUrl,
        };

        axios.post(`/api/book/${userId}`, newBook)
            .then(() => {
                setAdded(true);
                setTimeout(() => {
                    setAdded(false);
                }, 2000);
            })
            .catch(err => console.log(err));
    };

    return (
        <Grid key={id} className='book-box' >
            <div className='book' >
                <Typography variant='h5' >{displayTitle}</Typography>
                <Typography >By: {author}</Typography>
                <div className='image-box' >
                <img alt='cover' src={imageUrl} className='cover-image' />
                </div>
            </div>
            {userId
                ?
                <div>
                    {added === true ? 
                    <Typography variant='h6' color='secondary' className='added'>* Book Added *</Typography> 
                    : 
                    <button className='book-btn' onClick={() => addBook()} >Add Book to Your Library</button>}
                </div>
                :
                <></>}
            <nav>
                <a href={gutUrl} className='nav-a' ><Typography className='nav-text' variant='h6'>Read Book Here</Typography></a>
            </nav>
        </Grid>
    );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(PubBook);