import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import prabhas from "../../imges/praba.jpeg";
import "./common.css";
import {
  useEditLikeMutation,
  useGetAllPostsQuery,
  useGetConnectionMutation,
  useUnLikeMutation,
} from "../../redux/api/HomeApi";
import Loader from "../loader/Loader";
import TokenService from "../../services/TokenServices";
import { MdCircle, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";
import { toast } from "react-toastify";

import { adminPanalApiServices } from "../../services/allApiServeces"
import FadeIn from "react-fade-in/lib/FadeIn";




const Home = () => {
  const [showMore, setShowMore] = useState(false);

  const id = TokenService.getUserIdFromToken();

  const { data: posts, isLoading } = useGetAllPostsQuery(id);

  const { data: user } = useGetAllUserByIdQuery(id);

  const [getConnectionMutation] = useGetConnectionMutation();
  const [postId, setPostId] = useState("");
  const [EditLike] = useEditLikeMutation();
  const [unLike] = useUnLikeMutation();
  const [likeBool, setLikeBool] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [moreIdlist, setMoreIdList] = useState([])

  const [selectedPosts, setSelectedPosts] = useState([]);

  const navigate = useNavigate();

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
    if (user && user.data) {


      setUserData(user.data[0]);
    }
  }, [posts, user]);


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




  const like = async (id) => {
    setLikeBool(!likeBool);
    setPostId(id);
    console.log(id);
    try {
      const response = await EditLike({
        post_id: id,
        user_id: TokenService.getUserIdFromToken(),
      });
      console.log("like : " + response.data.data);
      console.log("like");
      if (response?.data) {
        console.log(response?.data.message);
      } else {
        console.log("jii");
      }
    } catch (error) {
      toast("An error occurred while registering.");
    }
  };

  const unlike = async (id) => {
    setLikeBool(!likeBool);
    setPostId(id);
    console.log(id);
    try {
      const response = await unLike({
        post_id: id,
        user_id: TokenService.getUserIdFromToken(),
      });
      console.log(response);
      if (response?.data) {
        console.log(response?.data?.message);
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data?.message, { autoClose: 1000 });
      }
    } catch (error) {
      toast("An error occurred while registering.");
    }
  };

  const getConnection = async (id, user_id, userName) => {
    try {
      const response = await getConnectionMutation({
        myId: id,
        userId: user_id,
        userName: userName,
      });
      if (response?.data) {
        console.log(response?.data?.message);
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data?.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast("An error occurred while registering.");
    }
  };


  const handleLike = async (particularPostData) => {

    console.log(particularPostData)
    const updatedPostsData = postsData.map((post) => {
      if (post._id === particularPostData._id) {
        return {
          ...post,
          isLiked: post.isLiked ? false : true,
          likes_ttl: post.isLiked ? post.likes_ttl - 1 : post.likes_ttl + 1

        };
      }
      return post;
    });

    setPostsData(updatedPostsData);

    let bodyData = {
      post_id: particularPostData._id,
      user_id: userData._id
    };


    if (particularPostData.isLiked) {
      await adminPanalApiServices.userUnLike(bodyData);
    } else {
      await adminPanalApiServices.userLike(bodyData);
    }

  };

  const handleInvite = async (particularPostData) => {
    const updatedPostsData = postsData.map((post) => {
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

    setPostsData(updatedPostsData);

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



  const handleSave = async (particularPostData) => {

    const updatedPostsData = postsData.map((post) => {
      if (post._id === particularPostData._id) {
        return {
          ...post,
          isSaved: post.isSaved ? false : true

        };
      }
      return post;
    });

    setPostsData(updatedPostsData);
    console.log(particularPostData)

    if (particularPostData.isSaved) {
      let bodyData = {
        user_id: userData._id,
        saved_posts: particularPostData._id,
        save_type: "remove"
      }
      await adminPanalApiServices.userSavePost(bodyData);
    } else {
      let bodyData = {
        user_id: userData._id,
        saved_posts: particularPostData._id,
        save_type: "add" //add,remove
      }
      await adminPanalApiServices.userSavePost(bodyData);
    }
  }

  const toggleShowMore = (particularPostData) => {
    console.log("how more")
    // setShowMore(!showMore);
    // setMoreIdList(prv=>[...,particularPostData._id])
    setMoreIdList(prev => [...prev, particularPostData._id]);




  };


  const toggleLessMore = (particularPostData) => {
    setMoreIdList(prevArray => prevArray.filter(id => id !== particularPostData._id));

  }


  return (
    <div className=" homeContiner">
      <Navbar />
      <span></span>
      <div className="homeRightContainer">
        <div className="homePOstFeedContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {postsData &&
                postsData.map((post) => (
                  post.attachments.length > 0 && (
                    <FadeIn key={post._id} className="userPostCard">

                      <div className="userContainerHead">
                        <div className="userImgNameContainer">

                          <img
                            key={post._id}
                            className="userImgInPostCard"
                            src={post.postedByProfileImage}
                            alt="user"
                          />

                          <p>{post.postedByName}</p>
                        </div>
                        {/* <span className="material-symbols-outlined">
                          more_horiz
                        </span> */}
                        <MdCircle color={`${post.preferences ?? "red"}`} />
                      </div>
                      <div className="userPostContent">
                        <div className="image-container">
                          {post.attachments.map((img) => (
                            <img
                              key={img._id}
                              src={img.img_url}
                              alt="user"
                            />
                          ))}
                          <div className="text-overlay">
                            <p className="white-text">{post.dishName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="postButtonContainer">

                        <div className="likeButtonContainer">

                          <div className="likeButtonInnerCont">

                            <button className="favorite-btn" onClick={() => handleLike(post)}>
                              <span>
                                {post.isLiked ? (
                                  <MdFavorite
                                    color="red"
                                  // onClick={() => unlike(post._id)}
                                  />
                                ) : (
                                  <MdFavoriteBorder
                                  // onClick={() => like(post._id)}
                                  />
                                )}
                              </span>
                            </button>

                            <p className="favParaCont">
                              {post.likes_ttl}{" "}
                              {post.likes_ttl > 1 ? "Likes" : "Like"}
                            </p>

                          </div>

                          {post.connection ? (
                            <button
                              className="invite-btn"
                            //  onClick={() => handleInvite(post)}
                            >
                              {post.connection.request_type === "Following" ? "Member" : "Pending"}


                            </button>
                          ) : (
                            <button
                              className="invite-btn"
                              onClick={() => handleInvite(post)}
                            >
                              Invite
                            </button>

                          )
                          }


                        </div>

                        <div className="inviteButtonContainer">
                          <button className="bookmark-btn" onClick={() => handleSave(post)}>
                            <span>
                              {!post.isSaved ? (
                                <FaRegBookmark />
                              ) : (
                                <FaBookmark />
                              )}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="procedureContainer">
                        <p>
                          <span className="userDescriptionName">
                            Description
                          </span>
                          {/* {showMore ? post.descr : } */}
                          {/* {post.descr.length > 10 && ( */}

                          {moreIdlist.includes(post._id) ? (
                            post.descr
                          ) : (
                            <>
                              {post.descr.slice(0, 20)}
                              < span
                                onClick={() => toggleShowMore(post)}
                                style={{ cursor: "pointer", color: "blue" }}
                              >
                                &nbsp; ...more
                              </span>
                            </>
                          )}


                          {/* )} */}
                        </p>
                      </div>

                    </FadeIn>
                  )
                ))}
            </>
          )}
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
                        <p href="/home" className="profile-link" onClick={() => handleInviteSide(post)}>
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
    </div >
  );
};

export default Home;
