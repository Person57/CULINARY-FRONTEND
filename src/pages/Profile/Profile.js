import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";

import "./Profile.css";
import { Button, Form, Modal } from "react-bootstrap";
import Posts from "../Profile/posts";
import Comunityposts from "../Profile/comunityposts";
import Saveposts from "../Profile/saveposts";
import "../dashboard/common.css";
import { adminPanalApiServices } from "../../services/allApiServeces";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";

// Modal.setAppElement('#root');

const Profile = ({ filteredPostsLength }) => {
  const [formData, setFormData] = useState({
    nameInput: "",
    dietInput: "",
    descriptionInput: "",
    rateInput: "",
  });
  const [redirect, setRedirect] = useState(false);

  const [showPosts, setShowPosts] = useState(false); // Changed to false to display only community posts
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showGruop, setShowGroup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("posts");

  const [postsData, setPostData] = useState([]);

  const [community, setcommunityData] = useState([]);

  // const [savedPost , setSavedPost] = useState([])

  const [savePost, setSavePost] = useState([]);
  const history = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleShowGroup = () => {
    setShowGroup(true);
    setShowModal(false);
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const [errormsgState, setErrorMsgState] = useState({
    imgErrorMsg: false,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let userDetails = await adminPanalApiServices.getUserProfile();

      setUserDetails(userDetails.data.data[0]);

      console.log(userDetails.data.data[0].saved_posts_data);
      setPostData(userDetails.data.data[0].posts.posts);
      setcommunityData(userDetails.data.data[0].posts.community);

      setSavePost(userDetails.data.data[0].saved_posts_data);
    };
    fetchData();
  }, []);

  const toggleShowPosts = () => {
    setShowPosts(!showPosts);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      setImageFile(file);
      setUploadedImage(URL.createObjectURL(file));
      setErrorMsgState({ imgErrorMsg: false });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return; // Exit the function if no file is selected
    }
    setFormData({ ...formData, imageFile: file });
    setImageFile(file);
    setUploadedImage(URL.createObjectURL(file));
    setErrorMsgState({ imgErrorMsg: false });
  };

  const onClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formTitle = "Home";
  // console.log(filteredPostsLength, "hello");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className=" homeContiner">
      <Navbar />
      <span></span>

      {userDetails && (
        <div className="homeRight">
          <div className="container-fluid">
            {isDesktop ? (
              <div className="rowpost">
                <div className="image">
                  <img
                    src={userDetails.image}
                    alt="Profile"
                    className="profile_img"
                  />
                </div>

                <div className="profile">
                  <div className="user-name-container">
                    <h3 className="userName">{userDetails.name}</h3>
                    <div className="">
                      <button
                        variant="primary"
                        className="profile_button mx-2"
                        onClick={handleShow}
                      >
                        Edit Profile
                      </button>
                      <button
                        variant="primary"
                        className="profile_button mx-2"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>

                    <Modal show={showModal} centered onHide={handleClose}>
                      <Modal.Body>
                        <div className="editContainer">
                          <div className="editRight">
                            <div className="editInpContainer">
                              <label htmlFor="name" className="editintText">
                                User Name
                              </label>
                              <input
                                name="nameInput"
                                id="name"
                                type="text"
                                placeholder="Name"
                                className="editint"
                                onChange={handleChange}
                              />
                            </div>

                            <div className="editInpContainer">
                                <label
                                  htmlFor="location"
                                  className="editintText"
                                >
                                  Preference
                                </label>
                                <select
                                  name="rateInput"
                                  id="rate"
                                  className="editint"
                                  value={formData.rateInput}
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    ----select Location----
                                  </option>
                                  <option value="yellow">Housewife</option>
                                  <option value="red">Single</option>
                                  <option value="green">Dietitian</option>
                                  <option value="blue">Student</option>
                                </select>
                              </div>
                            <div className="editInpContainer">
                              <label htmlFor="location" className="editintText">
                                Location
                              </label>
                              <select
                                name="locationInput"
                                id="location"
                                className="editint"
                                value={formData.locationInput}
                                onChange={handleChange}
                              >
                                <option value="">
                                  ----select Location----
                                </option>
                                <option value={"Chennai"}>Chennai</option>
                                <option value={"Hyderabad"}>Hyderabad</option>
                                <option value={"Bangalore"}>Bangalore</option>
                                <option value={"Kerala"}>Kerala</option>
                              </select>
                            </div>

                            <div className="editBtnContainer">
                              <button className="editSubmitBtn" type="submit">
                                Save
                              </button>
                              <button
                                className="editCloseBtn"
                                onClick={handleClose}
                              >
                                {" "}
                                Close{" "}
                              </button>
                            </div>
                          </div>
                          <div className="editleft">
                            <label className="editintText">
                              Upload Image<span className="starIcon">*</span>{" "}
                            </label>
                            <div className="dragAndDropContainer">
                              <div
                                className="file-inner-container"
                                onDrop={handleOnDrop}
                                onDragOver={handleDragOver}
                              >
                                <div className="folderContainer">
                                  {uploadedImage ? (
                                    <div className="imgSecondStyles">
                                      <div className="courseUploadImgContainer">
                                        <img
                                          src={uploadedImage}
                                          alt="Uploaded"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="UploadImgInCourse">
                                      <div className="UploadToCloudCont">
                                        <img
                                          src="https://img.icons8.com/ios/50/upload-to-cloud--v1.png"
                                          alt="upload to cloud"
                                          className="upload-logo"
                                        />
                                        <p className="UploadToCloudContPara">
                                          Drag course logo here
                                        </p>
                                      </div>
                                      <p className="UploadToCloudContPara">
                                        or
                                      </p>
                                    </div>
                                  )}

                                  <div className="dragButtonContainerCourse">
                                    <input
                                      type="file"
                                      ref={fileInputRef}
                                      style={{ display: "none" }}
                                      onChange={(e) => handleFileChange(e)}
                                    />
                                    <button
                                      type="button"
                                      onClick={onClickUpload}
                                      className="browse-btn"
                                    >
                                      <span class="material-symbols-outlined">
                                        add
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div className="post_container">
                    <p>
                      {" "}
                      <span className="number"></span>
                      {userDetails.posts.posts.length} Posts{" "}
                    </p>

                    <p>
                      <span className="number">10</span> followers
                    </p>
                  </div>
                  <div className="Bio">
                    <p className="d-flex align-items-center">
                      <IoLocationSharp className="ml-2" />
                      {userDetails.location}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container mobile-container">
                <div className="profile">
                  <div className="user-name-container">
                    <div className="imgContainer">
                      <img
                        src={userDetails.image}
                        alt="Profile"
                        className="profile_img"
                      />
                    </div>

                    <div>
                      <div className="userNameContainer">
                        <h3 className="userName">{userDetails.name}</h3>

                        <button
                          className=" profile_button"
                          onClick={handleShow}
                        >
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                      </div>

                      <Modal show={showModal} centered onHide={handleClose}>
                        <Modal.Body>
                          <div className="editContainer">
                            <div className="editRight">
                              <div className="editInpContainer">
                                <label htmlFor="name" className="editintText">
                                  User Name
                                </label>
                                <input
                                  name="nameInput"
                                  id="name"
                                  type="text"
                                  placeholder="Name"
                                  className="editint"
                                  onChange={handleChange}
                                />
                              </div>

                              
                              <div className="editInpContainer">
                                <label
                                  htmlFor="location"
                                  className="editintText"
                                >
                                  Preference
                                </label>
                                <select
                                  name="rateInput"
                                  id="rate"
                                  className="editint"
                                  value={formData.rateInput}
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    ----select Location----
                                  </option>
                                  <option value="yellow">Housewife</option>
                                  <option value="red">Single</option>
                                  <option value="green">Dietitian</option>
                                  <option value="blue">Student</option>
                                </select>
                              </div>
                              <div className="editInpContainer">
                                <label
                                  htmlFor="location"
                                  className="editintText"
                                >
                                  Location
                                </label>
                                <select
                                  name="locationInput"
                                  id="location"
                                  className="editint"
                                  value={formData.locationInput}
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    ----select Location----
                                  </option>
                                  <option value={"Chennai"}>Chennai</option>
                                  <option value={"Hyderabad"}>Hyderabad</option>
                                  <option value={"Bangalore"}>Bangalore</option>
                                  <option value={"Kerala"}>Kerala</option>
                                </select>
                              </div>

                              <div className="editBtnContainer">
                                <button className="editSubmitBtn" type="submit">
                                  Save
                                </button>
                                <button
                                  className="editCloseBtn"
                                  onClick={handleClose}
                                >
                                  {" "}
                                  Close{" "}
                                </button>
                              </div>
                            </div>
                            <div className="editleft">
                              <label className="editintText">
                                Upload Image<span className="starIcon">*</span>{" "}
                              </label>
                              <div className="dragAndDropContainer">
                                <div
                                  className="file-inner-container"
                                  onDrop={handleOnDrop}
                                  onDragOver={handleDragOver}
                                >
                                  <div className="folderContainer">
                                    {uploadedImage ? (
                                      <div className="imgSecondStyles">
                                        <div className="courseUploadImgContainer">
                                          <img
                                            src={uploadedImage}
                                            alt="Uploaded"
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="UploadImgInCourse">
                                        <div className="UploadToCloudCont">
                                          <img
                                            src="https://img.icons8.com/ios/50/upload-to-cloud--v1.png"
                                            alt="upload to cloud"
                                            className="upload-logo"
                                          />
                                          <p className="UploadToCloudContPara">
                                            Drag course logo here
                                          </p>
                                        </div>
                                        <p className="UploadToCloudContPara">
                                          or
                                        </p>
                                      </div>
                                    )}

                                    <div className="dragButtonContainerCourse">
                                      <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={(e) => handleFileChange(e)}
                                      />
                                      <button
                                        type="button"
                                        onClick={onClickUpload}
                                        className="browse-btn"
                                      >
                                        <span class="material-symbols-outlined">
                                          add
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                      <div className="post_container">
                        <p>
                          {" "}
                          <span className="number"></span>
                          {userDetails.posts.posts.length} Posts{" "}
                        </p>

                        <p>
                          <span className="number">1000</span> followers
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="Bio">
                    <p className="d-flex align-items-center">
                      <IoLocationSharp className="ml-2" />
                      {userDetails.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="profilePostsContainer">
              {/* Buttons for toggling between posts and community */}
              <div className="save_post">
                <div className="innerSavePostContainer">
                  <button
                    className={`post_button ${
                      selectedTab === "posts" ? "post_buttonAactive" : ""
                    }`}
                    onClick={() => handleTabChange("posts")}
                  >
                    <span className="material-symbols-outlined">grid_on</span>
                    <span className="desktop-text">POSTS</span>
                  </button>
                  <button
                    className={`post_button ${
                      selectedTab === "community" ? "post_buttonAactive" : ""
                    }`}
                    onClick={() => handleTabChange("community")}
                  >
                    <span className="material-symbols-outlined">
                      diversity_2
                    </span>
                    <span className="desktop-text"> COMMUNITY </span>
                  </button>
                  <button
                    className={`post_button ${
                      selectedTab === "saved" ? "post_buttonAactive" : ""
                    }`}
                    onClick={() => handleTabChange("saved")}
                  >
                    <span className="material-symbols-outlined">bookmark</span>
                    <span className="desktop-text"> SAVED </span>
                  </button>
                </div>
              </div>

              {selectedTab === "posts" && <Posts postInfo={postsData} />}
              {selectedTab === "community" && <Posts postInfo={community} />}
              {selectedTab === "saved" && <Posts postInfo={savePost}></Posts>}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
