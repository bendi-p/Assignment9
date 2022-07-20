import React from 'react';
import Card from "./card";

function Jobs() {
  var jobs = [
    {
      id: 1,
      title: 'Job 1',
      desc: 'This is job 1'
    },
    {
      id: 2,
      title: 'Job 2',
      desc: 'This is job 2'
    },
    {
      id: 3,
      title: 'Job 3',
      desc: 'This is job 3'
    },
    {
      id: 4,
      title: 'Job 4',
      desc: 'This is job 4'
    },
    {
      id: 5,
      title: 'Job 5',
      desc: 'This is job 5'
    }
  ];
  return (
    <div>
      {jobs &&
        jobs.map(job => {
          return <div key={job.id}>
              <Card title={job.title} titleClass="fs-2" description={job.desc} descClass="fs-6" style={{margin: '20px 0px'}}></Card>
            </div>
        })
      }
    </div>
  )
}

export default Jobs;