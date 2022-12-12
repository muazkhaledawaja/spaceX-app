import React, { useState, useCallback, useRef } from "react";
import { Table, Spin, Result, Button, Modal } from "antd";
import { useQuery, gql } from "@apollo/client";
 
 

const GetLaunches = gql`
  query GetLaunches {
    launches {
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
`;

export default function LaunchTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { loading, error, data } = useQuery(GetLaunches);
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

  const columns = [
    {
      title: "Show details",
      render: (record) => (
        <Button type="primary" onClick={showModal}>
          Details
        </Button>
      ),
    },

    {
      title: "Flight number",
      dataIndex: "flight_number",
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
  console.log();

  return (
    <div className="container mt-5">
      
        <Table
          columns={columns}
          dataSource={data.launches}
          onChange={onChange}
        
        />
        <Modal
          title="Launches"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          {/* {modal content} */}
        </Modal>
 
    </div>
  );
}
