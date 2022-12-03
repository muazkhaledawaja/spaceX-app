import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
const  LAUNCH_QUERY = gql`
query LaunchQuery($flight_number: ID!) {
  launch(flight_number: $flight_number) {
    flight_number
    mission_name
    launch_year
    launch_success
    launch_date_local
    upcoming
    details
    launch_site {
      site_name
    }
    rocket {
      rocket_id
      rocket_name
      rocket_type
      fairings {
        reused
      }
      first_stage {
        cores {
          core_serial
          reused
          land_success
        }
      }
      second_stage {
        payloads {
          nationality
        }
      }
    }
    links {
      mission_patch_small
      video_link
      wikipedia
      reddit_media
      article_link
    }
  }
}
`
 

export default function Launch() {
  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);

  const { error, data, loading } = useQuery(LAUNCH_QUERY, {
    variables: {
      flight_number,
    },
  });

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Loading...</h4>;
  const {
    mission_name,
    launch_year,
    launch_success,
    launch_date_local,
    upcoming,
    details,
    launch_site: { site_name },
    rocket: {
      rocket_id,
      rocket_name,
      rocket_type,
      first_stage: {
        cores: [{ core_serial, land_success }],
      },
      second_stage: {
        payloads: [{ nationality }],
      },
      fairings: { reused },
    },
    links: {
      mission_patch_small,
      video_link,
      wikipedia,
      reddit_media,
      article_link,
    },
  } = data.launch;

  return (
    <>
      <div>
        <div>
          <div className="card">
            <img
              src={mission_patch_small}
              className="card=img-top"
              alt="mission Icon"
            />
            <div className="card-body">
              <div className="card-text">{details}</div>
              <a href={wikipedia} target="_blank" className="btn btn-info">
                wikipedia
              </a>
              <a href={video_link} target="_blank" className="btn btn-danger">
                Youtube
              </a>
              <a
                href={reddit_media}
                target="_blank"
                className="btn btn-warning"
              >
                reddit
              </a>
              <a
                href={article_link}
                target="_blank"
                className="btn btn-secondary"
              >
                article link
              </a>
            </div>
          </div>
          <h1 className="display-4 my-3">
            <span className="text-dark"></span> {mission_name}
          </h1>
          <h5 className="mb-3">Launch Details</h5>
          <ul className="list-group">
            <li className="list-group-item">Launch Year: {launch_year}</li>
            <li className="list-group-item">
              Launch Successful :
              <span
                className={classNames({
                  "text-success": launch_success,
                  "text-danger": !launch_success,
                })}
              >
                {launch_success ? "Yes" : "No"}
              </span>
            </li>
          </ul>

          <h5 className="my-3">Rocket Details</h5>
          <ul className="list-group">
            <li className="list-group-item">Rocket ID: {rocket_id}</li>
            <li className="list-group-item">Rocket Name: {rocket_name}</li>
            <li className="list-group-item">Rocket Type: {rocket_type}</li>
            <li className="list-group-item">
              Fairings reused:
              <span
                className={classNames({
                  "text-success": reused,
                  "text-danger": !reused,
                })}
              >
                {reused ? "Yes" : "No"}
              </span>
            </li>
            <li className="list-group-item">
              Landing Success:
              <span
                className={classNames({
                  "text-success": land_success,
                  "text-danger": !land_success,
                })}
              >
                {land_success ? "Yes" : "No"}
              </span>
            </li>
            <li className="list-group-item">
              isUpcoming:
              <span
                className={classNames({
                  "text-success": upcoming,
                  "text-danger": !upcoming,
                })}
              >
                {upcoming ? "Yes" : "No"}
              </span>
            </li>
            <li className="list-group-item">Core Serial: {core_serial}</li>
            <li className="list-group-item">Nationality: {nationality}</li>
          </ul>

          <hr />
          <Link to="/" className="btn btn-info">
            Back
          </Link>
        </div>
      </div>
    </>
  );
}
