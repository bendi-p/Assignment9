import React from 'react';
import Card from "./card";

function Home() {
  return (
    <Card title="Home" description="This is the Home component" titleClass="fs-1 text-center" style={{height: '80vh', paddingTop: '10vh'}} descClass="fs-4 text-center my-2"></Card>
  )
}

export default Home;