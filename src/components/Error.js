import React from 'react'
import Container from '../components/Container'
import Col from '../components/Col'
import Row from '../components/Row'
function Error({error}) {
  return (
    <>
        <Container className="mt-5">
            <Row>
                <Col className="col-12 col-md-12">
                    <div className='text-center'>
                        <h4>Oops! Error</h4>
                        <p>{error.data.error}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Error