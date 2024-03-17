import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import prabhas from "../../imges/praba.jpeg";

import CreateCommunityForm from "./search";

import { useGetCommunityQuery } from "../../redux/api/CommunityApi";
import TokenService from "../../services/TokenServices";
import FadeIn from "react-fade-in/lib/FadeIn";

import { useNavigate } from "react-router-dom";


import { adminPanalApiServices } from "../../services/allApiServeces";

import "./community.css"

function GroupCommunity() {

  const id = TokenService.getUserIdFromToken();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [communityDetails, setCommunityDetails] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // State to control visibility of the cart container

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let communityDetails = await adminPanalApiServices.getCommunityDetails();
      setCommunityDetails(communityDetails.data.communityDetails);
      setCommunityPosts(communityDetails.data.communityposts);
      console.log(communityDetails.data.communityposts)
    };
    fetchData();
  }, []);

  const showCreateFormHandler = () => {
    setShowCreateForm(true);
  };

  const hideCreateFormHandler = () => {
    setShowCreateForm(false);
  };

  // Function to calculate remaining time in milliseconds
  const calculateRemainingTime = (timeRemaining) => {
    if (timeRemaining === 0) {
      return timeRemaining

    } else {
      const [hours, minutes, seconds] = timeRemaining.split(":").map(Number);
      return hours * 3600000 + minutes * 60000 + seconds * 1000;

    }

  };




  const addToCart = async (postData) => {
    console.log(postData)
    const updatedCartItems = [...cartItems, postData];
    setCartItems(updatedCartItems);
    setShowCart(true);

    let userId = JSON.parse(localStorage.getItem("user")).userId

    // console.log(userId)


    let BodyData = {
      //add update same api
      user_id: userId,
      orderedFromUserId: postData.postedBy,
      orders: [
        {
          item_img: postData.image,
          item_name: postData.dishName,
          quantity: 1,
          price: postData.price

        }
      ]
    }


    await adminPanalApiServices.addCartDetails(BodyData)

  };


  const handlNavigate = () => {


    navigate("/cart")
  }

  return (
    <>
      <div className="communityInnerContainer">
        {!showCreateForm ? (
          <>
            <FadeIn>

              <div className="card-header">
                {communityDetails && communityDetails.length > 0 && (
                  <h5 className="CommunityHeader">{communityDetails[0].communityName}</h5>
                )}

                <FaUserPlus
                  className="communityAddIcon"
                  onClick={showCreateFormHandler}
                />

              </div>
              <div className="card-body">

                {showCart && (
                  <div className="cart-container">
                    <p>{cartItems.length} Item Added</p>
                    <h5 onClick={handlNavigate}>View Cart</h5>
                  </div>
                )}

                {communityPosts &&
                  communityPosts.map((postData) => (

                    <div key={postData._id} className="message-card">
                      <div className="message-header">
                        <img
                          src={postData.image}
                          alt="Profile"
                          className="profile-pic"
                        />
                        <div className="message-info">
                          <h6>{postData.name}</h6>
                          {/* <p>{formattedTime}</p> */}
                          <p className="location">Location: {postData.location}</p>
                        </div>
                      </div>
                      <img
                        src={postData.attachments[0].img_url}
                        alt="Message"
                        className="message-image"
                      />
                      <p className="dish-name">{postData.dishName}</p>
                      <p className="description">Price: &nbsp;{postData.price ? ` ${postData.price} Rs` : 'Free'}</p>
                      <p className="description">Description: &nbsp;{postData.descr}</p>
                      <div className="buttonContainerCommunity">
                        <button
                          className="add-cart-button"
                          // disabled={disableButton}
                          onClick={() => addToCart(postData)} // Call addToCart function onClick
                        >
                          Add to Cart
                        </button>
                      </div>

                    </div>

                  ))}


              </div>
              {!showCart && <div className="inputElmntInCommunity">
                <input />

              </div>}


            </FadeIn>
          </>
        ) : (
          <CreateCommunityForm onBack={hideCreateFormHandler} />
        )}
      </div>
    </>
  );
}

export default GroupCommunity;
