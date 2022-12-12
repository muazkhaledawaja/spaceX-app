const { json } = require("express");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
} = require("graphql");

//Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLID },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    details: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    upcoming: { type: GraphQLBoolean },
    rocket: { type: RocketType },
    launch_site: { type: SiteType },
    links: { type: linkType },
  }),
});

const PayLoadType = new GraphQLObjectType({
  name: "PayLoad",
  fields: () => ({
    reused: { type: GraphQLBoolean },
    nationality: { type: GraphQLString },
  }),
});

//Site Type
const SiteType = new GraphQLObjectType({
  name: "Site",
  fields: () => ({
    site_id: { type: GraphQLInt },
    site_name: { type: GraphQLString },
  }),
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
    first_stage: { type: FirstStageType },
    fairings: { type: FairingsType },
    second_stage: { type: SecondStageType },
  }),
});

//Fairings Type
const FairingsType = new GraphQLObjectType({
  name: "Fairing",
  fields: () => ({
    reused: { type: GraphQLBoolean },
  }),
});

// first_stage
const FirstStageType = new GraphQLObjectType({
  name: "FirstStage",
  fields: () => ({
    cores: { type: new GraphQLList(CoreType) }, // todo arry of the coretype
  }),
});

//Core Type
const CoreType = new GraphQLObjectType({
  name: "Core",
  fields: () => ({
    core_serial: { type: GraphQLString },
    flight: { type: GraphQLInt },
    reused: { type: GraphQLBoolean },
    land_success: { type: GraphQLBoolean },
  }),
});

//second_stage
const SecondStageType = new GraphQLObjectType({
  name: "SecondStage",
  fields: () => ({
    block: { type: GraphQLInt },
    payloads: { type: new GraphQLList(PayLoadType) },
  }),
});

// Links Links
const linkType = new GraphQLObjectType({
  name: "Link",
  fields: () => ({
    mission_patch_small: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    article_link: { type: GraphQLString },
    reddit_media: { type: GraphQLString },
    video_link: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) },
  }),
});

// only Rocket
const getAllRocketsType = new GraphQLObjectType({
  name: "AllRockets",
  fields: () => ({
    rocket_name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    cost_per_launch: { type: GraphQLInt },
    mass: { type: MassType },
    diameter: { type: DiameterType },
    success_rate_pct: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});
// Mass Type
const MassType = new GraphQLObjectType({
  name: "mass",
  fields: () => ({
    kg: { type: GraphQLInt },
    lb: { type: GraphQLInt },
  }),
});

// Diameter Type

const DiameterType = new GraphQLObjectType({
  name: "Diameter",
  fields: () => ({
    meters: { type: GraphQLString },
    feet: { type: GraphQLString },
  }),
});

  const MissionType = new  GraphQLObjectType({
    name:'missions',
    fields: ()=>({
      mission_name: { type: GraphQLString },
      mission_id:{type:GraphQLID},
      manufacturers:{type: new GraphQLList(GraphQLString)},
      payload_ids:{type: new GraphQLList(GraphQLString)},
      description: { type: GraphQLString },
      wikipedia: { type: GraphQLString },
      website: { type: GraphQLString },
      twitter: { type: GraphQLString },

    })
  })

const PayLoads  = new GraphQLObjectType({
  name:'payLoad',
  fields: ()=>({
    payload_id:{type:GraphQLID},
    customers:{type: new GraphQLList(GraphQLString)},
    payload_mass_kg: { type: GraphQLString },
    payload_type: { type: GraphQLString },
    reused: { type: GraphQLBoolean },
    orbit_params:{type:  orbitType},
    nationality: { type: GraphQLString },
    manufacturer: { type: GraphQLString },

  })
})

  const orbitType = new GraphQLObjectType({
  name:'orbit',
  fields:()=>({
    reference_system: { type: GraphQLString },
    regime: { type: GraphQLString },
    longitude: { type: GraphQLString },
    semi_major_axis_km: { type: GraphQLString },
    eccentricity: { type: GraphQLString },
    periapsis_km: { type: GraphQLInt   },
    apoapsis_km: { type: GraphQLInt   },
    inclination_deg: { type: GraphQLInt   },
    period_min: { type: GraphQLString },
    lifespan_years: { type: GraphQLString },
    epoch: { type: GraphQLString },
    mean_motion: { type: GraphQLString },
    raan: { type: GraphQLString },
    arg_of_pericenter: { type: GraphQLString },
    mean_anomaly: { type: GraphQLString },

  })
})

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //////////////////////////////////////Luanch Query
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return fetch("https://api.spacexdata.com/v3/launches").then((res) =>
          res.json().catch((err) => err.message)
        );
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(`https://api.spacexdata.com/v3/launches/`)
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },
    rocket: {
      type: RocketType,
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },
    site: {
      type: SiteType,
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },
    firstStage: {
      type: FirstStageType,
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => {
            res.json();
            console.log(res.json());
          })

          .catch((err) => err.message);
      },
    },
    cores: {
      type: new GraphQLList(CoreType),
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json().toString())
          .catch((err) => err.message);
      },
    },

    fairings: {
      type: FairingsType,
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },

    secondStage: {
      type: SecondStageType,
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },
    payloads: {
      type: new GraphQLList(PayLoadType),
      args: {
        flight_number: { type: GraphQLID },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        )
          .then((res) => res.json())
          .catch((err) => err.message);
      },
    },
    link: {
      type: linkType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return fetch(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        ).then((res) => res.json());
      },
    },

  //////////////////////////Rocket only Query
    AllRockets: {
      type: new GraphQLList(getAllRocketsType),
      resolve(parent, args) {
        return fetch("https://api.spacexdata.com/v3/rockets").then((res) =>
          res.json().catch((err) => err.message)
        );
      },
    },

  /////////// missions
  missions: {
    type: new GraphQLList(MissionType),
    resolve(parent, args) {
      return fetch("https://api.spacexdata.com/v3/missions").then((res) =>
        res.json().catch((err) => err.message)
      );
    },
  },

//////////////// Allpayloads
PayLoads: {
  type:   new GraphQLList(PayLoads),
  resolve(parent, args) {
    return fetch("https://api.spacexdata.com/v3/payloads").then((res) =>
      res.json().catch((err) => err.message)
    );
  },
},
// orbit: {
//   type:   new GraphQLList(orbitType),
//   resolve(parent, args) {
//     return fetch("https://api.spacexdata.com/v3/payloads/").then((res) =>
//       res.json().catch((err) => err.message)
//     );
//   },
// },
  },


});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
