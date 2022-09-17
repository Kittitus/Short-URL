import React,{useState,useEffect}from 'react'
import axios from 'axios'
import Container from '../components/Container'
import Card from '../components/Card'
import Col from '../components/Col'
import Row from '../components/Row'
import Error from '../components/Error'
//import Result from '../components/Result'
import './Home.css';
function Home(props) {
  const [link,setLink] = useState("");
  const [result,setResult] = useState();
  const [error,setError] = useState();
  const [history,setHistory] = useState([]);

  useEffect(() => {
    //update
    const localhistory = localStorage.getItem('history')
    if (localhistory){
        setHistory(JSON.parse(localhistory));
    }
  }, [setHistory]); 

  const isValidURL = () => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(link);
}

  const submit = async (event) =>{
    event.preventDefault();
    setResult();
    setError();
    //alert('it works!');
    try {
        if(!isValidURL()){
            const err ={
                data : {error : 'Please input a valid URL!'}
            }
            setError(err);
            return;
        }
        const response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${link}`);
        //console.log(response.data);
        setResult(response.data.result);
        const historyLog = [...history,response.data.result];
        setHistory(historyLog);
        localStorage.setItem('history',JSON.stringify(historyLog))
    } catch (error) {
        setError(error);
    }
  }
  return (
    <>
        <Container className="mt-5">
            <Row>
                <Col className="col-md-6 offset-3">
                    <Card className="card">
                        {/*<div className='text-center'>
                                <img src='https://st.depositphotos.com/1002489/3561/i/600/depositphotos_35619861-stock-photo-paris-la-defense-at-sunset.jpg' width="140" alt='logo'></img>
                                <p>QR Code</p>
                            </div>*/}
                        <h4 className='text-center'>Short URL</h4>
                        <form onSubmit={submit}>
                            <div className='form-group mt-3'>
                                <input 
                                    required type="text" className='form-control search_input' 
                                    autoComplete='off' placeholder="Put URL"
                                    onChange={e => setLink(e.target.value)}
                                />
                            </div>
                            <div className='form-group mt-3'>
                                <button type="submit" className="btn btn-primary btn-block">Generate</button>
                            </div>
                        </form>
                    </Card>
                </Col>
            </Row>
        </Container>
        {
            result && 
                <Container className="mt-5">
                    <Row>
                        <Col className="col-md-6 offset-3">
                            <Card className="card">
                                <div className='text-center'>
                                    <h4>Result</h4>
                                    <img src={`https://www.qrtag.net/api/qr_transparent_6.svg?url=${result.original_link}`} 
                                        width="140" 
                                        alt='logo'>
                                    </img>
                                </div>
                                <ul className='list-group mt-3'>
                                    <li className='list-group-item'>Short URL: <a href={result.full_short_link}>{result.short_link}</a></li>
                                    <li className='list-group-item'>Full URL: <a href={result.original_link}>{result.original_link}</a></li>
                                </ul>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        }
        {
            error && <Error error={error}/>
        }
    </>
  )
}

export default Home