import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
function CrudOperationsStock() {
    const [stocks, setStocks] = useState([]);
    const [id, setId] = useState('');
    const [ticker, setTicker] = useState('');
    const [org, setOrg] = useState('');
    const [editingStock, setEditingStock] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8889/stock/read')
            .then(response => {
                setStocks(response.data);
            })
            .catch(error => {
                console.error('There was an error in fetching the stocks!', error);
            });
    });

    const createStock = () => {
        axios.post('http://localhost:8889/stock/add', {
            id,
            ticker,
            org
        })
            .then(response => {

            })
            .catch(error => {
                console.error('There was an error in creating the stock!', error);
            });
    };

    const updateStock = (stock) => {
        axios.put(`http://localhost:8889/stock/update/${stock.id}`, stock)
            .then(response => {
                console.log(response);
                setStocks(stocks.map(s => (s.id === stock.id ? response.data : s)));
                setEditingStock(null);
                setId('');
                setTicker('');
                setOrg('');
            })
            .catch(error => {
                console.error('There was an error in updating the stock!', error);
            });
    };

    const deleteStock = (id) => {
        axios.delete(`http://localhost:8889/stock/delete/${id}`)
            .then(() => {
                setStocks(stocks.filter(stock => stock.id !== id));
            })
            .catch(error => {
                console.error('There was an error in deleting the post!', error);
            });
    };

    const handleUpdateStock = (stock) => {
        setEditingStock(stock);
        setId(stock.id);
        setTicker(stock.ticker);
        setOrg(stock.org);
    };

    const chooseCreateOrUpdate = () => {
        if (editingStock) {
            updateStock({ id, ticker, org });
        }
        else {
            createStock();
        }
    };
    function validationOrg(){
        const val = document.getElementById('org').value;
        if(val==''){
          document.getElementById('orgw').innerHTML='Org cannot be empty';
        }
        else{
          document.getElementById('orgw').innerHTML='';
        }
      }
      function validationTicker(){
        const val = document.getElementById('ticker').value;
        if(val==''){
          document.getElementById('tickerw').innerHTML='Ticker cannot be empty';
        }
        else{
          document.getElementById('tickerw').innerHTML='';
        }
      }
      function validationID(){
        const val = document.getElementById('id').value;
        if(val==''){
          document.getElementById('idw').innerHTML='ID cannot be empty';
        }
        else{
          document.getElementById('idw').innerHTML='';
        }
      }
      function validationOrg(){
        const val = document.getElementById('org').value;
        if(val==''){
          document.getElementById('orgw').innerHTML='Org cannot be empty';
        }
        else{
          document.getElementById('orgw').innerHTML='';
        }
      }
      function validationTicker(){
        const val = document.getElementById('ticker').value;
        if(val==''){
          document.getElementById('tickerw').innerHTML='Ticker cannot be empty';
        }
        else{
          document.getElementById('tickerw').innerHTML='';
        }
      }
      function validationIdEmpty(){
        const val = document.getElementById('id').value;
        if(val==''){
          document.getElementById('idw').innerHTML='ID cannot be empty';
        }
        else{
          document.getElementById('idw').innerHTML='';
        }
      }
    return (
        <div className='row container-fluid'>
            <div className='col container pt-5 shadow p-4 bg-white card'>
                <div>
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => {setId(e.target.value); validationID()}}
                        className="form-control"
                        name='id'
                        id='id'
                    />
                    <label for="id">ID</label>
                    <p id="idw" style={{color:"red"}}>ID cannot be empty</p>
                </div>
                <div class="form-floating mb-3 mt-3">
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => {setTicker(e.target.value); validationTicker()}}
                        className="form-control"
                        name='ticker'
                        id='ticker'
                        onInput={validationTicker}
                    />
                    <label for="ticker">Ticker</label>
                    <p id="tickerw" style={{color:"red"}}>Ticker cannot be empty</p>
                </div>
                <div class="form-floating mb-3 mt-3">
                    <input
                        type="text"
                        value={org}
                        onChange={(e) => {setOrg(e.target.value); validationOrg()}}
                        className="form-control"
                        name='org'
                        id='org'
                        onInput={validationOrg}
                    />
                    <label for='org'>Organization</label>
                    <p id='orgw' style={{color:"red"}}>Org cannot be empty</p>
                </div>
                <div class="d-grid">
                    <button onClick={chooseCreateOrUpdate} className='btn btn-primary btn-block' id="saveBtn">
                        {editingStock ? 'UPDATE' : 'CREATE'}
                    </button>
                </div>
            </div>
            </div>
            <div className='col pt-3 container-fluid table-responsive card'>
                <div class="card-body">
                    <table className='table table-hover'>
                        <thead >
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>TICKER</th>
                                <th scope='col'>ORGANIZATION</th>
                                <th scope='col'>EDIT</th>
                                <th scope='col'>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock, index) => (
                                <tr key={index}>
                                    <td>{stock.id}</td>
                                    <td>{stock.ticker}</td>
                                    <td>{stock.org}</td>
                                    <td> <button onClick={() => handleUpdateStock(stock)} className='btn btn-warning'>EDIT</button></td>
                                    <td> <button onClick={() => deleteStock(stock.id)} className=' btn btn-danger'>DELETE</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}

export default CrudOperationsStock;