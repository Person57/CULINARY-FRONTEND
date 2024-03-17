import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/navbar";

import food1 from "../../imges/food1.jpeg";
import food2 from "../../imges/food2.jpg";
import food3 from "../../imges/food3.jpeg";
import food4 from "../../imges/food4.jpg";
import food5 from "../../imges/food5.jpg";
import food6 from "../../imges/food6.jpg";
import * as Yup from "yup";
import prabhas from "../../imges/praba.jpeg";

import CreateCommunityForm from "./createcommunity";

import "../dashboard/common.css";

import "./community.css";
import GroupCommunity from "./GroupCommunity";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import BasicButton from "../../components/BasicButton";
import {
  useCreateCommunityMutation,
  useGetCommunityQuery,
} from "../../redux/api/CommunityApi";
import { toast } from "react-toastify";
import TokenService from "../../services/TokenServices";
import FadeIn from "react-fade-in/lib/FadeIn";

import { adminPanalApiServices } from "../../services/allApiServeces";

import Loader from "../loader/Loader";

import { useNavigate } from "react-router-dom";

import {
  useEditLikeMutation,
  useGetAllPostsQuery,
  useGetConnectionMutation,
  useUnLikeMutation,

} from "../../redux/api/HomeApi";

import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";

// import { current } from '@reduxjs/toolkit';

const Community = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGruop, setShowGroup] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isLoder, setIsLoader] = useState(true)

  const [communityDetails, setCommunityDetails] = useState([]);

  const id = TokenService.getUserIdFromToken();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const [createCommunity, { isLoading }] = useCreateCommunityMutation();

  const { data: communityData } = useGetCommunityQuery(id);

  const { data: posts } = useGetAllPostsQuery(id);

  const { data: user } = useGetAllUserByIdQuery(id);

  const [userData, setUserData] = useState([]);

  const [selectedPosts, setSelectedPosts] = useState([]);

  const [postsData, setPostsData] = useState([]);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({

    communityName: Yup.string()
      .min(3, "Community name must be at least 3 characters")
      .required("Community name is required"),
  });




  useEffect(() => {
    if (user && user.data) {


      setUserData(user.data[0]);
    }
  }, [posts, user]);


  useEffect(() => {

    setIsLoader(true)

    const fetchData = async () => {

      let communityDetails = await adminPanalApiServices.getCommunityDetails()

      setCommunityDetails(communityDetails.data.communityDetails)

      console.log(communityDetails.data.communityDetails)

      setIsLoader(false)

    }

    fetchData()

  }, []);

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





  const handleShowGroup = async () => {
    try {
      const response = await createCommunity({
        id: id,
        communityName: inputValue,
      });
      console.log(response);
      if (response?.data) {
        setInputValue("");

        setShowGroup(true);
        setShowModal(false);
        toast.success(response?.data.message, { autoClose: 1000 });
        console.log("if part");
        console.log(response);


      } else {
        toast.success(response.error.data, { autoClose: 1000 });
        console.log("else part");
        console.log(response);
      }
    } catch (error) {
      toast("An error occurred while Forget.");
      console.log(error);
    }
  };

  const initialValues = {
    communityName: "",
  };

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
    <div className=" homeContiner">
      <Navbar />
      <span></span>

      <div className="posthomeRightContainer">


        {isLoder ? (
          <Loader />

        ) : (
          <div class="homePOstFeedContainer  communityContainer">
            {communityDetails.length > 0 ? (
              communityDetails.map((community) => (
                <React.Fragment key={community.communityName}>
                  {community.communityName !== "" && community.communityName != null ? (
                    <GroupCommunity />
                  ) : (
                    <div className="createCommunityButtonContainer">
                      <button onClick={handleShow}>Create Community</button>
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="createCommunityButtonContainer">
                <button onClick={handleShow}>Create Community</button>
              </div>
            )}




          </div>

        )}


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


      <Formik
        validationSchema={validationSchema}
        onSubmit={handleShowGroup}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Modal show={showModal} centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Community</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formInput">
                  <Form.Control
                    type="text"
                    name="communityName"
                    placeholder="Enter Community name"
                    value={inputValue}
                    className={`form-control ${touched.communityName && errors.communityName
                      ? "is-invalid"
                      : ""
                      }`}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.communityName && errors.communityName ? (
                    <p className="text-danger m-1">{errors.communityName}</p>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <BasicButton
                className="mt-3 "
                variant={"warning"}
                type="button"
                disabled={isSubmitting}
                onClick={
                  inputValue === "" ||
                    (touched.communityName && errors.communityName)
                    ? handleSubmit
                    : handleShowGroup
                }
                isLoading={isLoading}
                label={"Create"}
              />
            </Modal.Footer>
          </Modal>
        )}
      </Formik>


    </div>
  );
};

export default Community;
