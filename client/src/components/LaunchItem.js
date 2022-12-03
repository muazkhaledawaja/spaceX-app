import React, { Fragment } from "react";
import classNames from "classnames";
import Moment from 'react-moment'
import {Link} from 'react-router-dom'

export default function launchItem({
  Launch: { flight_number, mission_name, launch_date_local, launch_success },
}) {
  return (
    <Fragment key={flight_number}>
      <br/>
      <div className="card card-body  mb-3 ">
        <div className="row">
          <div className="col-md-9">
            <h4>
               <span
                className={classNames({
                  "text-success": launch_success,
                  "text-danger": !launch_success,
                })}
              >
                {mission_name}
              </span>
            </h4>
            <p>Date: <Moment format="YYYY-MM-DD HH:MM">{launch_date_local}</Moment></p>
          </div>
          <div className="col-md 3">
            <Link to={`/launch/${flight_number}`} className="btn btn-info">Launch Details</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
