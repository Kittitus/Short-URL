import React,{useState,useEffect}from 'react'
import Container from '../components/Container'
import Card from '../components/Card'
import Col from '../components/Col'
import Row from '../components/Row'
function History(props) {
  const [history,setHistory] = useState([]);

  useEffect(() => {
    //update
    const localhistory = localStorage.getItem('history')
    if (localhistory){
        setHistory(JSON.parse(localhistory));
    }
  }, [setHistory]); 
  return (
    <>
      <Container className="mt-5">
        <h4 className='text-center'>History</h4>      
        <Row>
            <Col className="col-md-10 offset-md-1">
              <Card className="card">
                {history.length > 0 ? 
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Original URL</th>
                        <th>Short URL</th>
                        <th>QR Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        history.slice().reverse().map(history =>(
                          <tr>
                            <td>{history.original_link}</td>
                            <td>{history.short_link}</td>
                            <td>
                              <img src={`https://www.qrtag.net/api/qr_transparent_6.svg?url=${history.original_link}`} 
                                width="70" 
                                alt='logo'>
                              </img>
                              </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                : 
                <h3 className='text-center'>No History Yet!</h3>
                }
          
              </Card>
            </Col>
        </Row>
      </Container>
    </>
  )
}

export default History