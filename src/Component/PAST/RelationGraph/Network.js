import {useContext, useEffect, useState} from "react";
import {PASTContext} from "../PASTApp";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import * as React from "react";

const auth_token = process.env.REACT_APP_AUTHTOKEN
const base_url = process.env.REACT_APP_BASEURL;

export default function Network(props) {
  const {originTarget, isSlave} = useContext(PASTContext);
  const [target, setTarget] = useState(originTarget);
  const endPoint = isSlave ? "past/enslaved/" : "past/enslavers/";
  const {isLoading, error, data, refetch} = useQuery('data',
    () => {
      let queryData = new FormData();
      queryData.append("id", target);
      queryData.append("id", target);
      return fetch(base_url + endPoint, {
        method: "POST",
        body: queryData,
        headers: {'Authorization': auth_token}
      }).then(res => res.json())
    }
  )

  if (error) return 'An error has occurred: ' + error.message
  if (isLoading) return <CircularProgress/>
  return (
    <div>
      <h1>NetWork</h1>
      <p>{data[0].documented_name}</p>
    </div>
  )
}