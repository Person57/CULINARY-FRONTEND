import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import BasicButton from "../../components/BasicButton";
import food from "../../imges/food6.jpg";
import { useGetCartQuery, usePlaceOrderMutation } from "../../redux/api/CartApi";
import TokenService from "../../services/TokenServices";
import { useGetAllUserByIdQuery } from "../../redux/api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function YourCart() {
  const id = TokenService.getUserIdFromToken();
  const [cartDetails, setCartDetails] = useState([]);
  const { data: getCartDetails } = useGetCartQuery();
  const [quantities, setQuantities] = useState({});
  const { data: user } = useGetAllUserByIdQuery(id);
  const [placeApi ] = usePlaceOrderMutation(id);
  const [userData, setUserData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    if (getCartDetails && getCartDetails.data) {
      setCartDetails(getCartDetails.data);
    }
  }, [getCartDetails]);

  const increaseQuantity = (orderId) => {
    const updatedQuantities = { ...quantities };
    updatedQuantities[orderId] += 1;
    setQuantities(updatedQuantities);
  };

  const decreaseQuantity = (orderId) => {
    if (quantities[orderId] > 1) {
      const updatedQuantities = { ...quantities };
      updatedQuantities[orderId] -= 1;
      setQuantities(updatedQuantities);
    }
  };
  useEffect(() => {
    if (user && user.data) {
      setUserData(user.data[0]);
    }
  }, [user]);
  const handlePlaceOrder = async () => {
    try {
      const response = await placeApi(id);
      console.log(response);

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        history("/home");
        console.log(response.data);
      } else {
        toast.error(response?.error?.data?.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartDetails.forEach((cartItem) => {
      cartItem.orders.forEach((order) => {
        totalPrice += order.price * quantities[order._id];
      });
    });
    return totalPrice;
  };
  useEffect(() => {
    if (getCartDetails && getCartDetails.data) {
      setCartDetails(getCartDetails.data);

      // Initialize quantities with default values
      const initialQuantities = {};
      getCartDetails.data.forEach((cartItem) => {
        cartItem.orders.forEach((order) => {
          initialQuantities[order._id] = order.quantity;
        });
      });
      setQuantities(initialQuantities);
    }
  }, [getCartDetails]);

  return (
    <Container fluid className="mt-mobile">
      <Row className=" d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-sm-column justify-content-between align-items-start">
        <Col style={{ overflowY: "scroll" }}>
          <Col lg={2} xxl={2} xl={2} md={12} xs={12}>
            <Navbar />
          </Col>
        </Col>

        <Col
          className="my-2 "
          lg={6}
          xxl={6}
          xl={6}
          md={12}
          xs={12}
          sm={12}
          style={{ maxHeight: "100vh", overflowY: "scroll" }}
 
        >
          <Col className="  boxShadow rounded p-xxl-5 p-xl-5 p-lg-5 p-md-2 p-sm-2 p-4 mx-2">
            <Col >
              <h5>Select delivery Address</h5>
              <p>You have a saved address in this location</p>
            </Col>
            <Row className="d-flex my-xxl-5 my-xl-5 my-lg-5 flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-row flex-sm-column justify-content-between align-items-start">
              <Col className="d-flex flex-row justify-content-between align-items-center boxShadow p-3 m-2">
                <Col className="d-flex flex-column justify-content-between align-items-start">
                  <Col className="d-flex flex-row justify-content-between align-items-start mt-2 mb-5">
                    <IoHomeOutline className="mx-2 my-1" />
                    <Col className="mx-2">
                      <h6>Home</h6>
                      <p>1/66, Dubai Kurukku Sandhu, Dubai</p>
                    </Col>
                  </Col>
                  <BasicButton
                    label={"DELIVER HERE"}
                    className={"w-100"}
                    variant={"warning"}
                  />
                </Col>
              </Col>

              <Col className="d-flex flex-column justify-content-start align-items-start boxShadow p-3 m-2">
                <Col className="d-flex flex-column justify-content-start align-items-start">
                  <Col className="d-flex flex-row justify-content-center align-items-start  mt-2 mb-5">
                    <MdOutlineAddLocationAlt className="mx-2 my-1" />
                    <Col className="mx-2">
                      <h6>Add new address</h6>
                      <p>1/66, Dubai Kurukku Sandhu, Dubai</p>
                    </Col>
                  </Col>
                </Col>
                <BasicButton
                  label={"ADD NEW"}
                  className={"w-100"}
                  variant={"warning"}
                />
              </Col>
            </Row>
          </Col>
          <Col className="boxShadow my-5 p-5">
            <Col>
              <h6 className="">Payment</h6>
            </Col>
          </Col>
        </Col>

        <Col
          lg={4}
          xxl={4}
          xl={4}
          md={12}
          xs={12}
          style={{
            maxHeight: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {cartDetails &&
            cartDetails.map((cart) => (
              <>
                <Col className="boxShadow p-4">
                  <Row style={{ borderBottom: "1px solid black" }}>
                    <Col className="d-flex w-100">
                      <img
                        src={userData.image}
                        alt=".."
                        width={60}
                        height={60}
                      />
                      <Col className="mx-2">
                        <h6 className=" text-nowrap">
                          {userData.name ?? "Loading..."}
                        </h6>
                        <p className="fs-6 text-secondary">
                          {userData.location ?? "Loading..."}
                        </p>
                      </Col>
                    </Col>
                  </Row>
                  <Col
                    style={{
                      maxHeight: "300px",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {cart.orders.map((orders) => (
                      <>
                        <Row className="d-flex m-2 flex-row w-100 justify-content-between align-items-center">
                          <Col
                            className="text-dark"
                            style={{ fontWeight: "bold" }}
                          >
                            {orders.item_name}
                          </Col>
                          <Col className="boxShadow p-2 d-flex justify-content-around align-items-center">
                            <span
                              className="pointer"
                              onClick={() => decreaseQuantity(orders._id)}
                            >
                              -
                            </span>
                            <span>{quantities[orders._id]}</span>
                            <span
                              className="pointer"
                              onClick={() => increaseQuantity(orders._id)}
                            >
                              +
                            </span>
                          </Col>
                          <Col className="d-flex flex-row w-100 justify-content-end align-items-center">
                            <p className="text-secondary">${orders.price}</p>
                          </Col>
                        </Row>
                      </>
                    ))}
                  </Col>
                  <Col
                    className="d-flex flex-row justify-content-between pt-2  align-items-center"
                    style={{ borderTop: "1px solid black" }}
                  >
                    <h6>TO PAY</h6>
                    <h6>${calculateTotalPrice()}</h6>
                  </Col>
                </Col>
              </>
            ))}
          <Col className="p-3">
            {cartDetails.length !== 0 ? (
              <BasicButton
                label={"PLACE ORDER"}
                className={"w-100 "}
                variant={"warning"}
                onClick={handlePlaceOrder}
              />
            ) : (
              ""
            )}
          </Col>

          <Col className="boxShadow p-5 my-sm-4 my-md-4">
            <Col className="border-secondary">
              <h6>
                Review your order and address details to avoid cancellations
              </h6>
              <p>
                <span className="text-danger">Note:</span> If you cancel within
                60 seconds of placing your order, a 100% refund will be issued.
                No refund for cancellations made after 60 seconds.
              </p>
              <p>Avoid cancellation as it leads to food wastage.</p>
            </Col>
          </Col>
        </Col>
      </Row>
      <Col className="d-block d-xxl-none d-xl-none d-xxl-none d-lg-none d-md-block d-sm-block">
        {/* <div className="navBarBottomInMobileView fixed-bottom navbar-light bg-light">
          <div className="mobileViewNavButton">
            <span class="material-symbols-outlined">home</span>
          </div>
          <div className="mobileViewNavButton">
            <span class="material-symbols-outlined">diversity_2</span>
          </div>
          <div className="mobileViewNavButton">
            <span class="material-symbols-outlined">add_circle</span>
          </div>
          <div className="mobileViewNavButton">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <div className="mobileViewNavButton">
            <span class="material-symbols-outlined">person</span>
          </div>
        </div> */}
      </Col>
    </Container>
  );
}

export default YourCart;
