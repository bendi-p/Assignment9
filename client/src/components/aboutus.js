import React from 'react';
import Card from "./card";

function Aboutus() {
  return (
    <Card title="About us" description="This is the About us component" style={{height: '80vh', paddingTop: '10vh'}} titleClass="fs-1 text-center" descClass="fs-4 text-center my-2"></Card>
  )
}

export default Aboutus;