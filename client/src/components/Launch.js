import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Table, Spin, Result, Card, Image, Descriptions, Carousel } from "antd";
import Draggable from "react-draggable";

// import classNames from "classnames";
// import Moment from "react-moment";

const contentStyle = {
  margin: 0,
  height: "720px",
  width: "400px",
  color: "#fff",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
};
const LAUNCH_QUERY = gql`
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
        flickr_images
      }
    }
  }
`;

export default function Launch() {
  const onChangeC = (currentSlide) => {
    console.log(currentSlide);
  };
  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);

  const { error, data, loading } = useQuery(LAUNCH_QUERY, {
    variables: {
      flight_number,
    },
  });

  if (loading)
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  if (!data || error)
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );

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
    },
    links: {
      mission_patch_small,
      video_link,
      wikipedia,
      reddit_media,
      article_link,
      flickr_images,
    },
  } = data.launch;
  const dataArray = Object.values(data);

  const columns = [
    {
      title: "Flight number",
      // dataIndex: "flight_number",
      render: (record) => record.flight_number,
    },
    {
      title: "Avatar",

      render: (record) => (
        <img
          src={record.links.mission_patch_small}
          style={{ width: 50 }}
          alt="mission avatar"
        />
      ),
    },

    {
      title: "Mission Name",
      dataIndex: "mission_name",
    },
    {
      title: "Launch Year",
      dataIndex: "launch_year",
    },
    {
      title: "Rocket core reused",
      render: (record) => String(record.rocket.first_stage.cores[0].reused),
    },
    {
      title: "Is upcoming",
      render: (record) => String(record.upcoming),
    },
    {
      title: "Rocket Name",
      render: (record) => record.rocket.rocket_name,
    },
    {
      title: "Rocket country",
      render: (record) => record.rocket.second_stage.payloads[0].nationality,
    },
    {
      title: "Launch site",
      render: (record) => record.launch_site.site_name,
    },

    {
      title: "Wikipedia",
      dataIndex: ["rocket", "rocket_name"],
      key: "name",
      render: (text, record) => <a href={record.links.wikipedia}>{text}</a>,
    },
  ];
  const onChange = (pagination, filters, extra) => {
    console.log("params", pagination, filters, extra);
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={mission_patch_small} />}
      ></Card>
      <Descriptions title={mission_name} bordered>
        <Descriptions.Item label="Rocket Name">{rocket_id}</Descriptions.Item>
        <Descriptions.Item label="Launch Site">{site_name}</Descriptions.Item>
        <Descriptions.Item label="Launch date local">
          {launch_date_local}
        </Descriptions.Item>
        <Descriptions.Item label="Is Upcoming">
          {upcoming ? "true" : "False"}
        </Descriptions.Item>
        <Descriptions.Item label="wikipedia">
          <a href={wikipedia}>Wiki</a>
        </Descriptions.Item>
        <Descriptions.Item label="youtube">
          <a href={video_link}>youtube</a>
        </Descriptions.Item>
        <Descriptions.Item label="article">
          <a href={article_link}>article</a>
        </Descriptions.Item>
      </Descriptions>
      {/* <Table columns={columns} dataSource={dataArray} onChange={onChange} /> */}

      <Image width={200} src={flickr_images[0]} />
      <Image width={200} src={flickr_images[1]} />
      <Image width={200} src={flickr_images[2]} />
      <Image width={200} src={flickr_images[4]} />
    </>
  );
}
