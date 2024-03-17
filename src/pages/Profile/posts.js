import React, { useState, useEffect } from 'react';
import { adminPanalApiServices } from '../../services/allApiServeces';
import Profile from './Profile';

const Posts = ({ postInfo }) => {

    console.log(postInfo, "ll");

    return (
        <div className="profilePostContainner">
            <div className="postInnerContainer">
                <>
                    {postInfo.length === 0 ? (
                        <div className="noPostContainer"><p>No posts available</p></div>
                    ) : (
                            postInfo.map((post, index) => (
                                post.attachments && post.attachments.length > 0 && post.attachments[0].img_url ? (
                                    <div className="cardPost" key={post._id}>
                                        <img src={post.attachments[0].img_url} className="card-img-top" alt={post.dishName} />
                                    </div>
                                ):(
                                    <div className="noPostContainer"><p>No posts available</p></div>
                                )
                            ))
                        )}
                </>
            </div>
        </div>
    );
}

export default Posts;
