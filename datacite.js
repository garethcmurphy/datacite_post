const rp = require("request-promise");
var base64 = require("base-64");
const human = require('humanparser');



const datacite_authentication = require("/tmp/generic_config.json");

const affiliation = "ESS";
const publisher = "ESS";
const publication_year = "2018";
const title = "Sample Data";
const abstract = "This is sample data generated for ESS detector under grant number BrightnESS";
const doi = "10.5072/" + Math.random().toString(36).substring(7);
const resource_type = "NeXus HDF5 Files";
const url = "https://doi.esss.se/detail/10.17199%252FBRIGHTNESS%252FNMX0001";
const authors = ["Dorothea Pfeiffer", "Anton Khaplanov", "Ramsey Al Jebali"];

const xmlhead = `<?xml version="1.0" encoding="UTF-8"?> \
<resource xmlns="http://datacite.org/schema/kernel-4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4/metadata.xsd">  \
  <identifier identifierType=\"DOI\">${doi}</identifier>  \
  <creators>`;

let xmlcreators ="";
for ( const author of authors){
  const first_name = author.split(" ")[0];
  const last_name = author.split(" ").splice(-1);
  const attrs = human.parseName(author)
  console.log(attrs);
  const xmlcreator = `<creator> \
      <creatorName>${last_name}, ${first_name}</creatorName>  \
      <givenName>${first_name}</givenName>  \
      <familyName>${last_name}</familyName>\  
      <affiliation>${affiliation}</affiliation> \
    </creator>`;
  xmlcreators = xmlcreators + xmlcreator;
}


const xml_end = `</creators>  \
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


const xml = xmlhead + xmlcreators + xml_end;
console.log(xml);


const datacite_endpoint = "https://api.datacite.org/dois";

const encodedData = base64.encode(xml);

const payload = {
  "data": {
    "type": "dois",
    "attributes": {
      "doi": doi,
      "xml": encodedData
    },
    "relationships": {
      "client": {
        "data": {
          "type": "clients",
          "id": "demo.esss"
        }
      }
    }
  }
};

const options_put = {
  method: "POST",
  body: payload,
  json: true,
  uri: datacite_endpoint,
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


const options_get = {
  method: "GET",
  uri: datacite_endpoint
};


/*
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
  */