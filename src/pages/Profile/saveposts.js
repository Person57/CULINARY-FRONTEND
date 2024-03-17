import React, { useState ,useEffect} from 'react';




import food2 from "../../imges/food2.jpg"
import food3 from "../../imges/food3.jpeg"
import food4 from "../../imges/food4.jpg"
import food5 from "../../imges/food5.jpg"
import food6 from "../../imges/food6.jpg"
import { adminPanalApiServices } from '../../services/allApiServeces';

const Savepost = ({postInfo}) => {


 console.log(postInfo,"ll")
const [locationFilter, setLocationFilter] = useState('');
    const [foodStyleFilter, setFoodStyleFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [showPosts, setShowPosts] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [communityData, setcommunityData] = useState([]);
   
   
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetailsResponse = await adminPanalApiServices.getUserProfile();
                const community = userDetailsResponse.data.data[0]?.community?.community|| [];
                setUserDetails(userDetailsResponse.data.data[0]);
                setcommunityData(community);
                console.log(community)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);





    


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
   
    const toggleShowPosts = () => {
        setShowPosts(!showPosts);
    };


const filterPosts = (post) => {
  const locationMatch = post.location.toLowerCase().includes(locationFilter.toLowerCase());
  const foodStyleMatch = post.foodStyle.toLowerCase().includes(foodStyleFilter.toLowerCase());
  const nameMatch = post.name.toLowerCase().includes(nameFilter.toLowerCase());

  return locationMatch && foodStyleMatch && nameMatch;
};


// Filtered posts based on user input
// Change this line
const filteredPosts = communityData.filter(filterPosts);


  return (
    



    <div className="profilePostContainner">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {postInfo.length === 0 ? (
                       <div className="noPostContainer"> <p>No  Save posts available</p></div> 
                    ) : (
                        postInfo.map((post) => (
                            <div key={post.id} className="col postColumn">
                                <div className="cardPost">
                                    <img src={post.img} className="card-img-top" alt={post.name} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
      );
}

export default Savepost;
