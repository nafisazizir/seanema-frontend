import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserDataService from "../../services/user";
import AgeRatingModal from "./AgeRatingModal";

const Book = () => {
  const { showtimeId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let amount = searchParams.get("amount");
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(true);

  const handleNotAllowedUser = () => {
    navigate("/movies");
  };

  useEffect(() => {
    if (amount && parseInt(amount) > 6) {
      navigate("/movies");
    }

    const fetchMovie = async () => {
      try {
        const response = await UserDataService.checkAge(
          showtimeId ? parseInt(showtimeId) : 0
        );
        setIsAllowed(response.data.isAllowed);
        console.log(response.data.isAllowed);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovie();
  }, []);

  return (
    <>
      <Navbar />
      <AgeRatingModal isOpen={!isAllowed} onClose={handleNotAllowedUser} />
      <div className="page-template">Book</div>
    </>
  );
};

export default Book;
