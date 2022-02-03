import React, { useEffect, useState } from 'react';
import UsersBook from './UsersBook';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser, clearUser } from '../../redux/reducer'; 
import Navbar from '../Navbar/Navbar';



//I think you will need to have all the data from the books sent and retrieved from the database, not gutenberg (see and alter AddBook function)
// unless you set a condition if the book has been edited then only send the edited version --which would be weird just sent all the data to the database
//then you will need to or can use the functionality of the getBooks or getData in the controllers

const UsersLibrary = (props) => {
    const userId = props.user.user_id;
  
    const [books, setBooks] = useState([]);
    const [authorSearch, setAuthorSearch] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [searchView, setSearchView] = useState(false);

    const searchFn = async () => {
        setSearchView({ searchView: true });
        await axios.get(`/api/books=search?=title{}--etc etc----------I dont know something like this`)
            .then(({ data }) => {
                setBooks( data );
                showMeTheData(data);
            })
            .catch((err) => console.log(err));
    };

    //This is for logging in the console the data to follow it and see if it's doing what it should
    const showMeTheData = (data) => {
        console.log(data);
        console.log(data.results);
    };

    //No need for next page and previous page etc etc

    const getBooks = async () => {
        const userId = props.user.user_id;
       await axios.get(`/api/books/${userId}`)
            .then(({ data }) => {
                setBooks(data);
                // showMeTheData(data);
                console.log(data)
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getBooks()
        console.log(props)
    }, [])


    useEffect(() => {
        getBooks()
        // console.log(user)
        console.log(userId)
        // console.log(props.user)
        console.log(books)
        
        }, [userId])
    
  


    // const mappedBooks = books.map((book) => {
    //     const { id, title, authors, formats, users_book_id } = book;
    //     const gutUrl = formats["text/html"];
    //     const imageUrl = formats["image/jpeg"];
    //     const author = authors[0].name;
    //     const usersBookId = users_book_id;
    //     return <UsersBook key={id} id={id} usersBookId={usersBookId} title={title} author={author} imageUrl={imageUrl} gutUrl={gutUrl} getBooks={getBooks} />
    // })

    return (
        // You will need to make this component like a merger of the Dashboard and PubLibrary but for the user
        <div>
            <Navbar props={props} />
            This is the User's Library

            {/* {mappedBooks} */}
            {
            !books[0]
             ? 
                
                <div>
                    <h2>Note that the user has no books yet asks if they
                        would like to add some from the public library</h2>
                        <button onClick={() => props.history.push('/')} >Go to Public Library</button>
                </div>
                :
                //  <h1>This is where it will map</h1>
                 books.map((book) => {
                     //remember these properties are coming from the database keys and values, not gutenberg!
                const { users_book_id, title, author, image_url, gut_url } = book;
                    return <UsersBook key={users_book_id} id={users_book_id} title={title} author={author} gutUrl={gut_url} imageUrl={image_url} setBooks={setBooks} getBooks={getBooks} />
                })
            }

        </div>
    )

};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(UsersLibrary);
