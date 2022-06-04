import { Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createUseStyles, DefaultTheme } from "react-jss";
import { Link } from "react-router-dom";
import Coach from "../../components/Coach";
import { CoachSkills, CoachType } from "../../types";

const NODE_API = process.env.REACT_APP_NODE_API;

const useStyles = createUseStyles((theme: DefaultTheme) => ({
  root: {
    display: "flex",
    width: "100%",
    margin: "auto",
    flexFlow: "column",
  },
  coaches: {
    display: "flex",
    flexFlow: "row wrap",
    width: "95%",
    margin: "auto",
    justifyContent: "center",
    gap: "16px",
  },
  resultHeading: {
    margin: "40px 40px",
    flexFlow: "row ",
    width: "auto",
    justifyContent: "flex-start",
  },
}));

const CoachResults: React.FC = () => {
  const classes = useStyles();
  const windowUrl = window.location.toString().toLowerCase();
  const slug = windowUrl.substring(windowUrl.lastIndexOf("/") + 1);
  const [coaches, setCoaches] = useState<CoachType[] | null>(null);

  const generateUrl = (coach: CoachType) => {
    return coach.name.replace(/\W|_/g, "-").toLowerCase() + `-${coach.id}`;
  };

  const pageHeading = () => {
    return coaches[0].skills.filter((tag: CoachSkills) => tag.slug === slug)[0]
      .name;
  };

  useEffect(() => {
    const loadCoaches = async () => {
      try {
        const coach = await axios.get(`${NODE_API}/v1/tags`, {
          params: {
            slug: slug,
          },
        });

        if (coach) {
          setCoaches(coach.data);
        }
      } catch (error) {
        throw new Error("Could not load Coach Tags!");
      }
    };

    if (!coaches && slug) {
      loadCoaches();
    }
  }, [coaches, slug]);

  return (
    <div className={classes.root}>
      <div className={classes.resultHeading}>
        <Heading as="h1" size="2xl">
          {coaches && coaches.length ? "Results for " + pageHeading() : null}
        </Heading>
      </div>
      <div className={classes.coaches}>
        {coaches && coaches.length ? (
          coaches.map((coach: CoachType) => (
            <Link to={`/coach/${generateUrl(coach)}`} key={coach.id}>
              <Coach coachInfo={coach} />
            </Link>
          ))
        ) : (
          <Heading as="h1" size="2xl">
            No results found
          </Heading>
        )}
      </div>
    </div>
  );
};

export default CoachResults;