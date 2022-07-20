import React from 'react';
import Card from "./card";

function Contact() {
  return (
    <Card title="Contact" description="This is the Contact component" titleClass="fs-1 text-center" style={{height: '80vh', paddingTop: '10vh'}} descClass="fs-4 text-center my-2"></Card>
  )
}

export default Contact;