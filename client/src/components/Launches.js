import React from "react";
import { useQuery, gql } from "@apollo/client";
import LaunchItem from "./LaunchItem";
import MissionKey  from './MissionKey'
const GetLaunches = gql`
query GetLaunches {
  launches {
    flight_number
    mission_name
    launch_date_local
    launch_success
    links {
      mission_patch_small
      video_link
      wikipedia
      reddit_media
      article_link
    }
  }
}
`;
 
function Launches() {
  const { loading, error, data } = useQuery(GetLaunches);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
 
  return (
    <div >
    <h1>Launches</h1>
    <MissionKey/>
      {data.launches.map( Launch => (
       <LaunchItem key={Launch.flight_number} Launch={Launch}/>
      ))}
    </div>
  );
}

export default Launches;

 
