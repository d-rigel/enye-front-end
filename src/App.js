import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios"
import DataTable from "./DataTable"
import PaginationCom from "./PaginationCom"
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [data, setData] = useState([])
  const [q, setQ] = useState("")
  const [searchColumns, setSearchColumns] = useState(["FirstName", "LastName", "Gender", "PaymentMethod", "CreditCardType"])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const res = await axios.get("https://api.enye.tech/v1/challenge/records");
      setData(res.data.records.profiles)
      setLoading(false)
      console.log(res.data.records.profiles)
    }

    fetchPost()

  }, [])

  function search(rows) {
    return rows.filter((row) => 
    // row.FirstName.indexOf(q) > -1
    searchColumns.some(
      (column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    )
    )
  }

  //get posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentData = data.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  

  return (
   
    <div className="app">  
      <div className="app__header">
        <div className="app__searchContainer">
         <SearchIcon className="app__searchIcon" />
          <input type="text" className="app__searchInput" placeholder="Search For Data" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <h3 className="app__title">ENYE ASSIGNMENT 1.1</h3>
        </div>
        <DataTable
        data={search(currentData)}
        loading={loading}
        />
        
        <PaginationCom 
        postsPerPage={postsPerPage}
         totalPosts={data.length} 
         paginate={paginate}
         
        />
        
    </div>
  );
}

export default App;
