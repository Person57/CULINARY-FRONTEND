import React, { useState } from 'react';

import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

const CreateCommunityForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
        communityName: '',
        location: 'location1', // default value for location
        type: 'type1', // default value for type
    });
    const [postsData, setPostsData] = useState([]);


    const handleBack = () => {
        onBack();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInvite = (postId) => {
        setPostsData((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, status: post.status === 'invite' ? 'pending' : 'invite' } : post
            )
        );
    };
    


    return (
        <div className='cCContainer'>
            <div className='cCBackButtonContianer'>
                <button className='cCButtonBack' onClick={handleBack}>
                    <span class="material-symbols-outlined">
                        arrow_back
                        </span>
                </button>
            </div>
            <div className='cCContainerForm'>
                <form className="communityFIlterContainer" onSubmit={handleSubmit}>
                    <div className="cCInputContainer">
                        <input
                            type="text"
                            name="communityName"
                            className='cCSearchInput'
                            placeholder="Enter community name"
                            value={formData.communityName}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <select
                            name="location"
                            className="cCSearchSelect"
                            value={formData.location}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        >
                            <option value="location1">Location 1</option>
                            <option value="location2">Location 2</option>
                            <option value="location3">Location 3</option>
                        </select>
                        <select
                            name="type"
                            className="cCSearchSelect"
                            value={formData.type}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        >
                            <option value="type1">Type 1</option>
                            <option value="type2">Type 2</option>
                            <option value="type3">Type 3</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="SearchContainer" >
                {postsData.map((post) => (
                    <div className='userContainerInSuggestion Suggestioncenter' key={post.id}>
                        <div className='userSuggestionInnerLeftContainer '>
                            <div className='userSuggetionContiainerInSuggetion'>
                                <img className="userImgInPostCard " src={post.img} alt='user' />
                            </div>
                            <div className='usersugehtionNamecontainer'>
                                <p className='userSuggetionName'>{post.userName}</p>
                                <p className='SuggestedForYou'>Suggested for you</p>
                            </div>
                        </div>
                        <div>
                            {post.status === 'invite' ? (
                                <button className="StatusBtn" onClick={() => handleInvite(post.id)}>Invite</button>
                            ) : (
                                <button className="StatusBtn" onClick={() => handleInvite(post.id)}>Pending</button>
                                //   <span className="StatusBtn">Pending</span>
                                )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateCommunityForm