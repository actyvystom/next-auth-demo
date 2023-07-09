import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {StyledContainer} from "../../components/StyledContainer";
import {FishCard} from "../../components/FishCard";

export const FishDetails = () => {
  const [fish, setFish] = useState(null);
  const router = useRouter();
  const {fishId} = router.query;
  const [isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    const loadFishDetails = async () => {
      try {
        const response = await fetch(`/api/fish/${fishId}`);
        if (!response.ok) {
          if (response.status === 401) {
            setIsLocked(true);
          } else {
            throw new Error(`status: ${response.status}`);
          }
        }
        const data = await response.json();
        setFish(data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    if (fishId) {
      loadFishDetails();
    }
  }, [fishId]);

  return (
    <StyledContainer>
      <FishCard fish={fish} isLocked={isLocked} />
    </StyledContainer>
  );
};

export default FishDetails;
