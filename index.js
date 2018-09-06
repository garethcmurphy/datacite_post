const rp = require("request-promise");
const authentication = require("/tmp/generic_config.json");

first_name = "Gareth";
last_name = "Murphy";
affiliation = "ESS";
publisher = "ESS";
publication_year = "2018";
title = "Sample Data";
technical_info = "Sample Data";
abstract = "Sample Data";
doi = "10.117199/BRIGHTNESS.5.1";
resource_type = "NeXus HDF5 Files";

xml = `<?xml version="1.0" encoding="UTF-8"?> \
<resource xmlns="http://datacite.org/schema/kernel-4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4/metadata.xsd">  \
  <identifier identifierType=\"DOI\">DOI</identifier>  \
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
    <description xml:lang="en-us" descriptionType="TechnicalInfo">${technical_info}</description>  \
    <description xml:lang="en-us" descriptionType="Abstract">${abstract}</description> \
  </descriptions>  \
  <resourceType resourceTypeGeneral="Text">${resource_type}</resourceType> \
</resource>`;

console.log(xml);

const datacite_doi_uri = "https://mds.datacite.org/metadata/10.17199/BRIGHTNESS/NMX0001";
const datacite_test_uri = "https://mds.test.datacite.org/metadata/";
const datacite_put_uri = "https://mds.datacite.org/metadata/10.17199/BRIGHTNESS/NMX0001";

const options = {
  method: "GET",
  uri: datacite_test_uri,
  auth: authentication
};

rp(options)
  .then(function(parsedBody) {
    console.log("it worked");
    console.log(parsedBody);
    // POST succeeded...
  })
  .catch(function(err) {
    console.log("it failed");
    console.log(err);
    // POST failed...
  });
