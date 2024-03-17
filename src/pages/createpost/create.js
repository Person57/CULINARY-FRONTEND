import React, { useState, useEffect } from 'react';

import Navbar from '../../components/navbar/navbar';
import { FaHome } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

import food1 from "../../imges/food1.jpeg"
import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"

import prabhas from "../../imges/praba.jpeg"

import "./create.css"

import "../community/community.css"

import "../dashboard/common.css"

import postTypes from '../../constants/postTypes';

import PostForm from './PostForm/PostForm';
import FadeIn from 'react-fade-in/lib/FadeIn';

import {
    useEditLikeMutation,
    useGetAllPostsQuery,
    useGetConnectionMutation,
    useUnLikeMutation,

} from "../../redux/api/HomeApi";

import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";

import TokenService from "../../services/TokenServices";
import { useNavigate } from "react-router-dom";

import { adminPanalApiServices } from "../../services/allApiServeces";

// import { current } from '@reduxjs/toolkit';

const CreatePost = () => {

    const [isCreate, setIsCreate] = useState(false)
    const [postType, setPostType] = useState(postTypes.HOME_POST)

    const id = TokenService.getUserIdFromToken();

    const { data: posts } = useGetAllPostsQuery(id);

    const { data: user } = useGetAllUserByIdQuery(id);

    const [userData, setUserData] = useState([]);

    const [selectedPosts, setSelectedPosts] = useState([]);

    const [postsData, setPostsData] = useState([]);

    const navigate = useNavigate();




    useEffect(() => {
        if (user && user.data) {


            setUserData(user.data[0]);
        }
    }, [posts, user]);

    useEffect(() => {
        if (posts && posts.data) {
            function shuffleArray(array) {
                // Make a copy of the array
                const newArray = array.slice();
                // Shuffle the copied array
                for (let i = newArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            }

            // Create a shuffled copy of posts.data
            let reArrangedArray = shuffleArray(posts.data);

            // Set the shuffled array to the state
            setPostsData(reArrangedArray);
            console.log(posts.data, "from");
            console.log(userData);
        }
    }, [posts]);

    useEffect(() => {

        const uniquePosts = new Set();

        postsData.forEach(person => {
            uniquePosts.add(person);
        });

        const uniquePostsArray = Array.from(uniquePosts);


        const selected = uniquePostsArray.slice(0, Math.min(7, uniquePostsArray.length));
        console.log(selected, "sel")

        setSelectedPosts(selected);

    }, [postsData]);

    const handleInviteSide = async (particularPostData) => {
        const updatedPostsData = selectedPosts.map((post) => {
            if (post._id === particularPostData._id) {
                return {
                    ...post,
                    connection: {
                        request_type: "Received"
                    }

                };
            }
            return post;
        });

        setSelectedPosts(updatedPostsData);

        console.log(particularPostData)
        // postedBy
        // 

        let bodyData = {
            sentBy: userData._id,
            sentTo: particularPostData.postedBy,
            type: "Sent",
            name: userData.name
        }

        await adminPanalApiServices.userInvite(bodyData)

    }




    return (
        <div className={`create_main_container`}>

            <Navbar />
            <span></span>

            <div className='homeRightContainer'>



                <div className="homePOstFeedContainer  communityContainer">



                    {!isCreate && <div className="create_community_button_container">
                        <button className='create_community_button' onClick={() => setIsCreate(!isCreate)}>Create Post</button>
                    </div>}

                    {isCreate && <div className='create_post_main_container'>
                        <div className="create_post_buttons_card">
                            <button className='create_home_post_button' onClick={() => setPostType(postTypes.HOME_POST)}>
                                <span><FaHome /></span><span className="text">Home Post</span>
                            </button>
                            <span>||</span>
                            <button className='create_community_post_button' onClick={() => setPostType(postTypes.COMMUNITY_POST)}>
                                <span><MdGroups2 /></span>  <span className="text">Community Post</span>
                            </button>
                        </div>
                    </div>}

                    {(isCreate) ?
                        <PostForm postType={postType} />
                        : null
                    }

                </div>

                <div className="userHomeContainer">
                    <div className="userSuggestedContainer">
                        <div className="userContainerInSuggestion">
                            <div className="userSuggestionInnerLeftContainer">
                                <div className="userSuggetionContiainerInSuggetion">
                                    <img
                                        className="userImgInPostCard "
                                        src={userData.image}
                                        alt="userImg"
                                    />
                                </div>
                                <div className="usersugehtionNamecontainer">
                                    <p className="userSuggetionName">
                                        {userData.name ?? "Loading..."}
                                    </p>
                                    <p>{`@${userData.name ?? "Loading..."}`}</p>
                                </div>
                            </div>
                            <div className="pointer" onClick={() => navigate("/profile")}>
                                <p className="profile-link">View Profile</p>
                            </div>
                        </div>
                    </div>
                    <div className="userSuggestedContainer">
                        <div className="seeallContainer">
                            <h5>Suggested for you See All</h5>
                            <p className="seeAllUserSuggestion">See all</p>
                        </div>
                        {selectedPosts &&
                            selectedPosts.map((post) => (

                                post.postedBy !== userData._id && (

                                    <FadeIn className="userContainerInSuggestion" key={post._id}>

                                        <div className="userSuggestionInnerLeftContainer">
                                            <div className="userSuggetionContiainerInSuggetion">
                                                <img
                                                    className="userImgInPostCard "
                                                    alt="..."
                                                    src={post.postedByProfileImage}
                                                />
                                            </div>
                                            <div className="usersugehtionNamecontainer">
                                                <p className="userSuggetionName">
                                                    {post.postedByName}
                                                </p>
                                                <p className="SuggestedForYou">Suggested for you</p>
                                            </div>
                                        </div>
                                        <div>

                                            {post.connection ? (
                                                <p className="profile-link" >
                                                    {post.connection.request_type === "Received" || "Sent" ? "Pending" : "Member"}
                                                </p>
                                            ) : (
                                                <p href="/home" className="profile-link"
                                                    onClick={() => handleInviteSide(post)}
                                                >
                                                    Invite
                                                </p>
                                            )
                                            }


                                        </div>

                                    </FadeIn>
                                )

                            ))}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default CreatePost;
