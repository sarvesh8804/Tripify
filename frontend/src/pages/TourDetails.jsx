import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";
import { FaPeopleGroup, FaLocationDot } from "react-icons/fa6";
import { FaStar, FaMapPin, FaCity, FaDollarSign } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import Booking from "../components/Booking/Booking";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { user } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { apiData: tour, error } = useFetch(`${BASE_URL}/tour/${id}`, {
    method: "GET",
  });
  const {
    title = "",
    photo = "",
    desc = "",
    price = "",
    reviews = "",
    city = "",
    distance = "",
    maxGroupSize = "",
    address = "",
  } = tour || {};
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const { totalRating, avgRating } = CalculateAvg(reviewsArray);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (user) {
        const reviewData = {
          username: user.username,
          reviewText,
          rating: tourRating,
        };
        const response = await fetch(`${BASE_URL}/review/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        });
        const result = await response.json();
        if (response.ok) {
          window.location.reload();
        } else {
          toast.error(result.message);
        }
      }
      if (!user || user === null || user === undefined) {
        toast.error("Please Sign In first");
      }
    } catch (err) {
      toast.error("Server not responding");
      console.log(err);
    }
  };

  return (
    <section className="my-4 px-12 w-full">
      <div>
        <div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="max-w-3xl max-h-[400px]  rounded-md overflow-hidden">
                <img src={photo} alt={title} />
              </div>
              <div className=" my-8 overflow-hidden border-solid border-[2px] shadow-sm border-gray-200 rounded-md space-y-4 px-2 py-2 md:px-8 md:py-8 mx-auto">
                <h2 className="text-[25px] md:text-[40px]  font-bold mb-4 text-center md:text-start text-BaseColor">
                  {title}
                </h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <div className="flex items-center gap-2">
                    <i>
                      <FaStar />
                    </i>
                    <span>
                      {avgRating} ({reviewsArray.length})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i>
                      <FaMapPin />
                    </i>
                    <span>{address}</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                  <div className="flex items-center gap-2">
                    <i>
                      <FaCity />
                    </i>
                    <span>{city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i>
                      <FaLocationDot />
                    </i>
                    <span>{distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i>
                      <FaDollarSign />
                    </i>
                    <span>Rs. {price}/per head</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i>
                      <FaPeopleGroup />
                    </i>
                    <span>{maxGroupSize}</span>
                  </div>
                </div>
                <h3 className="text-[22px] text-center md:text-start md:text-[30px]">
                  Description
                </h3>
                <p className="mobpara md:para">{desc}</p>
              </div>

              <div>
                <h3 className="text-[25px] md:text-[35px]  font-bold mb-4 text-center md:text-start ">
                  Reviews ({reviewsArray.length} reviews)
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-1 my-2 ">
                    <span
                      className={
                        tourRating === 1
                          ? "cursor-pointer text-orange-800"
                          : "cursor-pointer text-orange-500 hover:text-orange-800"
                      }
                      onClick={() => setTourRating(1)}
                    >
                      <i>
                        <FaStar />
                      </i>
                    </span>
                    <span
                      className={
                        tourRating === 2
                          ? "cursor-pointer text-orange-800"
                          : "cursor-pointer text-orange-500 hover:text-orange-800"
                      }
                      onClick={() => setTourRating(2)}
                    >
                      <i>
                        <FaStar />
                      </i>
                    </span>
                    <span
                      className={
                        tourRating === 3
                          ? "cursor-pointer text-orange-800"
                          : "cursor-pointer text-orange-500 hover:text-orange-800"
                      }
                      onClick={() => setTourRating(3)}
                    >
                      <i>
                        <FaStar />
                      </i>
                    </span>
                    <span
                      className={
                        tourRating === 4
                          ? "cursor-pointer text-orange-800"
                          : "cursor-pointer text-orange-500 hover:text-orange-800"
                      }
                      onClick={() => setTourRating(4)}
                    >
                      <i>
                        <FaStar />
                      </i>
                    </span>
                    <span
                      className={
                        tourRating === 5
                          ? "cursor-pointer text-orange-800"
                          : "cursor-pointer text-orange-500 hover:text-orange-800"
                      }
                      onClick={() => setTourRating(5)}
                    >
                      <i>
                        <FaStar />
                      </i>
                    </span>
                  </div>

                  <div className="flex my-8 overflow-hidden gap-4 w-full  border-BaseColor border-[1px] rounded-full">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your thoughts"
                      className="focus:outline-none w-2/3 flex-1 py-2 px-4 "
                    />
                    <button
                      className="bg-BaseColor hover:bg-BHoverColor animate-fade-in duration-300 py-2 hover:px-6 px-4 my-1 mx-1 text-white rounded-full"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <div>
                  {reviewsArray?.map((review) => (
                    <div className="py-3 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-black border-[1px] overflow-hidden">
                          <img src={avatar} alt="" />
                        </div>
                        <div>
                          <div>
                            <div>
                              <h5 className="text-lg font-semibold">
                                {review.username}
                              </h5>
                              <p className="text-gray-700 text-sm">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center py-3 px-12 justify-between">
                        <h5 className="text-lg">{review.reviewText}</h5>
                        <div></div>
                        <span className="flex items-center gap-1">
                          {review.rating}
                          <i>
                            <FaStar className="text-BaseColor" />
                          </i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-6  rounded-md flex-shrink ">
              <Booking
                title={title}
                price={price}
                avgRating={avgRating}
                reviewsArray={reviewsArray}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <br />
          <h3>Day 1 - Desert safari with BBQ Dinner</h3>
          <p style={{width: "1400px"}}>Embark on an enchanting Arabian voyage, deep into the heart of the spellbinding desert, leaving the hustle and bustle of city life behind. Start your activity with a pick-up from the hotel in a 4x4 vehicle and be driven to a designated meeting point, away from the city. Feel the adrenaline rush kicking as you ride along the mesmerizing desert dunes. Pause occasionally during your 30-minute adventure to capture remarkable photos of splendid sunset views in the heart of the desert. Get welcomed in the beautiful Bedouin desert camp with a traditional Arabic coffee and dates, before getting comfortable at your preferred seats. The action does not end here.Sit back, relax and enjoy a sumptuous dinner buffet spread including Arabic delicacies and barbeque items, along with unlimited thirst quenchers.Adding more excitement to an already fun-packed are dazzling live performances including spectacular belly dancing and a tanoura folk dance. End your evening by enjoying dinner and live performances at camp.</p>
          <br />
          <img src="https://hldak.mmtcdn.com/prod-s3-activity-templates/activitiesImagesFinal/activity/DXB/ACT10000000029292_3.webp" style={{width: "800px", height: "500px", borderRadius: "30px"}} alt="25" />
        </div>
        <br />
        <div>
          <h3>Day 2 - Full Day at Palm Jumeirah</h3>
          <p style={{width: "1400px"}}>Pick up from Hotel Proceed for View the Palm 1400 - 1500 Hrs. Visit View at the Palm Observatory 1530 - 15:45 Hrs Monorail Ride ( Day Pass With Unlimited Rides ) 1600 - 1730 Hrs. Lost Chamber Ticket 1800 Hrs. Pick up from Atlantis The Palm and drop at Hotel.</p>
          <br />
          <img src="https://www.visitdubai.com/-/media/images/leisure/neighbourhood-pages/palm-jumeirah/media/palm-jumeirah-media-3-dtcm.jpg" style={{width: "800px", height: "500px", borderRadius: "30px"}} alt="25" />
        </div>
        <br />
        <div>
          <h3>Day 3 - Half Day Dubai City Tour + Burj Khalifa 124th floor Normal Time + Fountain Show</h3>
          <p style={{width: "1400px"}}>Set out on an exciting journey to discover the iconic places of Dubai. proceed for a short photo stop at the mesmerizing Zabeel Royal Palace, and iconic Dubai Frame - the worlds largest structured frame. Continue your tour to the modern side of the city, along with Jumeirah Beach, and enjoy capturing close-up views of the magnificent Burj Al Arab hotel, well known as the worlds most luxurious hotel. Savor more scenic beauty as you drive along the Eighth Wonder of the World Palm Jumeirah, where sun-kissed waters of the Arabian Gulf meet golden shores. Soak in incredible views of the Bollywood famous venue, Atlantis Hotel view from The Pointe in Palm Jumeirah. Your memorable tour ends on a perfect note, with marvelous views of Burj Khalifa - the worlds tallest building, and a series of mesmerizing skyscrapers including Museum Of The Future , as you drive back along the famous Sheikh Zayed Road + Burj Khalifa Normal Time + Fountain Shows.</p>
          <br />
          <div style={{display: "flex"}}>
            <img src="https://tripdo.com/wp-content/uploads/2021/06/How-to-Choose-between-the-tickets-of-At-the-Top-Burj-Khalifa-tripdo.png" style={{width: "700px", height: "500px", borderRadius: "30px"}} alt="25" />
            <img src="https://www.visitdubai.com/-/media/gathercontent/poi/t/the-dubai-fountain/fallback-image/the-dubai-fountain-3-getty.jpg" style={{width: "700px", height: "400px", borderRadius: "30px", marginLeft: "30px"}} alt="25" />
          </div>
        </div>
        <br />
        <div>
          <h3>Day 4 - Hot Air Balloon on Sharing basis, Miracle Garden Tour</h3>
          <p style={{width: "1400px"}}>Enjoy and explore the iconic Dubai desert as you float gently in our hot air balloon. All our balloon rides start just before sunrise and therefore, you need to wake up before dawn and take an early morning drive to catch the glimpse of the natural beauty all around you. Hot air balloon adventure starts with a quick pre-flight briefing and then, you are aboard the basket to glide all across the vast expanse of the desert of Dubai. You’ll be captivated right away as the balloon takes off! The wind will serenely float you across the astonishing conservation reserve and over the desert flora and fauna for about 40 to 70 minutes. From an altitude of over 1000 feet, look down on the camels and gazelles freely wandering in the desert.</p>
          <br />
          <p style={{width: "1400px"}}>Experience a paradise of vibrant flowers on a tour to the Miracle Garden, worlds biggest natural flower garden. Unique to the Middle East, Miracle Garden is home to more than 60 varieties of blooming flower species, arranged in spectacular kaleidoscopic designs, shapes, and structures. Take a stroll amid beautifully sculpted flower decorations and witness the global sensation that has secured several rankings in the Guinness Book of World Records, from the Largest Vertical Garden to the Largest Floral Structure shaped in the form of an Emirates A380 aircraft. </p>
          <br />
          <div style={{display: "flex"}}>
            <img src="https://hldak.mmtcdn.com/prod-s3-activity-templates/activitiesImagesFinal/activity/DXB/ACT10000000021449_2.jpg" style={{width: "700px", height: "500px", borderRadius: "30px"}} alt="25" />
            <img src="https://hldak.mmtcdn.com/prod-s3-activity-templates/activitiesImagesFinal/activity/DXB/ACT10000000028931.jpg" style={{width: "700px", height: "400px", borderRadius: "30px", marginLeft: "30px"}} alt="25" />
          </div>
        </div>
        <br />
        <div>
          <h3>Day 5 - Wild Wadi Water Park, Dubai Aquarium Underwater Zoo</h3>
          <p style={{width: "1400px"}}>Explore a fascinating collection of marine species, including sharks and Sand Tiger on this tour to the Dubai Aquarium & Underwater Zoo, one of the world's largest indoor aquariums. As you walk through the 157 feet long tunnel, you could come face to face with thousands of aquatic species.</p>
          <br />
          <p style={{width: "1400px"}}>Wild Wadi Waterpark is a popular ticket at anytime of the year thanks to Dubais warm weather. One of the world's best waterparks, Wild Wadi is an aquatic Arabian water experience, located right next to the famous Burj Al Arab Jumeirah.Themed around the tale of the famous folklore character, Juha, the fun family attraction offers a variety of pulsating rides, slides and activities for all ages.</p>
          <br />
          <div style={{display: "flex"}}>
            <img src="https://static.visa2fly.com/blog/blog-production/Dubai-Aquarium/Dubai-Aquarium.jpeg" style={{width: "700px", height: "500px", borderRadius: "30px"}} alt="25" />
            <img src="https://assets.kerzner.com/api/public/content/ca19a689d92f402a8de6cab014ff320c?v=16c7e7b4&t=w2880" style={{width: "700px", height: "400px", borderRadius: "30px", marginLeft: "30px"}} alt="25" />
          </div>
        </div>
        <br />
        <br />
      </div>
    </section>

  );
};

export default TourDetails;

// import React, { useState } from 'react'
// import tourImg from '../assets/images/gallery-04.jpg'
// import starIcon from '../assets/images/star.png'
// import Feedback from './Tour/TourFeedback'
// import DoctorAbout from './Tour/TourAbout'

// const TourDetails = () => {
//   const [tab, setTab] = useState('about')
//   return (
//     <section>
//       <div className='max-w-[1170px] px-5 mx-auto'>
//         <div className='grid '>
//           <div className='md:col-span-2'>
//             <div className="grid grid-cols-2 items-center gap-2">
//               <figure className="max-w-[90%] max-h-[600px]">
//                 <img src={tourImg} className='w-full' alt="" />
//               </figure>
//               <div className='py-6'>
//                 <span className="bg-[#ebb487] text-SkyBlue py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
//                   Featured
//                 </span>
//                 <h3 className="text-HeadingColor mt-12 text-[34px] leading-9  font-bold">
//                   Tour Name
//                 </h3>
//                 <div className='flex items-center py-3 gap-[6px] '>
//                   <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-HeadingColor">
//                     <img src={starIcon} alt="" /> 4.8
//                   </span>
//                   <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-TextColor'>
//                     (272)
//                   </span>
//                 </div>
//                 <p className="paragraph text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, facilis.
//                 </p>
//               </div>
//             </div>

//             <div className='mt-[50px] border-b border-solid border-[#0066ff34]' >
//               <button onClick={() => setTab('about')}
//               className={`${ tab === "about" && "border-b border-solid border-Color"} py-2 px-5 mr-5 text-[16px] leading-7 text-HeadingColor font-semibold`}>
//               About
//               </button>

//               <button onClick={() => setTab('feedback')}
//               className={`${ tab === "feedback" && "border-b border-solid border-Color"} py-2 px-5 mr-5 text-[16px] leading-7 text-HeadingColor font-semibold`}>
//               Feedback
//               </button>

//             </div>

//             <div className="mt-[50px]">
//               {tab === 'about' && <DoctorAbout />}
//               {tab === 'feedback' && <Feedback />}
//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default TourDetails
