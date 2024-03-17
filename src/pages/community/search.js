import React, { useEffect, useState } from "react";

import "../dashboard/common.css";

import "../search/search.css";

import Navbar from "../../components/navbar/navbar";

import {
  useEditLikeMutation,
  useFilterSearchQuery,
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

import { adminPanalApiServices } from "../../services/allApiServeces";
import FadeIn from "react-fade-in/lib/FadeIn";

const Home = ({ onBack }) => {
  const [showMore, setShowMore] = useState(false);

  const id = TokenService.getUserIdFromToken();
  const [locationFilter, setLocationFilter] = useState("");
  const [foodStyleFilter, setFoodStyleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const [postId, setPostId] = useState("");
  const [EditLike] = useEditLikeMutation();
  const [unLike] = useUnLikeMutation();
  const [likeBool, setLikeBool] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [moreIdlist, setMoreIdList] = useState([]);
  const { data: posts, isLoading } = useGetAllPostsQuery(id);
  const [getConnectionMutation] = useGetConnectionMutation();

  const { data: user } = useGetAllUserByIdQuery(id);

  const { data: filter } = useFilterSearchQuery({ userName: nameFilter, location: locationFilter, foodType: foodStyleFilter });

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    communityName: "",
    location: "location1", // default value for location
    type: "type1", // default value for type
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    if (filter && filter.data) {
      setFilterData(filter.data);
    }
  }, [posts, filter]);


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
    console.log(particularPostData);
    const updatedPostsData = postsData.map((post) => {
      if (post._id === particularPostData._id) {
        return {
          ...post,
          isLiked: post.isLiked ? false : true,
          likes_ttl: post.isLiked ? post.likes_ttl - 1 : post.likes_ttl + 1,
        };
      }
      return post;
    });

    setPostsData(updatedPostsData);

    let bodyData = {
      post_id: particularPostData._id,
      user_id: userData._id,
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
            request_type: "Received",
          },
        };
      }
      return post;
    });

    setPostsData(updatedPostsData);

    console.log(particularPostData);
    // postedBy
    //

    let bodyData = {
      sentBy: userData._id,
      sentTo: particularPostData.postedBy,
      type: "Sent",
      name: userData.name,
    };

    await adminPanalApiServices.userInvite(bodyData);
  };

  const handleSave = async (particularPostData) => {
    const updatedPostsData = postsData.map((post) => {
      if (post._id === particularPostData._id) {
        return {
          ...post,
          isSaved: post.isSaved ? false : true,
        };
      }
      return post;
    });

    setPostsData(updatedPostsData);
    console.log(particularPostData);

    if (particularPostData.isSaved) {
      let bodyData = {
        user_id: userData._id,
        saved_posts: particularPostData._id,
        save_type: "remove",
      };
      await adminPanalApiServices.userSavePost(bodyData);
    } else {
      let bodyData = {
        user_id: userData._id,
        saved_posts: particularPostData._id,
        save_type: "add", //add,remove
      };
      await adminPanalApiServices.userSavePost(bodyData);
    }
  };

  const toggleShowMore = (particularPostData) => {
    console.log("how more");
    // setShowMore(!showMore);
    // setMoreIdList(prv=>[...,particularPostData._id])
    setMoreIdList((prev) => [...prev, particularPostData._id]);
  };

  const toggleLessMore = (particularPostData) => {
    setMoreIdList((prevArray) =>
      prevArray.filter((id) => id !== particularPostData._id)
    );
  };



  const filteredPosts =
    filterData && filterData.length > 0 ? filterData : postsData;
  console.log("====================================");
  console.log(filteredPosts);
  console.log("====================================");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleBack = () => {
    onBack();
  };


  return (

    // <div className="cCContainer">
    <>
      <div className="cCContainerForm">
        <div className='cCBackButtonContianer'>
          <button className='cCButtonBack'
            onClick={handleBack}
          >
            <span class="material-symbols-outlined">
              arrow_back
            </span>
          </button>
        </div>
        <div className="searchContainerForm">
          <form className="communityFIlterContainer" onSubmit={handleSubmit}>
            <div className="searchInputContainer">
              <input
                type="text"
                name="communityName"
                className="searchSearchInput"
                placeholder="Enter name"

                onChange={(e) => {
                  setNameFilter(e.target.value);

                }}

              />
              <select
                name="location"
                className="searchSearchSelect"
                value={locationFilter}
                onChange={(e) => {
                  setLocationFilter(e.target.value)
                }}

              >
                <option value="" selected>
                  ----select Location----
                </option>
                <option value={"Chennai"}>Chennai</option>
                <option value={"Hyderabad"}>Hyderabad</option>
                <option value={"Bangalore"}>Bangalore</option>
                <option value={"Kerala"}>Kerala</option>
              </select>
              <select
                name="type"
                className="searchSearchSelect"
                value={foodStyleFilter}
                onChange={(e) => setFoodStyleFilter(e.target.value)}

              >
                <option value="" selected>
                  ----select Location----
                </option>
                <option value="yellow">Housewife</option>
                <option value="red">Single</option>
                <option value="green">Dietitian</option>
                <option value="blue">Student</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="resultContainer">


          {filteredPosts &&
            Array.isArray(filteredPosts) &&
            filteredPosts.map(
              (post) =>
                post.attachments.length > 0 && (
                  <div className='userContainerInSuggestion Suggestioncenter' key={post._id}>
                    <div className='userSuggestionInnerLeftContainer '>
                      <div className='userSuggetionContiainerInSuggetion'>
                        <img className="userImgInPostCard "
                          src={post.attachments[0].img_url} alt='user'
                        />
                      </div>
                      <div className='usersugehtionNamecontainer'>
                        <p className='userSuggetionName'>{post.postedByName ?? post.name}</p>
                        <p className='SuggestedForYou'>Suggested for you</p>
                      </div>
                    </div>
                    <div>
                      {post.status === 'invite' ? (
                        <button className="StatusBtn"
                        //  onClick={() => handleInvite(post.id)}
                        >Invite</button>
                      ) : (
                        <button className="StatusBtn"
                        // onClick={() => handleInvite(post.id)}
                        >Pending</button>
                        //   <span className="StatusBtn">Pending</span>
                      )}
                    </div>
                  </div>

                )
            )}
        </div>

      )}
    </>





  );
};

export default Home;
