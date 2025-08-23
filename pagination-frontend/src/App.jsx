import Pagination from "./components/Pagination"


function App() {
  const data = Array.from({length:100} ,(_,index)=> index+1);

  return (
    <>
        <Pagination data={data} renderRow={function(d){
          return <p>{`Item No ${d}`}</p>
        }}/>
    </>
  )
}

export default App
