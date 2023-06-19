import {
  Box,
  Typography,
  useTheme,
  IconButton,
  InputBase,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../../components/UserImage";
import { setFriends } from "../../state/state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const [loading, setLoading] = useState(true);
  const friends = useSelector((state) => state.user.friends);

  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);

  const isFriend = (friendId) => {
    const friend = friends.find((friend) => friend._id === friendId);
    return friend !== undefined;
  };

  const patchFriend = async (friendId) => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/`, {
        method: "GET",
      });
      const data = await response.json();
      const users = data.users;
      dispatch(setFriends({ friends: users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterFriends = () => {
    const filtered = friends.filter((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
    setFilteredFriends(filtered);
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterFriends();
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    // Display a loading indicator
    return <p>Loading...</p>;
  }

  return (
    <WidgetWrapper>
      <InputBase
        placeholder="Search Friends"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          width: "90%",
          p: 1,
          mb: 3,
          backgroundColor: "#444",
          borderRadius: 3,
        }}
      />
      <IconButton>
        <Search />
      </IconButton>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Users List
      </Typography>

      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(filteredFriends) && filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <FlexBetween key={friend._id}>
              <FlexBetween gap="1rem">
                <UserImage image={friend.picturePath} size="55px" />
                <Box
                  onClick={() => {
                    navigate(`/profile/${friend._id}`);
                    navigate(0);
                  }}
                >
                  <Typography
                    color={main}
                    variant="h5"
                    fontWeight="500"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                  >
                    {`${friend.firstName} ${friend.lastName}`}
                  </Typography>
                  <Typography color={medium} fontSize="0.75rem">
                    {friend.occupation}
                  </Typography>
                </Box>
              </FlexBetween>
              <IconButton
                onClick={() => patchFriend(friend._id)}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
              >
                {isFriend(friend._id) ? (
                  <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                  <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
              </IconButton>
            </FlexBetween>
          ))
        ) : (
          <p>No matching friends found.</p>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default AllUsers;
