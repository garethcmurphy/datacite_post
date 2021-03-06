const rp = require("request-promise");
const datacite_authentication = require("/tmp/generic_config.json");

const first_name = "Gareth";
const last_name = "Murphy";
const affiliation = "ESS";
const publisher = "ESS";
const publication_year = "2018";
const title = "Sample Data";
const abstract = "Sample Data";
const doi = "10.5072/BRIGHTNESS/NMX0001";
const resource_type = "NeXus HDF5 Files";
const url = "https://doi.esss.se/detail/10.17199%252FBRIGHTNESS%252FNMX0001";

const xml = `<?xml version="1.0" encoding="UTF-8"?> \
<resource xmlns="http://datacite.org/schema/kernel-4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4/metadata.xsd">  \
  <identifier identifierType=\"DOI\">${doi}</identifier>  \
  <creators> \
    <creator> \
      <creatorName>${last_name}, ${first_name}</creatorName>  \
      <givenName>${first_name}</givenName>  \
      <familyName>${last_name}</familyName>\  
      <affiliation>${affiliation}</affiliation> \
    </creator> \
  </creators>  \
  <titles> \
    <title>${title} </title> \
  </titles>  \
  <publisher>${publisher}</publisher>  \
  <publicationYear>${publication_year}</publicationYear>  \
  <descriptions>  \
    <description xml:lang="en-us" descriptionType="Abstract">${abstract}</description> \
  </descriptions>  \
  <resourceType resourceTypeGeneral="Dataset">${resource_type}</resourceType> \
</resource>`;

const register_plain_text = `#Content-Type:text/plain;charset=UTF-8
doi= ${doi}
url= ${url}`;

console.log(xml);

const datacite_register_metadata =
  "https://mds.datacite.org/metadata" + "/" + doi;
const datacite_register_doi = "https://mds.datacite.org/doi" + "/" + doi;


const datacite_endpoint = "https://api.datacite.org/dois"



const options_put = {
  method: "PUT",
  body: xml,
  uri: datacite_register_metadata,
  headers: {
    "content-type": "application/xml;charset=UTF-8"
  },
  auth: datacite_authentication
};

const options_register_put = {
  method: "PUT",
  body: register_plain_text,
  uri: datacite_register_doi,
  headers: {
    "content-type": "text/plain;charset=UTF-8"
  },
  auth: datacite_authentication
};


rp(options_put)
  .then(function(parsedBody) {
    console.log("register metadata worked");
    console.log(parsedBody);
    // POST succeeded...
  })
  .catch(function(err) {
    console.log("register metadata failed");
    console.log(err);
    // POST failed...
  });

rp(options_register_put)
  .then(function(parsedBody) {
    console.log("register doi worked");
    console.log(parsedBody);
    // POST succeeded...
  })
  .catch(function(err) {
    console.log("register doi failed");
    console.log(err);
    // POST failed...
  });


const datacite_metadata_uri =
  "https://mds.datacite.org/metadata" + "/" + doi;

const options_get = {
  method: "GET",
  uri: datacite_metadata_uri,
  auth: datacite_authentication
};


rp(options_get)
  .then(function(parsedBody) {
    console.log("get worked");
    console.log(parsedBody);
    // POST succeeded...
  })
  .catch(function(err) {
    console.log("get failed");
    console.log(err);
    // POST failed...
  });
