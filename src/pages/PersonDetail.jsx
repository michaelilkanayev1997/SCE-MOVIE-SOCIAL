import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getPersonDetail } from "../api/axiosClient";
import { useLocation } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import PersonMediaGrid from "../components/PersonMediaGrid";
import GlobalLoading from "../components/GlobalLoading";

const PersonDetail = () => {
  const location = useLocation();
  const personId = location.state.item;
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState();

  useEffect(() => {
    const getPerson = async () => {
      setLoading(true);
      const response = await getPersonDetail(personId);

      if (response) setPerson(response);
      setLoading(false);
    };
    getPerson();
  }, [personId]);

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <div
          style={{ margin: "10rem", marginTop: "2rem", marginBottom: "9rem" }}
        >
          {person && person.profile_path && person.birthday ? (
            <>
              <Box>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "50%", md: "20%" },
                    }}
                  >
                    <div style={{ border: "5px solid gray" }}>
                      <Box
                        sx={{
                          paddingTop: "160%",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundColor: "darkgrey",
                          backgroundImage: `url(${apiConfig.w500Image(
                            person.profile_path
                          )})`,
                        }}
                      />
                    </div>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: "100%", md: "80%" },
                      padding: { xs: "1rem 0", md: "1rem 2rem" },
                    }}
                  >
                    <Stack spacing={2}>
                      <Typography variant="h4" fontWeight="700">
                        {`${person.name} (${
                          person.birthday && person.birthday.split("-")[0]
                        }`}
                        {person.deathday &&
                          ` - ${
                            person.deathday && person.deathday.split("-")[0]
                          }`}
                        {")"}
                      </Typography>
                      <Typography>{person.biography}</Typography>
                    </Stack>
                  </Box>
                </Box>
                <div header="medias">
                  <PersonMediaGrid personId={personId} />
                </div>
              </Box>
            </>
          ) : (
            <h2
              style={{
                fontSize: 25,
                color: "white",
                textAlign: "center",
                paddingTop: "50px",
              }}
            >
              No information about : {person ? `${person.name}` : "  "}
            </h2>
          )}
        </div>
      )}
    </>
  );
};

export default PersonDetail;
