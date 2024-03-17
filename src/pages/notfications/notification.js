import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import NotificationsCards from '../notfications/notficationsCards'; // Correct path



import { adminPanalApiServices } from '../../services/allApiServeces';

import Loader from "../loader/Loader";
import TokenService from "../../services/TokenServices";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";
import { toast } from "react-toastify";
import {
  useEditLikeMutation,
  useGetAllPostsQuery,
  useGetConnectionMutation,
  useUnLikeMutation,
} from "../../redux/api/HomeApi";

import prabhas from "../../imges/praba.jpeg";

import "./notification.css"
import "../dashboard/common.css"
import FadeIn from 'react-fade-in/lib/FadeIn';

const Notification = () => {
  const id = TokenService.getUserIdFromToken();
  const navigate = useNavigate();

  const { data: posts, isLoading } = useGetAllPostsQuery(id);
  const { data: user } = useGetAllUserByIdQuery(id);
  const [notifications, setNotifications] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [selectedPosts, setSelectedPosts] = useState([]);


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



  useEffect(() => {
    if (user && user.data) {


      setUserData(user.data[0]);
    }
  }, [posts, user]);






  return (
    <div className='homeContiner'>
      <Navbar />
      <div className='homeRightContainer'>

        <div class="notificationContainer">
          <div className='notificationInnerContainer'>
            <div className="notificationHeader">
              <h5>Notifications</h5>
            </div>

            <NotificationsCards

            />


          </div>

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
                      <a href="profile_link" className="profile-link">
                        Invite
                      </a>
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

export default Notification;